export const runtime = 'nodejs'
import { Buffer } from 'buffer'

/**
 * Anti-spam layers (no CAPTCHA, so real users see zero friction):
 *  1. Honeypot  — a hidden `company_website` field only bots fill in.
 *  2. Time trap — submissions faster than a human could type are dropped.
 *  3. Rate limit — per-IP cap on submissions within a rolling window.
 *  4. Heuristics — link-stuffed messages are dropped.
 * Bot submissions get a normal-looking success response so the sender can't
 * probe which rule caught them, but no email is sent.
 */
const MIN_FILL_MS = 3000 // humans need at least a few seconds to fill the form
const RATE_LIMIT_MAX = 3 // submissions...
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000 // ...per IP per 10 minutes
const MAX_LINKS_IN_MESSAGE = 2

// In-memory per-instance store. Serverless instances are ephemeral, so this
// blunts bursts rather than guaranteeing a global limit — good enough here, and
// it adds no external dependency.
const recentSubmissions = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
    const now = Date.now()
    const hits = (recentSubmissions.get(ip) || []).filter(
        (t) => now - t < RATE_LIMIT_WINDOW_MS
    )
    hits.push(now)
    recentSubmissions.set(ip, hits)

    // Opportunistic cleanup so the map can't grow unbounded.
    if (recentSubmissions.size > 5000) {
        for (const [key, times] of recentSubmissions) {
            if (!times.some((t) => now - t < RATE_LIMIT_WINDOW_MS)) {
                recentSubmissions.delete(key)
            }
        }
    }
    return hits.length > RATE_LIMIT_MAX
}

function countLinks(text: string): number {
    return (text.match(/https?:\/\/|www\.|\[url=|<a\s/gi) || []).length
}

// Looks like a success to the caller; nothing is actually sent.
function silentlyAccepted() {
    return new Response(
        JSON.stringify({ success: true, message: 'Message sent successfully!' }),
        { status: 200, headers: { 'content-type': 'application/json' } }
    )
}

/**
 * Contact form API endpoint
 *
 * To enable email sending, add to your .env:
 * RESEND_API_KEY=re_xxxxxxxxxxxx
 * CONTACT_EMAIL_TO=your-email@krastysoft.com
 * RESEND_FROM_EMAIL=noreply@krastysoft.com (optional, defaults to onboarding@resend.dev)
 *
 * Get Resend API key from: https://resend.com
 * Note: Custom domains need to be verified in Resend dashboard
 */

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const name = String(formData.get('name') || '').trim()
        const email = String(formData.get('email') || '').trim()
        const phone = String(formData.get('phone') || '').trim()
        const message = String(formData.get('message') || '').trim()
        const attach = formData.get('attach') as File | null

        // --- Anti-spam gate (runs before any validation or sending) ---------
        const honeypot = String(formData.get('company_website') || '').trim()
        if (honeypot) {
            console.warn('[contacts] blocked: honeypot filled')
            return silentlyAccepted()
        }

        const loadedAt = Number(formData.get('form_loaded_at') || 0)
        if (loadedAt > 0 && Date.now() - loadedAt < MIN_FILL_MS) {
            console.warn('[contacts] blocked: submitted too fast')
            return silentlyAccepted()
        }

        if (countLinks(message) > MAX_LINKS_IN_MESSAGE) {
            console.warn('[contacts] blocked: link-stuffed message')
            return silentlyAccepted()
        }

        const ip =
            req.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
            req.headers.get('x-real-ip') ||
            'unknown'
        if (ip !== 'unknown' && isRateLimited(ip)) {
            console.warn('[contacts] blocked: rate limit')
            return new Response(
                JSON.stringify({
                    error: 'Too many submissions. Please try again later.',
                }),
                { status: 429, headers: { 'content-type': 'application/json' } }
            )
        }

        // Validation
        if (!name || name.length < 2) {
            return new Response(
                JSON.stringify({ error: 'Name must be at least 2 characters' }),
                { status: 400, headers: { 'content-type': 'application/json' } }
            )
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email || !emailRegex.test(email)) {
            return new Response(
                JSON.stringify({ error: 'Invalid email address' }),
                { status: 400, headers: { 'content-type': 'application/json' } }
            )
        }

        if (!message || message.length < 10) {
            return new Response(
                JSON.stringify({ error: 'Message must be at least 10 characters' }),
                { status: 400, headers: { 'content-type': 'application/json' } }
            )
        }

        // Process attachment if present
        let attachmentData: {
            filename: string
            content: string
            contentType: string
        } | null = null

        if (attach && attach.size > 0) {
            const arrayBuffer = await attach.arrayBuffer()
            const base64 = Buffer.from(arrayBuffer).toString('base64')
            attachmentData = {
                filename: attach.name,
                content: base64,
                contentType: attach.type,
            }
        }

        // Try to send email via Resend (if configured)
        const resendApiKey = process.env.RESEND_API_KEY
        const toEmail = process.env.CONTACT_EMAIL_TO || 'contact@krastysoft.com'
        // Use custom domain if verified, otherwise fallback to Resend test domain
        const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

        if (resendApiKey) {
            try {
                const emailPayload: any = {
                    from: fromEmail,
                    to: [toEmail],
                    subject: `New Contact Form Submission from ${name}`,
                    html: `
                        <h2>New Contact Form Submission</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
                        <p><strong>Message:</strong></p>
                        <p>${message.replace(/\n/g, '<br>')}</p>
                        ${attachmentData ? `<p><strong>Attachment:</strong> ${attachmentData.filename}</p>` : ''}
                    `,
                    reply_to: email,
                }

                if (attachmentData) {
                    emailPayload.attachments = [
                        {
                            filename: attachmentData.filename,
                            content: attachmentData.content,
                        },
                    ]
                }

                const response = await fetch('https://api.resend.com/emails', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${resendApiKey}`,
                    },
                    body: JSON.stringify(emailPayload),
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    console.error('Resend API error:', errorData)
                    throw new Error('Failed to send email')
                }

                return new Response(
                    JSON.stringify({
                        success: true,
                        message: 'Message sent successfully!',
                    }),
                    { status: 200, headers: { 'content-type': 'application/json' } }
                )
            } catch (emailError) {
                console.error('Email sending error:', emailError)
                // Fallback to logging
            }
        }

        // Fallback: Log to console (for development or if email not configured)
        console.log('📬 New contact form submission:')
        console.log(`Name: ${name}`)
        console.log(`Email: ${email}`)
        console.log(`Phone: ${phone || 'N/A'}`)
        console.log(`Message: ${message}`)
        if (attachmentData) {
            console.log(`Attachment: ${attachmentData.filename} (${attachmentData.contentType})`)
        }

        // Return success even if email not sent (logged to console)
        return new Response(
            JSON.stringify({
                success: true,
                message: 'Message received! (Logged to server console)',
            }),
            { status: 200, headers: { 'content-type': 'application/json' } }
        )
    } catch (error) {
        console.error('Contact form error:', error)
        return new Response(
            JSON.stringify({
                error: 'Failed to process your message. Please try again.',
                details: process.env.NODE_ENV === 'development' ? String(error) : undefined,
            }),
            { status: 500, headers: { 'content-type': 'application/json' } }
        )
    }
}

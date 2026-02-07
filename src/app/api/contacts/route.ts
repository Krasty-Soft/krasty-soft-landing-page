export const runtime = 'nodejs'
import { Buffer } from 'buffer'

/**
 * Contact form API endpoint
 * 
 * To enable email sending, add to your .env:
 * RESEND_API_KEY=re_xxxxxxxxxxxx
 * CONTACT_EMAIL_TO=your-email@krasty.me
 * 
 * Get Resend API key from: https://resend.com
 */

export async function POST(req: Request) {
    try {
        const formData = await req.formData()
        const name = String(formData.get('name') || '').trim()
        const email = String(formData.get('email') || '').trim()
        const phone = String(formData.get('phone') || '').trim()
        const message = String(formData.get('message') || '').trim()
        const attach = formData.get('attach') as File | null

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
        const toEmail = process.env.CONTACT_EMAIL_TO || 'sales@krasty.me'

        if (resendApiKey) {
            try {
                const emailPayload: any = {
                    from: 'Krasty Soft Website <noreply@krasty.me>',
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

export const runtime = 'nodejs'
import { Buffer } from 'buffer'

export async function POST(req: Request) {
    console.log('process.env.NEXT_RUNTIME', process.env.NEXT_RUNTIME)
    try {
        console.log('process.env.NEXT_RUNTIME', process.env.NEXT_RUNTIME)
        const path = process.env.RETOOL_CONTACT_URL
        const apiKey = process.env.RETOOL_API_KEY
        if (!path || !apiKey) {
            return new Response(JSON.stringify({ error: 'Missing env var' }), {
                status: 500,
                headers: { 'content-type': 'application/json' },
            })
        }

        const contentType = req.headers.get('content-type') || ''
        let payloadInput: Record<string, unknown> = {}

        if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData()
            const name = String(formData.get('name') || '')
            const email = String(formData.get('email') || '')
            const phone = String(formData.get('phone') || '')
            const message = String(formData.get('message') || '')
            const attach = formData.get('attach') as File | null

            let attachment: Record<string, unknown> | null = null
            if (
                attach &&
                typeof attach.arrayBuffer === 'function' &&
                attach.size > 0
            ) {
                const arrayBuffer = await attach.arrayBuffer()
                const base64 = Buffer.from(arrayBuffer).toString('base64')
                attachment = {
                    filename: attach.name,
                    mimeType: attach.type,
                    size: attach.size,
                    base64,
                }
            }

            payloadInput = { name, email, phone, message, attachment }
        } else {
            // Fallback to JSON body if needed
            const body = await req.json().catch(() => ({}))
            payloadInput = body?.input || body || {}
        }

        const response = await fetch(path, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'X-Workflow-Api-Key': apiKey,
            },
            body: JSON.stringify({ input: payloadInput }),
        })

        const text = await response.text()
        if (!response.ok) {
            return new Response(
                JSON.stringify({
                    error: 'Retool request failed',
                    status: response.status,
                    body: text,
                }),
                { status: 502, headers: { 'content-type': 'application/json' } }
            )
        }

        let json: unknown
        try {
            json = JSON.parse(text)
        } catch {
            json = { ok: true, message: 'Triggered successfully' }
        }

        return new Response(JSON.stringify(json), {
            status: 200,
            headers: { 'content-type': 'application/json' },
        })
    } catch (error) {
        return new Response(
            JSON.stringify({
                error: 'Unexpected server error',
                details: String(error),
            }),
            { status: 500, headers: { 'content-type': 'application/json' } }
        )
    }
}

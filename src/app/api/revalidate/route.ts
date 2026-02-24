import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret')

    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    try {
        // Cases
        revalidatePath('/case-studies')
        revalidatePath('/case-studies/[slug]', 'page')

        // Blog posts
        revalidatePath('/blog')
        revalidatePath('/blog/[slug]', 'page')

        // Careers / jobs
        revalidatePath('/careers')
        revalidatePath('/careers/[slug]', 'page')

        return NextResponse.json({ revalidated: true, now: Date.now() })
    } catch {
        return NextResponse.json(
            { message: 'Error revalidating' },
            { status: 500 },
        )
    }
}

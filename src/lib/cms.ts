import { createClient, type EntrySkeletonType } from 'contentful'

type ContentfulClientOptions = {
    space: string
    accessToken: string
    host?: string
}

function getRequiredEnv(name: string): string | undefined {
    const value = process.env[name]
    return value && value.length > 0 ? value : undefined
}

export function getContentfulClient(
    options?: Partial<ContentfulClientOptions>
) {
    const space = options?.space ?? getRequiredEnv('CONTENTFUL_SPACE_ID')
    const accessToken =
        options?.accessToken ?? getRequiredEnv('CONTENTFUL_DELIVERY_TOKEN')
    const host =
        options?.host ??
        (getRequiredEnv('CONTENTFUL_HOST') || 'cdn.contentful.com')

    if (!space || !accessToken) {
        // Return a dummy client-like object that throws on use; callers should guard
        return null as any
    }

    return createClient({ space, accessToken, host })
}

export async function safeGetEntries<T extends EntrySkeletonType>(
    query: Parameters<ReturnType<typeof getContentfulClient>['getEntries']>[0]
) {
    const client = getContentfulClient()
    if (!client) return null
    try {
        const res = await (client as any).getEntries(query)
        return res
    } catch {
        return null
    }
}

import { createClient, type EntrySkeletonType } from 'contentful'

type ContentfulClientOptions = {
    space: string
    accessToken: string
    host?: string
}

export function getContentfulClient(
    options?: Partial<ContentfulClientOptions>
) {
    const space = process.env.CONTENTFUL_SPACE_ID
    const accessToken = process.env.CONTENTFUL_DELIVERY_API_TOKEN
    const host = process.env.CONTENTFUL_HOST || 'cdn.contentful.com'

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
    if (!client) {
        console.log('Contentful client not initialized - missing env variables')
        return null
    }
    try {
        const res = await (client as any).getEntries(query)
        console.log(
            `Contentful query for ${(query as any).content_type} returned ${
                res?.items?.length || 0
            } items`
        )
        return res
    } catch (error) {
        console.error('Contentful API error:', error)
        return null
    }
}

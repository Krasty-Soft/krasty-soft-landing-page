import React from 'react'
import { createSlug } from './util'

type RichTextNode = {
    nodeType: string
    data?: Record<string, unknown>
    content?: RichTextNode[]
    value?: string
}

// Helper function to extract text content from a node
export function extractTextContent(node: RichTextNode): string {
    if (!node) return ''

    if (node.nodeType === 'text' && node.value) {
        return node.value
    }

    if (node.content) {
        return node.content.map(extractTextContent).join('')
    }

    return ''
}

// Function to extract all heading-2 text values from content
export function extractHeadingsForTOC(content: RichTextNode[]): string[] {
    if (!Array.isArray(content)) return []

    const headings: string[] = []

    for (const node of content) {
        if (node.nodeType === 'heading-2') {
            const text = extractTextContent(node)
            if (text) {
                headings.push(text)
            }
        }

        // Also check embedded entries that might contain heading-2 elements
        if (node.nodeType === 'embedded-entry-block') {
            const embeddedContent = (node.data as any)?.target?.fields?.content?.content
            if (Array.isArray(embeddedContent)) {
                headings.push(...extractHeadingsForTOC(embeddedContent))
            }
        }
    }

    return headings
}

export function renderRichTextAsHtml(
    content: RichTextNode[],
): React.ReactElement[] {
    if (!Array.isArray(content)) {
        console.warn('renderRichTextAsHtml expects an array of nodes')
        return []
    }

    return content.map((node, index) => renderRichTextNode(node, index))
}

// Editors paste full krastysoft.com URLs into Contentful, which would open our
// own pages in a new tab. Make them relative, and point any link to a contact
// form at this page's own form (every page has it in the footer) so the click
// scrolls down instead of loading another post.
function normalizeHref(href: string): string {
    const own = href.match(/^(?:https?:)?\/\/(?:www\.)?krastysoft\.com(\/[^?#]*)?(\?[^#]*)?(#.*)?$/i)
    const relative = own ? `${own[1] || '/'}${own[2] || ''}${own[3] || ''}` : href
    const hash = relative.match(/#.*$/)?.[0]
    return hash === '#contacts' ? hash : relative
}

function renderRichTextNode(
    node: RichTextNode,
    key: number | string,
): React.ReactElement {
    if (!node) return React.createElement(React.Fragment, { key })

    const { nodeType, content, value } = node

    // Text node. Only the `code` mark is rendered: bold and italic marks are
    // deliberately ignored so emphasis on keywords never reaches the page.
    if (nodeType === 'text') {
        const isCode = (node as any).marks?.some(
            (mark: { type: string }) => mark.type === 'code',
        )
        return isCode
            ? React.createElement('code', { key }, value || '')
            : React.createElement(React.Fragment, { key }, value || '')
    }

    // Paragraph
    if (nodeType === 'paragraph') {
        return React.createElement(
            'p',
            { key },
            content?.map((child, i) =>
                renderRichTextNode(child, `${key}-${i}`),
            ),
        )
    }

    // Headings
    if (nodeType.startsWith('heading-')) {
        const level = nodeType.split('-')[1]
        const tag = `h${level}`

        // Add id for h2 elements for TOC functionality
        const props: { key: string | number; id?: string } = { key }

        if (level === '2') {
            const textContent = extractTextContent(node)
            props.id = createSlug(textContent)
        }

        return React.createElement(
            tag,
            props,
            content?.map((child, i) =>
                renderRichTextNode(child, `${key}-${i}`),
            ),
        )
    }

    // Hyperlink — without this, links in rich text render as plain text
    if (nodeType === 'hyperlink') {
        const href = normalizeHref((node as any).data?.uri || '')
        const isInternal = href.startsWith('/') || href.startsWith('#')
        return React.createElement(
            'a',
            {
                key,
                href,
                ...(isInternal
                    ? {}
                    : { target: '_blank', rel: 'noopener noreferrer' }),
            },
            content?.map((child, i) =>
                renderRichTextNode(child, `${key}-${i}`),
            ),
        )
    }

    // Embedded asset (images and infographics inserted into the post body).
    // A plain <img> rather than next/image, so SVGs work without enabling
    // dangerouslyAllowSVG; width/height reserve the space to avoid layout shift.
    // Wide infographics get small on phones, so the image links to the full file.
    if (nodeType === 'embedded-asset-block') {
        const fields = (node.data as any)?.target?.fields
        const file = fields?.file
        if (!file?.url || !file.contentType?.startsWith('image/')) {
            return React.createElement(React.Fragment, { key })
        }
        const src = file.url.startsWith('//') ? `https:${file.url}` : file.url
        const size = file.details?.image
        return React.createElement(
            'figure',
            { key, className: 'my-8' },
            React.createElement(
                'a',
                { href: src, target: '_blank', rel: 'noopener noreferrer' },
                React.createElement('img', {
                    src,
                    alt: fields.description || fields.title || '',
                    width: size?.width,
                    height: size?.height,
                    loading: 'lazy',
                    decoding: 'async',
                    className: 'block w-full h-auto rounded-lg',
                }),
            ),
        )
    }

    // Unordered list
    if (nodeType === 'unordered-list') {
        return React.createElement(
            'ul',
            { key },
            content?.map((child, i) =>
                renderRichTextNode(child, `${key}-${i}`),
            ),
        )
    }

    // Ordered list
    if (nodeType === 'ordered-list') {
        return React.createElement(
            'ol',
            { key },
            content?.map((child, i) =>
                renderRichTextNode(child, `${key}-${i}`),
            ),
        )
    }

    // List item
    if (nodeType === 'list-item') {
        const children = content?.map((child, i) => {
            if (child.nodeType === 'paragraph') {
                return child.content?.map((grandchild, j) =>
                    renderRichTextNode(grandchild, `${key}-${i}-${j}`),
                )
            }
            return renderRichTextNode(child, `${key}-${i}`)
        })

        return React.createElement('li', { key }, children)
    }

    // Embedded entry block (This is Section content type from Contentful)
    if (nodeType === 'embedded-entry-block') {
        const target = (node.data as any)?.target
        const fields = target?.fields
        const contentType = target?.sys?.contentType?.sys?.id

        // Handle "summary" content type (used in overview)
        if (contentType === 'summary') {
            const sections = []

            if (fields?.niche) {
                sections.push(
                    React.createElement(
                        'div',
                        { 
                            key: `${key}-niche`, 
                            style: { 
                                marginBottom: '2rem'
                            } 
                        },
                        React.createElement(
                            'strong',
                            { className: 'text-xl mb-3 font-medium block' },
                            'Niche',
                        ),
                        React.createElement(
                            'p',
                            { style: { color: 'var(--text-secondary)', lineHeight: '1.7' } },
                            fields.niche,
                        ),
                    ),
                )
            }

            if (fields?.problematic?.content) {
                sections.push(
                    React.createElement(
                        'div',
                        { 
                            key: `${key}-problematic`, 
                            style: { 
                                marginBottom: '2rem'
                            } 
                        },
                        React.createElement(
                            'strong',
                            { className: 'text-xl mb-3 font-medium block' },
                            'Problematic',
                        ),
                        fields.problematic.content.map(
                            (child: RichTextNode, i: number) =>
                                renderRichTextNode(child, `${key}-prob-${i}`),
                        ),
                    ),
                )
            }

            if (fields?.solution?.content) {
                sections.push(
                    React.createElement(
                        'div',
                        { key: `${key}-solution`, className: 'mb-6' },
                        React.createElement(
                            'strong',
                            { className: 'text-xl mb-3 font-medium block' },
                            'Solution',
                        ),
                        fields.solution.content.map(
                            (child: RichTextNode, i: number) =>
                                renderRichTextNode(child, `${key}-sol-${i}`),
                        ),
                    ),
                )
            }

            if (fields?.technologies) {
                sections.push(
                    React.createElement(
                        'div',
                        { 
                            key: `${key}-tech`, 
                            style: { 
                                marginBottom: '2rem'
                            } 
                        },
                        React.createElement(
                            'strong',
                            { className: 'text-xl mb-3 font-medium block' },
                            'Technologies',
                        ),
                        React.createElement(
                            'p',
                            { style: { color: 'var(--text-secondary)', lineHeight: '1.7' } },
                            fields.technologies,
                        ),
                    ),
                )
            }

            return React.createElement(
                'section',
                { key, className: 'mb-c-50' },
                sections,
            )
        }

        // Handle "section" content type (used in main content)
        const wrapperTag = fields?.type || 'div'
        const embeddedContent = fields?.content

        if (embeddedContent && embeddedContent.content) {
            return React.createElement(
                wrapperTag,
                { key, className: 'mb-c-50' },
                embeddedContent.content.map((child: RichTextNode, i: number) =>
                    renderRichTextNode(child, `${key}-${i}`),
                ),
            )
        }

        return React.createElement(React.Fragment, { key })
    }

    // Fallback: render content if available
    if (content) {
        return React.createElement(
            'div',
            { key, className: '' },
            content.map((child, i) => renderRichTextNode(child, `${key}-${i}`)),
        )
    }

    return React.createElement(React.Fragment, { key })
}

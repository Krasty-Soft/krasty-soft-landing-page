import React from 'react'
import { createSlug } from './util'

type RichTextNode = {
    nodeType: string
    data?: any
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
            const embeddedContent = node.data?.target?.fields?.content?.content
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

function renderRichTextNode(
    node: RichTextNode,
    key: number | string,
): React.ReactElement {
    if (!node) return React.createElement(React.Fragment, { key })

    const { nodeType, content, value } = node

    // Text node
    if (nodeType === 'text') {
        return React.createElement(React.Fragment, { key }, value || '')
    }

    // Paragraph
    if (nodeType === 'paragraph') {
        return React.createElement(
            'p',
            { key, className: 'text-dark-grey mb-4' },
            content?.map((child, i) =>
                renderRichTextNode(child, `${key}-${i}`),
            ),
        )
    }

    // Headings
    if (nodeType.startsWith('heading-')) {
        const level = nodeType.split('-')[1]
        const tag = `h${level}`
        let className = ''

        // Add specific classes for each heading level
        if (level === '2') className = 'text-2xl mb-4'
        if (level === '3') className = 'text-xl mb-4 font-medium'
        if (level === '4') className = 'text-xl mb-4 font-medium'

        // Add id for h2 elements for TOC functionality
        const props: { key: string | number; className: string; id?: string } =
            {
                key,
                className,
            }

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

    // Unordered list
    if (nodeType === 'unordered-list') {
        return React.createElement(
            'ul',
            {
                key,
                className:
                    'list-disc list-inside text-dark-grey mt-4 space-y-2 mb-4',
            },
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

        return React.createElement('li', { key, className: '' }, children)
    }

    // Embedded entry block (This is Section content type from Contentful)
    if (nodeType === 'embedded-entry-block') {
        const target = node.data?.target
        const fields = target?.fields
        const contentType = target?.sys?.contentType?.sys?.id

        // Handle "summary" content type (used in overview)
        if (contentType === 'summary') {
            const sections = []

            if (fields?.niche) {
                sections.push(
                    React.createElement(
                        'div',
                        { key: `${key}-niche`, className: 'mb-6' },
                        React.createElement(
                            'strong',
                            { className: 'text-xl mb-3 font-medium block' },
                            'Niche',
                        ),
                        React.createElement(
                            'p',
                            { className: 'text-dark-grey' },
                            fields.niche,
                        ),
                    ),
                )
            }

            if (fields?.problematic?.content) {
                sections.push(
                    React.createElement(
                        'div',
                        { key: `${key}-problematic`, className: 'mb-6' },
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
                        { key: `${key}-tech`, className: 'mb-6' },
                        React.createElement(
                            'strong',
                            { className: 'text-xl mb-3 font-medium block' },
                            'Technologies',
                        ),
                        React.createElement(
                            'p',
                            { className: 'text-dark-grey' },
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

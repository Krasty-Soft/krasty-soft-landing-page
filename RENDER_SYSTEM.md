# Contentful Rich Text Renderer - Technical Documentation

> **Comprehensive guide to understanding the custom rendering system for Contentful Rich Text content**

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Type System](#type-system)
- [Core Functions](#core-functions)
- [Rendering Process](#rendering-process)
- [Supported Node Types](#supported-node-types)
- [Embedded Content](#embedded-content)
- [Table of Contents Generation](#table-of-contents-generation)
- [Styling System](#styling-system)
- [Design Decisions](#design-decisions)

---

## Overview

**File:** `src/lib/render.ts`
**Lines of Code:** 267
**Purpose:** Transform Contentful Rich Text JSON into React elements

### What It Does

This renderer takes structured JSON data from Contentful's Rich Text fields and converts it into fully-styled React components. It handles:

- ✅ Standard rich text elements (paragraphs, headings, lists)
- ✅ Nested content structures
- ✅ Custom Contentful content types (embedded entries)
- ✅ Automatic ID generation for navigation
- ✅ Table of Contents extraction
- ✅ Consistent styling via Tailwind CSS

### Why It's Needed

Contentful stores rich text as structured JSON (not HTML). This renderer:

1. Converts JSON to React elements (not just HTML strings)
2. Applies consistent styling across all content
3. Handles custom content types specific to this project
4. Enables features like automatic table of contents
5. Provides type-safe rendering with TypeScript

---

## Architecture

### High-Level Flow

```
Contentful Rich Text JSON
         ↓
extractHeadingsForTOC() → [Array of heading texts]
         ↓
renderRichTextAsHtml()
         ↓
renderRichTextNode() (recursive)
         ↓
React Elements with Tailwind Classes
```

### Key Components

1. **Type Definition** - `RichTextNode` interface
2. **Entry Point** - `renderRichTextAsHtml()` function
3. **Recursive Renderer** - `renderRichTextNode()` function
4. **Text Extraction** - `extractTextContent()` helper
5. **TOC Generation** - `extractHeadingsForTOC()` helper

---

## Type System

### RichTextNode Type

```typescript
type RichTextNode = {
    nodeType: string // Type identifier (e.g., 'paragraph', 'heading-2')
    data?: any // Additional metadata (used for embedded entries)
    content?: RichTextNode[] // Child nodes (recursive structure)
    value?: string // Text value (for text nodes only)
}
```

### Node Type Examples

**Text Node:**

```json
{
    "nodeType": "text",
    "value": "Hello World"
}
```

**Paragraph Node:**

```json
{
    "nodeType": "paragraph",
    "content": [{ "nodeType": "text", "value": "Some text" }]
}
```

**Embedded Entry:**

```json
{
    "nodeType": "embedded-entry-block",
    "data": {
        "target": {
            "sys": { "contentType": { "sys": { "id": "summary" } } },
            "fields": {
                "niche": "Healthcare",
                "technologies": "React, Node.js"
            }
        }
    }
}
```

---

## Core Functions

### 1. renderRichTextAsHtml()

**Purpose:** Entry point for rendering rich text content

**Signature:**

```typescript
function renderRichTextAsHtml(content: RichTextNode[]): React.ReactElement[]
```

**Input:** Array of top-level Contentful nodes
**Output:** Array of React elements

**Process:**

1. Validates input is an array
2. Maps each node to `renderRichTextNode()`
3. Returns array of React elements

**Error Handling:**

- Logs warning if input is not an array
- Returns empty array on invalid input

**Usage:**

```typescript
const richText = caseStudy.content.content // Contentful data
const elements = renderRichTextAsHtml(richText)

return <div>{elements}</div>
```

---

### 2. renderRichTextNode()

**Purpose:** Recursively render a single node and its children

**Signature:**

```typescript
function renderRichTextNode(
    node: RichTextNode,
    key: number | string,
): React.ReactElement
```

**Input:**

- `node` - The node to render
- `key` - React key for list rendering

**Output:** Single React element

**Process:**

1. Check node type
2. Apply appropriate rendering logic
3. Recursively render child nodes
4. Return React element with styling

**Key Feature:** Recursive design handles any depth of nesting

---

### 3. extractTextContent()

**Purpose:** Extract plain text from a node tree

**Signature:**

```typescript
function extractTextContent(node: RichTextNode): string
```

**Input:** Any RichTextNode
**Output:** Concatenated text content

**Algorithm:**

```typescript
if (node is text node) → return node.value
if (node has children) → recursively extract from all children
otherwise → return empty string
```

**Use Cases:**

- Generate heading IDs for navigation
- Extract text for SEO
- Create table of contents labels

**Example:**

```typescript
const heading = {
    nodeType: 'heading-2',
    content: [
        { nodeType: 'text', value: 'Introduction' },
        { nodeType: 'text', value: ' to React' },
    ],
}

extractTextContent(heading) // → "Introduction to React"
```

---

### 4. extractHeadingsForTOC()

**Purpose:** Extract all h2 headings for table of contents

**Signature:**

```typescript
function extractHeadingsForTOC(content: RichTextNode[]): string[]
```

**Input:** Array of content nodes
**Output:** Array of heading text strings

**Algorithm:**

1. Iterate through all nodes
2. When `heading-2` found → extract text
3. When embedded entry found → recursively search inside
4. Return collected headings

**Why Only H2?**

- H2 represents main sections
- Creates clean, navigable TOC
- Prevents overly deep nesting

**Usage:**

```typescript
const content = caseStudy.content.content
const headings = extractHeadingsForTOC(content)

// headings = ["Overview", "Challenges", "Solution", "Results"]

// Then render TOC:
<nav>
  {headings.map(h => (
    <a href={`#${createSlug(h)}`}>{h}</a>
  ))}
</nav>
```

---

## Rendering Process

### Step-by-Step Example

**Input Data (Contentful JSON):**

```json
[
    {
        "nodeType": "heading-2",
        "content": [{ "nodeType": "text", "value": "Project Overview" }]
    },
    {
        "nodeType": "paragraph",
        "content": [
            { "nodeType": "text", "value": "This is a case study about..." }
        ]
    }
]
```

**Rendering Steps:**

**Step 1:** Call `renderRichTextAsHtml(data)`

```typescript
renderRichTextAsHtml([...]) // Entry point
```

**Step 2:** Map over nodes

```typescript
data.map((node, index) => renderRichTextNode(node, index))
```

**Step 3:** Render first node (heading-2)

```typescript
// nodeType is 'heading-2'
// Extract level: '2'
// Create tag: 'h2'
// Extract text: "Project Overview"
// Create slug: "project-overview"

React.createElement(
    'h2',
    {
        key: 0,
        className: 'text-2xl mb-4',
        id: 'project-overview',
    },
    [React.createElement(React.Fragment, { key: '0-0' }, 'Project Overview')],
)
```

**Step 4:** Render second node (paragraph)

```typescript
React.createElement(
    'p',
    {
        key: 1,
        className: 'text-dark-grey mb-4',
    },
    [
        React.createElement(
            React.Fragment,
            { key: '1-0' },
            'This is a case study about...',
        ),
    ],
)
```

**Final Output:**

```jsx
;[
    <h2 key={0} className="text-2xl mb-4" id="project-overview">
        Project Overview
    </h2>,
    <p key={1} className="text-dark-grey mb-4">
        This is a case study about...
    </p>,
]
```

---

## Supported Node Types

### 1. Text Node

**Node Type:** `text`

**Structure:**

```typescript
{ nodeType: 'text', value: 'Some text' }
```

**Rendered As:**

```jsx
<React.Fragment>Some text</React.Fragment>
```

**Notes:**

- Leaf node (no children)
- Directly displays value
- Used inside other nodes

---

### 2. Paragraph

**Node Type:** `paragraph`

**Structure:**

```typescript
{
  nodeType: 'paragraph',
  content: [/* text nodes */]
}
```

**Rendered As:**

```jsx
<p className="text-dark-grey mb-4">{children}</p>
```

**Styling:**

- Grey text color (`text-dark-grey`)
- Bottom margin (`mb-4`)
- Recursive child rendering

---

### 3. Headings

**Node Types:** `heading-1`, `heading-2`, `heading-3`, `heading-4`, `heading-5`, `heading-6`

**Dynamic Rendering:**

```typescript
const level = nodeType.split('-')[1] // Extract '2' from 'heading-2'
const tag = `h${level}` // Create 'h2'
```

**Special H2 Features:**

```typescript
if (level === '2') {
    const text = extractTextContent(node)
    props.id = createSlug(text) // Add ID for navigation
}
```

**Styling by Level:**

| Level  | Tag          | Classes                    | ID                |
| ------ | ------------ | -------------------------- | ----------------- |
| H2     | `<h2>`       | `text-2xl mb-4`            | ✅ Auto-generated |
| H3     | `<h3>`       | `text-xl mb-4 font-medium` | ❌                |
| H4     | `<h4>`       | `text-xl mb-4 font-medium` | ❌                |
| Others | `<h1>`, etc. | (none)                     | ❌                |

**Example H2 Output:**

```jsx
<h2 id="key-features" className="text-2xl mb-4">
    Key Features
</h2>
```

**Why IDs for H2?**

- Enables anchor navigation (`#key-features`)
- Powers table of contents
- Improves accessibility

---

### 4. Unordered List

**Node Type:** `unordered-list`

**Structure:**

```typescript
{
  nodeType: 'unordered-list',
  content: [
    { nodeType: 'list-item', content: [...] },
    { nodeType: 'list-item', content: [...] }
  ]
}
```

**Rendered As:**

```jsx
<ul className="list-disc list-inside text-dark-grey mt-4 space-y-2 mb-4">
    {listItems}
</ul>
```

**Styling:**

- Disc bullets (`list-disc`)
- Bullets inside (`list-inside`)
- Grey text
- Vertical spacing between items (`space-y-2`)
- Top and bottom margins

---

### 5. List Item

**Node Type:** `list-item`

**Special Handling:**

```typescript
if (nodeType === 'list-item') {
  const children = content?.map((child, i) => {
    if (child.nodeType === 'paragraph') {
      // Unwrap paragraph to avoid <li><p> nesting
      return child.content?.map((grandchild, j) =>
        renderRichTextNode(grandchild, `${key}-${i}-${j}`)
      )
    }
    return renderRichTextNode(child, `${key}-${i}`)
  })

  return <li key={key}>{children}</li>
}
```

**Why Unwrap Paragraphs?**

- Contentful wraps list item content in `<p>` tags
- Results in `<li><p>text</p></li>`
- Better to have clean `<li>text</li>`
- Avoids extra spacing from paragraph margins

**Output:**

```jsx
<li key={key}>Text content</li>
```

---

### 6. Embedded Entry Block

**Node Type:** `embedded-entry-block`

**Purpose:** Render custom Contentful content types embedded in rich text

**Structure:**

```typescript
{
  nodeType: 'embedded-entry-block',
  data: {
    target: {
      sys: {
        contentType: {
          sys: { id: 'summary' } // Content type identifier
        }
      },
      fields: {
        // Content type specific fields
      }
    }
  }
}
```

**Two Content Types Supported:**

#### A. Summary Content Type

**Used For:** Case study overview sections

**Fields:**

- `niche` (Text) - Industry/niche
- `problematic` (Rich Text) - Problem description
- `solution` (Rich Text) - Solution description
- `technologies` (Text) - Technologies used

**Rendered Structure:**

```jsx
<section className="mb-c-50">
    <div className="mb-6">
        <strong className="text-xl mb-3 font-medium block">Niche</strong>
        <p className="text-dark-grey">{fields.niche}</p>
    </div>

    <div className="mb-6">
        <strong className="text-xl mb-3 font-medium block">Problematic</strong>
        {renderRichText(fields.problematic)}
    </div>

    <div className="mb-6">
        <strong className="text-xl mb-3 font-medium block">Solution</strong>
        {renderRichText(fields.solution)}
    </div>

    <div className="mb-6">
        <strong className="text-xl mb-3 font-medium block">Technologies</strong>
        <p className="text-dark-grey">{fields.technologies}</p>
    </div>
</section>
```

**Visual Example:**

```
┌─────────────────────────────────┐
│ Niche                           │
│ Healthcare Management           │
│                                 │
│ Problematic                     │
│ Hospitals struggled with...     │
│                                 │
│ Solution                        │
│ We developed a custom...        │
│                                 │
│ Technologies                    │
│ React, Node.js, PostgreSQL      │
└─────────────────────────────────┘
```

#### B. Section Content Type

**Used For:** Generic content sections

**Fields:**

- `type` (Text) - HTML tag to use (default: 'div')
- `content` (Rich Text) - Section content

**Rendered Structure:**

```jsx
<{wrapperTag} className="mb-c-50">
  {renderRichText(fields.content)}
</{wrapperTag}>
```

**Example:**

```typescript
// If type = 'section'
<section className="mb-c-50">
  <h2>Additional Information</h2>
  <p>More details here...</p>
</section>
```

**Fallback:**
If embedded entry doesn't match known types:

```jsx
<React.Fragment key={key} />
```

---

## Table of Contents Generation

### Two-Phase Process

**Phase 1: Extract Headings**

```typescript
const headings = extractHeadingsForTOC(content)
// Returns: ["Overview", "Challenges", "Results"]
```

**Phase 2: Render with IDs**

```typescript
// During rendering, H2 tags get IDs:
<h2 id="overview">Overview</h2>
<h2 id="challenges">Challenges</h2>
<h2 id="results">Results</h2>
```

### Complete Example

**Contentful Data:**

```json
[
    {
        "nodeType": "heading-2",
        "content": [{ "nodeType": "text", "value": "Project Goals" }]
    },
    {
        "nodeType": "paragraph",
        "content": [{ "nodeType": "text", "value": "..." }]
    },
    {
        "nodeType": "heading-2",
        "content": [{ "nodeType": "text", "value": "Technical Stack" }]
    }
]
```

**Step 1: Extract TOC**

```typescript
const toc = extractHeadingsForTOC(content)
// toc = ["Project Goals", "Technical Stack"]
```

**Step 2: Render TOC Component**

```jsx
<nav className="table-of-contents">
    <ul>
        <li>
            <a href="#project-goals">Project Goals</a>
        </li>
        <li>
            <a href="#technical-stack">Technical Stack</a>
        </li>
    </ul>
</nav>
```

**Step 3: Render Content with IDs**

```jsx
<div className="content">
    <h2 id="project-goals" className="text-2xl mb-4">
        Project Goals
    </h2>
    <p className="text-dark-grey mb-4">...</p>

    <h2 id="technical-stack" className="text-2xl mb-4">
        Technical Stack
    </h2>
</div>
```

**Result:** Clicking "Project Goals" in TOC scrolls to the heading

### Slug Generation

Uses `createSlug()` from `src/lib/util.ts`:

```typescript
"Project Goals" → "project-goals"
"What's Next?" → "whats-next"
"API Integration (v2)" → "api-integration-v2"
```

**Benefits:**

- URL-safe anchors
- Clean, readable URLs
- Handles special characters
- Consistent formatting

---

## Styling System

### Tailwind Classes Used

| Element          | Classes                                                    | Purpose                                |
| ---------------- | ---------------------------------------------------------- | -------------------------------------- |
| Paragraph        | `text-dark-grey mb-4`                                      | Grey text, bottom margin               |
| H2               | `text-2xl mb-4`                                            | Large text, bottom margin              |
| H3/H4            | `text-xl mb-4 font-medium`                                 | Medium-large text, semi-bold           |
| List             | `list-disc list-inside text-dark-grey mt-4 space-y-2 mb-4` | Styled bullets with spacing            |
| Section          | `mb-c-50`                                                  | Large bottom margin (custom spacing)   |
| Summary Sections | `mb-6`                                                     | Medium bottom margin                   |
| Summary Titles   | `text-xl mb-3 font-medium block`                           | Medium-large, semi-bold, block display |

### Custom Spacing

**`mb-c-50`** - Custom spacing token

- Defined in `globals.css`
- Value: `3.125rem` (50px)
- Used for major section separation

### Color Palette

| Class            | CSS Variable        | Hex Value |
| ---------------- | ------------------- | --------- |
| `text-dark-grey` | `--color-dark-grey` | `#727272` |
| `text-black`     | `--color-black`     | `#121514` |

### Typography Scale

| Class      | Font Size        | Line Height |
| ---------- | ---------------- | ----------- |
| `text-2xl` | `1.5rem` (24px)  | Default     |
| `text-xl`  | `1.25rem` (20px) | Default     |

### Why These Styles?

1. **Consistency** - All content looks uniform
2. **Readability** - Grey text reduces eye strain
3. **Hierarchy** - Clear visual structure
4. **Spacing** - Comfortable reading flow
5. **Responsive** - Works on all screen sizes

---

## Design Decisions

### 1. Why React.createElement Instead of JSX?

**Decision:** Use `React.createElement()` programmatically

**Reasons:**

- ✅ Dynamic element creation based on data
- ✅ No need to map all possible combinations
- ✅ Cleaner for recursive rendering
- ✅ Easier to add attributes dynamically

**Alternative (rejected):**

```tsx
// Would require massive switch statement
if (nodeType === 'paragraph') return <p>{children}</p>
if (nodeType === 'heading-2') return <h2>{children}</h2>
// ... 20+ more cases
```

---

### 2. Why Not Use @contentful/rich-text-react-renderer?

**Decision:** Build custom renderer

**Official Package Limitations:**

- ❌ Limited styling control
- ❌ Complex override syntax
- ❌ Harder to customize embedded entries
- ❌ Additional dependency

**Custom Renderer Benefits:**

- ✅ Full control over output
- ✅ Tailwind integration
- ✅ Custom content types
- ✅ Project-specific features (TOC, IDs)
- ✅ No extra dependencies

---

### 3. Why Only H2 for Table of Contents?

**Decision:** Extract only `heading-2` nodes

**Reasoning:**

- ✅ H1 typically used for page title
- ✅ H2 represents main sections
- ✅ H3+ are subsections (too granular)
- ✅ Creates clean, scannable TOC
- ✅ Matches common documentation patterns

**Example:**

```
✅ Good TOC:
• Overview
• Features
• Implementation
• Results

❌ Too detailed:
• Overview
  › What is this?
  › Why it matters
• Features
  › Feature 1
    › Subfeature A
    › Subfeature B
  › Feature 2
...
```

---

### 4. Why Unwrap Paragraphs in List Items?

**Decision:** Remove paragraph wrapper inside `<li>`

**Problem:**

```jsx
// Contentful structure
<li>
    <p className="text-dark-grey mb-4">Item text</p>
</li>
// Extra margin causes too much spacing
```

**Solution:**

```jsx
// Unwrapped
<li>Item text</li>
// Clean, proper spacing
```

**Code:**

```typescript
if (child.nodeType === 'paragraph') {
    // Extract grandchildren instead of rendering paragraph
    return child.content?.map((grandchild, j) =>
        renderRichTextNode(grandchild, `${key}-${i}-${j}`),
    )
}
```

---

### 5. Why Recursive Rendering?

**Decision:** Use recursive function for rendering

**Benefits:**

- ✅ Handles unlimited nesting depth
- ✅ Clean, maintainable code
- ✅ Mirrors Contentful's tree structure
- ✅ Natural for tree-like data

**Alternative (rejected):**

```typescript
// Flat iteration - breaks with nesting
content.forEach((node) => {
    if (node.nodeType === 'paragraph') {
        // But what about nested content inside paragraph?
    }
})
```

**Recursive Solution:**

```typescript
function render(node) {
    // Handle this node
    if (node.content) {
        // Recursively handle children
        node.content.map((child) => render(child))
    }
}
```

---

### 6. Why Separate extractTextContent?

**Decision:** Create dedicated text extraction function

**Use Cases:**

- TOC generation
- ID/slug generation
- SEO metadata
- Search indexing

**Benefits:**

- ✅ Reusable across features
- ✅ Handles nested text nodes
- ✅ Clean separation of concerns
- ✅ Easy to test

**Without It:**

```typescript
// Would need to duplicate logic everywhere
const text = node.content.map((c) => c.value).join('') // ❌ Doesn't handle nesting
```

---

### 7. Why className Instead of Styled Components?

**Decision:** Use Tailwind classes inline

**Reasoning:**

- ✅ Consistent with project styling
- ✅ No additional CSS files
- ✅ Easy to see all styles
- ✅ Tailwind purging removes unused CSS
- ✅ No runtime style injection

**Alternative (rejected):**

```typescript
// Styled components
const StyledParagraph = styled.p`
    color: #727272;
    margin-bottom: 1rem;
`
// Adds complexity, bundle size
```

---

## Error Handling

### Input Validation

**Check for Array:**

```typescript
if (!Array.isArray(content)) {
    console.warn('renderRichTextAsHtml expects an array of nodes')
    return []
}
```

**Null Node Handling:**

```typescript
if (!node) return React.createElement(React.Fragment, { key })
```

### Fallback Rendering

**Unknown Node Types:**

```typescript
// If nodeType doesn't match any case
if (content) {
    return React.createElement('div', { key } /* render children */)
}
return React.createElement(React.Fragment, { key })
```

**Missing Embedded Entry Data:**

```typescript
if (!embeddedContent || !embeddedContent.content) {
    return React.createElement(React.Fragment, { key })
}
```

### Graceful Degradation

- ❌ Unknown node type → Renders empty fragment (invisible)
- ❌ Missing data → Renders empty fragment
- ❌ Invalid structure → Console warning + empty array
- ✅ Partial data → Renders what's available

---

## Performance Considerations

### Optimization Techniques

1. **No Virtual DOM Diffing During Render**
    - Pure function, no state
    - React handles reconciliation

2. **Stable Keys**
    - Uses index-based keys
    - Keys include parent path (`${key}-${i}`)
    - Prevents re-render issues

3. **No Re-rendering Triggers**
    - Function is pure
    - No side effects
    - Deterministic output

4. **Minimal Computations**
    - Text extraction only when needed
    - Slug generation only for H2
    - No unnecessary traversals

### Scalability

**Small Content (< 50 nodes):**

- Renders instantly
- Negligible performance impact

**Medium Content (50-200 nodes):**

- Still very fast (< 10ms)
- No noticeable delay

**Large Content (200+ nodes):**

- May take 10-50ms
- Still acceptable for SSR
- Consider pagination if > 500 nodes

**Very Large Content (> 1000 nodes):**

- May need optimization
- Consider splitting into sections
- Implement lazy loading

---

## Testing Strategy

### Unit Tests

**Test extractTextContent:**

```typescript
test('extracts text from simple node', () => {
    const node = { nodeType: 'text', value: 'Hello' }
    expect(extractTextContent(node)).toBe('Hello')
})

test('extracts text from nested nodes', () => {
    const node = {
        nodeType: 'paragraph',
        content: [
            { nodeType: 'text', value: 'Hello ' },
            { nodeType: 'text', value: 'World' },
        ],
    }
    expect(extractTextContent(node)).toBe('Hello World')
})
```

**Test extractHeadingsForTOC:**

```typescript
test('extracts h2 headings', () => {
    const content = [
        {
            nodeType: 'heading-2',
            content: [{ nodeType: 'text', value: 'Section 1' }],
        },
        {
            nodeType: 'paragraph',
            content: [{ nodeType: 'text', value: 'Text' }],
        },
        {
            nodeType: 'heading-2',
            content: [{ nodeType: 'text', value: 'Section 2' }],
        },
    ]

    const headings = extractHeadingsForTOC(content)
    expect(headings).toEqual(['Section 1', 'Section 2'])
})
```

**Test Rendering:**

```typescript
test('renders paragraph with class', () => {
    const content = [
        {
            nodeType: 'paragraph',
            content: [{ nodeType: 'text', value: 'Test' }],
        },
    ]

    const result = renderRichTextAsHtml(content)
    // Verify result contains <p> element with correct class
})
```

---

## Future Enhancements

### Potential Improvements

1. **Bold/Italic Support**

    ```typescript
    if (nodeType === 'bold') {
      return <strong>{children}</strong>
    }
    ```

2. **Links**

    ```typescript
    if (nodeType === 'hyperlink') {
      return <a href={node.data.uri}>{children}</a>
    }
    ```

3. **Images**

    ```typescript
    if (nodeType === 'embedded-asset-block') {
      return <img src={node.data.target.fields.file.url} alt="..." />
    }
    ```

4. **Code Blocks**

    ```typescript
    if (nodeType === 'code') {
      return <pre><code>{value}</code></pre>
    }
    ```

5. **Tables**

    ```typescript
    if (nodeType === 'table') {
        // Render table with rows and cells
    }
    ```

6. **Ordered Lists**
    ```typescript
    if (nodeType === 'ordered-list') {
      return <ol className="list-decimal">{children}</ol>
    }
    ```

---

## Troubleshooting

### Common Issues

**Issue 1: Headings Not Showing in TOC**

```typescript
// Check nodeType is exactly 'heading-2'
console.log(node.nodeType) // Should be 'heading-2', not 'heading-1'
```

**Issue 2: Embedded Entry Not Rendering**

```typescript
// Verify content type ID
console.log(node.data?.target?.sys?.contentType?.sys?.id)
// Must be 'summary' or 'section'
```

**Issue 3: Missing Styles**

```typescript
// Ensure Tailwind classes are defined in globals.css
// Check class names match exactly
```

**Issue 4: Incorrect Nesting**

```typescript
// Verify Contentful structure matches expected format
console.log(JSON.stringify(content, null, 2))
```

---

## Summary

### Key Takeaways

1. **Purpose:** Convert Contentful Rich Text JSON to styled React elements
2. **Approach:** Recursive rendering with `React.createElement()`
3. **Features:** TOC generation, auto IDs, custom content types
4. **Styling:** Tailwind CSS for consistency
5. **Extensible:** Easy to add new node types
6. **Performance:** Fast, pure function with minimal overhead
7. **Type-Safe:** TypeScript interfaces for all structures

### When to Modify This File

- ✅ Adding new Contentful content types
- ✅ Changing content styling
- ✅ Adding new rich text node types (links, images, etc.)
- ✅ Modifying TOC behavior
- ✅ Customizing embedded entry rendering

### When NOT to Modify

- ❌ For page-specific styling (use page components)
- ❌ For data fetching (use CMS functions)
- ❌ For layout changes (use layout components)

---

**Last Updated:** January 29, 2026
**File Version:** 1.0.0
**Lines of Code:** 267

# Contentful CMS Integration

> **Complete guide to Contentful integration and content management**

## Table of Contents

- [Overview](#overview)
- [Configuration](#configuration)
- [API Functions](#api-functions)
- [Content Types](#content-types)
- [Data Flow](#data-flow)
- [Error Handling](#error-handling)
- [Usage Patterns](#usage-patterns)
- [Troubleshooting](#troubleshooting)

---

## Overview

**File:** `src/lib/cms.ts`
**Purpose:** Centralized Contentful CMS client and data fetching utilities

### What This Does

- Creates authenticated Contentful client
- Provides safe wrapper for CMS queries
- Handles missing credentials gracefully
- Enables preview mode support
- Centralizes error handling

### Integration Pattern

```
Environment Variables → Client Creation → Safe Queries → Data or Null
```

**Key Principle:** The app works with or without Contentful. Missing credentials trigger fallback to local mock data.

---

## Configuration

### Environment Variables

**Required:**

```env
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_DELIVERY_API_TOKEN=your_token_here
```

**Optional:**

```env
# Use preview API instead of production
CONTENTFUL_HOST=preview.contentful.com

# Custom content type IDs (defaults shown)
CONTENTFUL_POST_TYPE_ID=post
CONTENTFUL_JOB_TYPE_ID=job
CONTENTFUL_CASE_TYPE_ID=case
```

### API Modes

**Production Mode (default):**

```env
# Uses published content only
CONTENTFUL_HOST=cdn.contentful.com  # (default if not set)
```

**Preview Mode:**

```env
# Shows draft/unpublished content
CONTENTFUL_HOST=preview.contentful.com
# Requires Preview API token instead of Delivery token
```

---

## API Functions

### 1. getContentfulClient()

**Purpose:** Create and return authenticated Contentful client

**Signature:**

```typescript
function getContentfulClient(
    options?: Partial<ContentfulClientOptions>,
): ReturnType<typeof createClient> | null
```

**Parameters:**

```typescript
type ContentfulClientOptions = {
    space: string // Contentful space ID
    accessToken: string // API access token
    host?: string // API host (cdn or preview)
}
```

**Returns:**

- Contentful client instance if credentials exist
- `null` if credentials missing

**Implementation:**

```typescript
export function getContentfulClient(
    options?: Partial<ContentfulClientOptions>,
) {
    const space = process.env.CONTENTFUL_SPACE_ID
    const accessToken = process.env.CONTENTFUL_DELIVERY_API_TOKEN
    const host = process.env.CONTENTFUL_HOST || 'cdn.contentful.com'

    if (!space || !accessToken) {
        // Return null - caller should handle gracefully
        return null as any
    }

    return createClient({ space, accessToken, host })
}
```

**Behavior:**

- ✅ Reads from environment variables
- ✅ Defaults to production CDN
- ✅ Returns `null` if credentials missing (no error thrown)
- ✅ Accepts optional overrides (unused in current codebase)

**Why Return Null?**

- Allows app to run without Contentful configured
- Enables local development with mock data
- Simplifies error handling in consuming code

---

### 2. safeGetEntries()

**Purpose:** Safely query Contentful with automatic error handling

**Signature:**

```typescript
async function safeGetEntries<T extends EntrySkeletonType>(
    query: Parameters<ReturnType<typeof getContentfulClient>['getEntries']>[0],
): Promise<ContentfulResponse<T> | null>
```

**Parameters:**

```typescript
query: {
    content_type: string       // Required: content type ID
    'fields.slug'?: string    // Optional: filter by slug
    select?: string[]         // Optional: field selection
    limit?: number            // Optional: max results
    include?: number          // Optional: reference depth
    // ... other Contentful query parameters
}
```

**Returns:**

- `ContentfulResponse<T>` - Query results with items array
- `null` - If client not initialized or error occurs

**Implementation:**

```typescript
export async function safeGetEntries<T extends EntrySkeletonType>(
    query: Parameters<ReturnType<typeof getContentfulClient>['getEntries']>[0],
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
            } items`,
        )
        return res
    } catch (error) {
        console.error('Contentful API error:', error)
        return null
    }
}
```

**Features:**

1. **Null Client Check**

    ```typescript
    if (!client) {
        console.log('Contentful client not initialized...')
        return null
    }
    ```

    - No error thrown
    - Logs helpful message
    - Returns null for fallback handling

2. **Try-Catch Error Handling**

    ```typescript
    try {
        const res = await client.getEntries(query)
        return res
    } catch (error) {
        console.error('Contentful API error:', error)
        return null
    }
    ```

    - Catches network errors
    - Catches API errors (invalid queries, rate limits)
    - Logs error details
    - Returns null (no crash)

3. **Debug Logging**
    ```typescript
    console.log(
        `Contentful query for ${query.content_type} returned ${
            res?.items?.length || 0
        } items`,
    )
    ```

    - Logs query success
    - Shows content type queried
    - Shows number of results
    - Helps debug content issues

---

## Content Types

The integration expects these content types in Contentful:

### 1. Post (Blog Posts)

**Content Type ID:** `post` (configurable)

**Required Fields:**

- `slug` (Symbol) - Unique URL identifier
- `title` (Text) - Post title
- `tags` (Array) - Category tags
- `content` (Rich Text) - Post body
- `preview` (Asset) - Preview image

**Query Example:**

```typescript
await safeGetEntries({
    content_type: 'post',
    'fields.slug': 'my-blog-post',
    limit: 1,
    include: 1,
})
```

---

### 2. Job (Career Listings)

**Content Type ID:** `job` (configurable)

**Required Fields:**

- `slug` (Symbol) - Unique URL identifier
- `title` (Text) - Job title
- `description` (Text) - Job description
- `tags` (Text) - Employment details
- `link` (Text) - Application URL

**Query Example:**

```typescript
await safeGetEntries({
    content_type: 'job',
    select: ['fields.slug'],
    limit: 1000,
})
```

---

### 3. Case (Case Studies)

**Content Type ID:** `case` (configurable)

**Required Fields:**

- `slug` (Symbol) - Unique URL identifier
- `title` (Text) - Case study title
- `tags` (Text) - Comma-separated tags
- `cardDescription` (Text) - Short description
- `preview` (Asset) - Card image
- `media` (Array of Assets) - Gallery images
- `template` (Text) - Template type
- `seoTitle` (Text) - SEO meta title
- `seoDescription` (Text) - SEO description
- `content` (Rich Text) - Main content
- `overview` (Rich Text) - Overview section

**Query Example:**

```typescript
await safeGetEntries({
    content_type: 'case',
    'fields.slug': 'crm-system',
    limit: 1,
    include: 1,
})
```

---

### 4. Summary (Embedded Content)

**Content Type ID:** `summary`

**Used In:** Case study overviews (embedded in rich text)

**Fields:**

- `niche` (Text) - Industry/niche
- `problematic` (Rich Text) - Problem description
- `solution` (Rich Text) - Solution description
- `technologies` (Text) - Tech stack

**Usage:** Embedded in rich text as `embedded-entry-block`

---

### 5. Section (Generic Content Block)

**Content Type ID:** `section`

**Used In:** Generic content sections

**Fields:**

- `type` (Text) - HTML tag name
- `content` (Rich Text) - Section content

**Usage:** Embedded in rich text as `embedded-entry-block`

---

## Data Flow

### Complete Flow Example

**1. Page Component Requests Data**

```typescript
// app/case-studies/[slug]/page.tsx
import { getCaseBySlug } from '@/lib/cases'

export default async function CaseStudyPage({ params }) {
    const caseStudy = await getCaseBySlug(params.slug)
    // ...
}
```

**2. Data Module Queries CMS**

```typescript
// lib/cases.tsx
import { safeGetEntries } from '@/lib/cms'

export async function getCaseBySlug(slug: string) {
    const res = await safeGetEntries<CaseSkeleton>({
        content_type: 'case',
        'fields.slug': slug,
        limit: 1,
        include: 1,
    })

    if (res && res.items.length > 0) {
        // Transform Contentful data
        return transformCase(res.items[0])
    }

    // Fallback to mock data
    return mockCases.find((c) => c.slug === slug)
}
```

**3. CMS Module Handles Request**

```typescript
// lib/cms.ts
export async function safeGetEntries(query) {
    const client = getContentfulClient()

    if (!client) {
        console.log('Missing credentials')
        return null // → Triggers fallback
    }

    try {
        const res = await client.getEntries(query)
        console.log(`Found ${res.items.length} items`)
        return res // → Data returned
    } catch (error) {
        console.error('API error:', error)
        return null // → Triggers fallback
    }
}
```

**4. Component Receives Data**

```typescript
// Either Contentful data OR mock data
// Component doesn't know/care which
```

### Flow Diagram

```
┌─────────────────┐
│ Page Component  │
└────────┬────────┘
         │ getCaseBySlug()
         ▼
┌─────────────────┐
│ Data Module     │
│ (lib/cases)     │
└────────┬────────┘
         │ safeGetEntries()
         ▼
┌─────────────────┐
│ CMS Module      │
│ (lib/cms)       │
└────────┬────────┘
         │
         ├─ Credentials? ──No──► return null
         │                          │
         └─ Yes                     │
            │                       │
            ▼                       │
         ┌──────┐                  │
         │ API  │                  │
         └──┬───┘                  │
            │                       │
            ├─ Success ──► Data     │
            │                       │
            └─ Error ────► null ────┘
                                    │
                                    ▼
                        ┌────────────────────┐
                        │ Fallback Mock Data │
                        └────────────────────┘
```

---

## Error Handling

### Error Scenarios

**1. Missing Credentials**

```typescript
// No CONTENTFUL_SPACE_ID or CONTENTFUL_DELIVERY_API_TOKEN
const client = getContentfulClient()
// → Returns null
// → Logs: "Contentful client not initialized - missing env variables"
// → App uses mock data
```

**2. Network Error**

```typescript
try {
    const res = await client.getEntries(query)
} catch (error) {
    // → Network timeout, DNS failure, etc.
    // → Logs: "Contentful API error: [details]"
    // → Returns null
    // → App uses mock data
}
```

**3. Invalid Query**

```typescript
await safeGetEntries({
    content_type: 'nonexistent_type',
})
// → API returns error
// → Caught by try-catch
// → Logs error
// → Returns null
// → App uses mock data
```

**4. Rate Limiting**

```typescript
// Too many API requests
// → Contentful returns 429 error
// → Caught by try-catch
// → Returns null
// → App continues with fallback data
```

### Handling Pattern

**Every data module follows this pattern:**

```typescript
export async function getData(params) {
    const res = await safeGetEntries({
        /* query */
    })

    if (res && res.items.length > 0) {
        // Transform and return CMS data
        return transformData(res.items)
    }

    // Fallback to local mock data
    return mockData
}
```

**Benefits:**

- ✅ Never crashes the app
- ✅ Always returns data (real or mock)
- ✅ Graceful degradation
- ✅ Works in development without Contentful
- ✅ Resilient to API outages

---

## Usage Patterns

### Pattern 1: Get Single Entry by Slug

```typescript
import { safeGetEntries } from '@/lib/cms'

async function getPostBySlug(slug: string) {
    const res = await safeGetEntries({
        content_type: 'post',
        'fields.slug': slug,
        limit: 1,
        include: 1, // Include referenced entries
    })

    if (res && res.items.length > 0) {
        const entry = res.items[0]
        return {
            slug: entry.fields.slug,
            title: entry.fields.title,
            // ... transform fields
        }
    }

    return null
}
```

**Query Details:**

- `content_type` - Which content type to query
- `'fields.slug'` - Filter by slug field
- `limit: 1` - Only need one result
- `include: 1` - Include one level of references

---

### Pattern 2: Get All Entries

```typescript
async function getAllPosts() {
    const res = await safeGetEntries({
        content_type: 'post',
        limit: 1000, // Maximum entries
    })

    if (res && res.items.length > 0) {
        return res.items.map(transformPost)
    }

    return mockPosts
}
```

**Notes:**

- Contentful default limit is 100
- Maximum limit is 1000
- For > 1000 entries, use pagination

---

### Pattern 3: Select Specific Fields

```typescript
async function getAllSlugs() {
    const res = await safeGetEntries({
        content_type: 'post',
        select: ['fields.slug'], // Only fetch slug field
        limit: 1000,
    })

    if (res) {
        return res.items.map((i) => ({ slug: i.fields.slug }))
    }

    return mockSlugs
}
```

**Benefits:**

- Faster API response
- Lower bandwidth usage
- Useful for static path generation

---

### Pattern 4: Include Referenced Entries

```typescript
async function getCaseWithReferences(slug: string) {
    const res = await safeGetEntries({
        content_type: 'case',
        'fields.slug': slug,
        limit: 1,
        include: 2, // Include 2 levels of references
    })

    // Access nested references:
    // res.items[0].fields.relatedCase.fields.title
}
```

**Include Levels:**

- `include: 0` - No references (default)
- `include: 1` - Direct references only
- `include: 2` - References + their references
- Max: `include: 10`

---

## Troubleshooting

### Issue 1: "Contentful client not initialized"

**Symptom:**

```
Console: Contentful client not initialized - missing env variables
```

**Cause:** Missing or incorrect environment variables

**Solution:**

```bash
# Check .env.local exists
ls -la .env.local

# Verify variables are set
cat .env.local | grep CONTENTFUL
```

**Fix:**

```env
# Add to .env.local
CONTENTFUL_SPACE_ID=abc123def456
CONTENTFUL_DELIVERY_API_TOKEN=your_token_here
```

**Restart dev server:**

```bash
npm run dev
```

---

### Issue 2: "Contentful API error"

**Symptom:**

```
Console: Contentful API error: [error details]
```

**Common Causes:**

**A. Invalid Token**

```
Error: The access token you sent could not be found
```

Fix: Check token is correct and not expired

**B. Wrong Space ID**

```
Error: The resource could not be found
```

Fix: Verify `CONTENTFUL_SPACE_ID` matches your space

**C. Content Type Doesn't Exist**

```
Error: The content type 'xyz' does not exist
```

Fix: Create content type in Contentful or fix type ID

**D. Preview Token on Production Host**

```
Error: Invalid credentials
```

Fix: Either use `CONTENTFUL_HOST=preview.contentful.com` or use Delivery token

---

### Issue 3: Query Returns 0 Items

**Symptom:**

```
Console: Contentful query for post returned 0 items
```

**Debugging:**

**Check content is published:**

```typescript
// In Contentful web app:
// 1. Open entry
// 2. Check status (should be "Published")
// 3. If "Draft", click "Publish"
```

**Check field values:**

```typescript
// Verify slug field matches query
await safeGetEntries({
    content_type: 'post',
    'fields.slug': 'exact-slug-here', // Must match exactly
})
```

**Check in Preview mode:**

```env
# Add to .env.local to see draft content
CONTENTFUL_HOST=preview.contentful.com
```

---

### Issue 4: App Uses Mock Data Instead of Contentful

**Expected:** CMS data
**Actual:** Hardcoded mock data

**Debugging Steps:**

1. **Check environment variables loaded:**

    ```typescript
    // Add temporary console.log in cms.ts
    console.log('Space ID:', process.env.CONTENTFUL_SPACE_ID)
    console.log('Token exists:', !!process.env.CONTENTFUL_DELIVERY_API_TOKEN)
    ```

2. **Verify .env.local location:**

    ```bash
    # Must be in project root
    /Users/vel-mak/Projects/krasty-site/.env.local
    ```

3. **Check data module logic:**

    ```typescript
    // In lib/posts.ts, lib/cases.tsx, etc.
    const res = await safeGetEntries(...)

    if (res && res.items.length > 0) {
        return transformData(res)  // ← Should hit this
    }

    return mockData  // ← Currently hitting this
    ```

4. **Add debug logging:**
    ```typescript
    const res = await safeGetEntries(...)
    console.log('CMS Response:', res)
    console.log('Items:', res?.items?.length)
    ```

---

### Issue 5: Images Not Loading

**Symptom:** Broken image URLs from Contentful assets

**Cause:** Missing `https:` protocol prefix

**Solution:** Already handled in data modules:

```typescript
const previewUrl = fields.preview?.fields?.file?.url

// Transform URL
const fullUrl = previewUrl.startsWith('http')
    ? previewUrl
    : `https:${previewUrl}` // Add protocol
```

**Contentful URL Format:**

```
// Contentful returns:
//images.ctfassets.net/space/asset.jpg

// Transform to:
https://images.ctfassets.net/space/asset.jpg
```

---

## Best Practices

### 1. Always Use safeGetEntries

❌ **Don't:**

```typescript
const client = getContentfulClient()
const res = await client.getEntries({ ... })  // May crash
```

✅ **Do:**

```typescript
const res = await safeGetEntries({ ... })  // Safe
if (res) {
    // Use data
}
```

---

### 2. Always Provide Fallback

❌ **Don't:**

```typescript
async function getData() {
    const res = await safeGetEntries({ ... })
    return res.items  // Crashes if res is null
}
```

✅ **Do:**

```typescript
async function getData() {
    const res = await safeGetEntries({ ... })

    if (res && res.items.length > 0) {
        return res.items
    }

    return mockData  // Always return something
}
```

---

### 3. Log Query Results

✅ **Include debug info:**

```typescript
const res = await safeGetEntries({ content_type: 'post' })

console.log(`Fetched ${res?.items?.length || 0} posts from CMS`)

if (!res) {
    console.log('Using mock data fallback')
}
```

**Benefits:**

- Easy to debug content issues
- Visibility into CMS vs mock data
- Helps identify API problems

---

### 4. Use Type Parameters

✅ **Type-safe queries:**

```typescript
interface PostSkeleton extends EntrySkeletonType {
    contentTypeId: 'post'
    fields: {
        slug: string
        title: string
        content: string
    }
}

const res = await safeGetEntries<PostSkeleton>({
    content_type: 'post',
})

// res.items[0].fields.slug  ← TypeScript knows this exists
```

---

### 5. Limit Field Selection

✅ **Optimize for performance:**

```typescript
// For listing pages - only fetch what you need
await safeGetEntries({
    content_type: 'post',
    select: ['fields.slug', 'fields.title', 'fields.preview'],
})

// For detail pages - fetch everything
await safeGetEntries({
    content_type: 'post',
    'fields.slug': slug,
    include: 1, // Include referenced content
})
```

---

## Summary

### Key Points

1. **Centralized CMS access** via `getContentfulClient()` and `safeGetEntries()`
2. **Graceful degradation** with mock data fallback
3. **Error resilience** with try-catch and null returns
4. **Environment-based** configuration via `.env.local`
5. **Preview mode support** for draft content
6. **Type-safe queries** with TypeScript generics

### When to Modify cms.ts

✅ **Should modify:**

- Adding new CMS configuration options
- Changing error handling behavior
- Adding query utilities
- Modifying logging

❌ **Should NOT modify:**

- Adding content type queries (put in separate files)
- Adding data transformation (put in data modules)
- Adding UI components (wrong layer)

### Related Files

- `lib/posts.ts` - Blog posts data & queries
- `lib/jobs.ts` - Job listings data & queries
- `lib/cases.tsx` - Case studies data & queries
- `lib/render.ts` - Rich text rendering

---

**Last Updated:** January 29, 2026
**File:** `src/lib/cms.ts` (45 lines)

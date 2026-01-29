# Retool API Integration

> **Complete guide to the contact form API and Retool workflow integration**

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [API Endpoint](#api-endpoint)
- [File Upload Handling](#file-upload-handling)
- [Frontend Integration](#frontend-integration)
- [Error Handling](#error-handling)
- [Environment Configuration](#environment-configuration)
- [Testing](#testing)
- [Troubleshooting](#troubleshooting)

---

## Overview

### Purpose

The contact form API acts as a **proxy** between the frontend form and a Retool workflow. It:

1. ✅ Accepts form submissions from the website
2. ✅ Processes file attachments (converts to base64)
3. ✅ Forwards data to Retool workflow
4. ✅ Returns workflow response to frontend
5. ✅ Handles errors gracefully

### Why This Architecture?

**Problem:** Can't call Retool directly from browser

- ❌ Exposes API keys in client-side code
- ❌ CORS restrictions
- ❌ No request preprocessing

**Solution:** Next.js API route as middleware

- ✅ API keys stay server-side
- ✅ No CORS issues
- ✅ Can transform data (base64 encoding)
- ✅ Centralized error handling

### Flow Diagram

```
┌─────────────┐
│   User      │
│   Form      │
└──────┬──────┘
       │ POST multipart/form-data
       │ (name, email, phone, message, file)
       ▼
┌─────────────────────────┐
│ Next.js API Route       │
│ /api/contacts           │
│                         │
│ 1. Validate env vars    │
│ 2. Parse form data      │
│ 3. Convert file→base64  │
│ 4. Build JSON payload   │
└──────┬──────────────────┘
       │ POST application/json
       │ X-Workflow-Api-Key: ***
       │ { input: {...} }
       ▼
┌─────────────────────────┐
│ Retool Workflow         │
│                         │
│ • Process contact       │
│ • Save to database      │
│ • Send notifications    │
│ • Handle attachment     │
└──────┬──────────────────┘
       │ Response
       ▼
┌─────────────────────────┐
│ Next.js API Route       │
│ Returns response        │
└──────┬──────────────────┘
       │ JSON response
       ▼
┌─────────────┐
│   User      │
│   Form      │
│ "Success!"  │
└─────────────┘
```

---

## Architecture

### File Structure

```
src/
├── app/
│   └── api/
│       └── contacts/
│           └── route.ts           # API endpoint
│
└── components/
    └── blocks/
        ├── contact-form/
        │   └── index.tsx           # CTA component (scroll to form)
        │
        └── footer/
            └── form.tsx            # Actual form with submission
```

### Component Responsibilities

**`route.ts` (API Route)**

- Server-side only
- Handles HTTP requests
- Manages Retool communication
- Error handling

**`form.tsx` (Frontend Form)**

- Client-side component
- Form validation
- File upload UI
- API communication

**`contact-form/index.tsx` (CTA)**

- Call-to-action section
- Scrolls to footer form
- No actual form logic

---

## API Endpoint

### Endpoint Details

**Path:** `/api/contacts`
**Method:** `POST`
**Runtime:** Node.js (explicitly set)
**File:** `src/app/api/contacts/route.ts`

### Runtime Configuration

```typescript
export const runtime = 'nodejs'
```

**Why Node.js Runtime?**

- ✅ Access to `Buffer` for base64 conversion
- ✅ Full Node.js APIs available
- ✅ Better for file processing
- ❌ Edge Runtime doesn't support all Node APIs

---

### Request Format

**Content-Type:** `multipart/form-data` (primary) or `application/json` (fallback)

**Form Fields:**

| Field     | Type   | Required | Validation                 | Description             |
| --------- | ------ | -------- | -------------------------- | ----------------------- |
| `name`    | string | ✅ Yes   | min 2 chars                | User's name             |
| `email`   | string | ✅ Yes   | valid email                | User's email address    |
| `phone`   | string | ❌ No    | -                          | Phone number (optional) |
| `message` | string | ✅ Yes   | min 10 chars               | Contact message         |
| `attach`  | File   | ❌ No    | max 15MB, specific formats | File attachment         |

**Allowed File Formats:**

- PDF (`.pdf`)
- Word (`.doc`, `.docx`)
- Excel (`.xls`, `.xlsx`)
- PowerPoint (`.ppt`, `.pptx`)

---

### Request Handling

**Step 1: Environment Check**

```typescript
const path = process.env.RETOOL_CONTACT_URL
const apiKey = process.env.RETOOL_API_KEY

if (!path || !apiKey) {
    return new Response(JSON.stringify({ error: 'Missing env var' }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
    })
}
```

**Why Fail Fast?**

- ✅ No point processing if can't forward to Retool
- ✅ Clear error message for debugging
- ✅ Prevents unnecessary processing

---

**Step 2: Content Type Detection**

```typescript
const contentType = req.headers.get('content-type') || ''

if (contentType.includes('multipart/form-data')) {
    // Handle file upload
} else {
    // Handle JSON (fallback)
}
```

**Two Paths:**

1. **Multipart** - Primary path for form submissions with files
2. **JSON** - Fallback for programmatic API calls

---

**Step 3A: Parse Multipart Form Data**

```typescript
const formData = await req.formData()
const name = String(formData.get('name') || '')
const email = String(formData.get('email') || '')
const phone = String(formData.get('phone') || '')
const message = String(formData.get('message') || '')
const attach = formData.get('attach') as File | null
```

**Type Safety:**

- Convert all fields to strings (even if null)
- Handle file as `File` type or `null`
- No assumptions about data types

---

**Step 3B: Process File Attachment**

```typescript
let attachment: Record<string, unknown> | null = null

if (attach && typeof attach.arrayBuffer === 'function' && attach.size > 0) {
    const arrayBuffer = await attach.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')

    attachment = {
        filename: attach.name,
        mimeType: attach.type,
        size: attach.size,
        base64,
    }
}
```

**File Processing:**

1. Check file exists and has content
2. Read as ArrayBuffer
3. Convert to base64 string
4. Package with metadata

**Why Base64?**

- ✅ JSON-safe (can send in API request)
- ✅ Preserves binary data
- ✅ Standard format for file transmission
- ✅ Retool can decode and use

---

**Step 4: Forward to Retool**

```typescript
const response = await fetch(path, {
    method: 'POST',
    headers: {
        'content-type': 'application/json',
        'X-Workflow-Api-Key': apiKey,
    },
    body: JSON.stringify({ input: payloadInput }),
})
```

**Payload Structure:**

```json
{
    "input": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "message": "I'd like to discuss a project...",
        "attachment": {
            "filename": "proposal.pdf",
            "mimeType": "application/pdf",
            "size": 245678,
            "base64": "JVBERi0xLjQKJeLjz9MK..."
        }
    }
}
```

**Headers:**

- `content-type: application/json` - JSON payload
- `X-Workflow-Api-Key` - Authentication

**Note:** Retool expects `{ input: {...} }` wrapper

---

**Step 5: Handle Retool Response**

```typescript
const text = await response.text()

if (!response.ok) {
    return new Response(
        JSON.stringify({
            error: 'Retool request failed',
            status: response.status,
            body: text,
        }),
        { status: 502, headers: { 'content-type': 'application/json' } },
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
```

**Response Handling:**

1. **Parse Response**
    - Read as text first (safer than `.json()`)
    - Try parsing JSON
    - Fallback to success message if not JSON

2. **Error Cases**
    - Retool returns non-200 → 502 Bad Gateway
    - Include Retool's status and body for debugging
    - Client sees detailed error

3. **Success Cases**
    - Forward Retool's response
    - Or use default success message

---

### Response Format

**Success (200):**

```json
{
    "ok": true,
    "message": "Triggered successfully"
}
```

**Missing Environment Variables (500):**

```json
{
    "error": "Missing env var"
}
```

**Retool Request Failed (502):**

```json
{
    "error": "Retool request failed",
    "status": 400,
    "body": "Retool error message"
}
```

**Unexpected Error (500):**

```json
{
    "error": "Unexpected server error",
    "details": "Error: connection timeout"
}
```

---

## File Upload Handling

### Frontend Validation

**File Size Limit:** 15MB

```typescript
const maxBytes = 15 * 1024 * 1024 // 15MB

if (file.size > maxBytes) {
    setFileError('Attachment must be 15MB or smaller')
    return
}
```

**Allowed MIME Types:**

```typescript
const allowedMimeTypes = new Set([
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
])
```

**Allowed Extensions:**

```typescript
const allowedExtensions = new Set([
    '.pdf',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
    '.ppt',
    '.pptx',
])
```

**Validation Strategy:**

```typescript
const typeOk = allowedMimeTypes.has(file.type)
const ext = file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
const extOk = allowedExtensions.has(ext)

if (!typeOk && !extOk) {
    setFileError('Only PDF or MS Office formats allowed')
    return
}
```

**Why Check Both?**

- MIME type can be spoofed
- Extension is more reliable
- Check both for better security

---

### Base64 Encoding Process

**1. Read File as ArrayBuffer**

```typescript
const arrayBuffer = await attach.arrayBuffer()
// ArrayBuffer: raw binary data
```

**2. Convert to Base64**

```typescript
const base64 = Buffer.from(arrayBuffer).toString('base64')
// Base64: ASCII string representing binary data
```

**3. Package with Metadata**

```typescript
attachment = {
    filename: 'document.pdf',
    mimeType: 'application/pdf',
    size: 245678,
    base64: 'JVBERi0xLjQKJeLjz9MK...',
}
```

### Size Implications

**Original File:** 15MB (max)
**Base64 Encoded:** ~20MB (33% overhead)
**JSON Payload:** ~20MB + metadata

**Base64 Overhead:**

- Every 3 bytes → 4 base64 characters
- Size increase: ~33%
- Acceptable tradeoff for JSON transmission

---

## Frontend Integration

### Form Component

**File:** `src/components/blocks/footer/form.tsx`
**Type:** Client component (`'use client'`)

### Key Features

**1. State Management**

```typescript
const [submitting, setSubmitting] = useState(false)
const [error, setError] = useState<string | null>(null)
const [success, setSuccess] = useState<string | null>(null)
const [fileName, setFileName] = useState<string | null>(null)
const [nameError, setNameError] = useState<string | null>(null)
const [emailError, setEmailError] = useState<string | null>(null)
const [messageError, setMessageError] = useState<string | null>(null)
const [fileError, setFileError] = useState<string | null>(null)
```

**Why Per-Field Errors?**

- ✅ Show errors next to relevant fields
- ✅ Clear UX feedback
- ✅ Can clear error when user fixes field

---

**2. Client-Side Validation**

```typescript
// Name validation
if (!name || name.length < 2) {
    setNameError('Name is required and must be at least 2 characters')
    hasError = true
}

// Email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
if (!email || !emailRegex.test(email)) {
    setEmailError('Please enter a valid email address')
    hasError = true
}

// Message validation
if (!message || message.length < 10) {
    setMessageError('Message is required and must be at least 10 characters')
    hasError = true
}
```

**Why Client-Side Validation?**

- ✅ Instant feedback (no round trip)
- ✅ Reduces server load
- ✅ Better UX
- ⚠️ Still need server validation (security)

---

**3. Form Submission**

```typescript
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)

    try {
        const formData = new FormData(e.currentTarget)

        const response = await fetch('/api/contacts', {
            method: 'POST',
            body: formData, // Automatically multipart/form-data
        })

        if (!response.ok) {
            const data = await response.json().catch(() => ({}))
            throw new Error(data?.error || 'Failed to send form')
        }

        setSuccess('Sent successfully!')
        e.currentTarget.reset()
        setFileName(null)
    } catch (err) {
        setError(String(err instanceof Error ? err.message : err))
    } finally {
        setSubmitting(false)
    }
}
```

**FormData Advantages:**

- ✅ Automatically handles multipart encoding
- ✅ Browser handles file reading
- ✅ Simple API
- ✅ Standard HTTP multipart format

---

**4. File Upload UI**

```typescript
function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate size
    if (file.size > 15 * 1024 * 1024) {
        setFileError('Attachment must be 15MB or smaller')
        e.target.value = ''
        return
    }

    // Validate format
    const typeOk = allowedMimeTypes.has(file.type)
    const extOk = allowedExtensions.has(getExtension(file.name))

    if (!typeOk && !extOk) {
        setFileError('Only PDF or MS Office formats allowed')
        e.target.value = ''
        return
    }

    setFileName(file.name)
}
```

**UX Features:**

- Shows selected filename
- Allows removing file
- Clear error messages
- Validates before submission

---

**5. Success Message with Auto-Hide**

```typescript
useEffect(() => {
    if (!success) return

    setSuccessVisible(true)
    const fadeTimer = setTimeout(() => setSuccessVisible(false), 9700)
    const hideTimer = setTimeout(() => setSuccess(null), 10000)

    return () => {
        clearTimeout(fadeTimer)
        clearTimeout(hideTimer)
    }
}, [success])
```

**Animation:**

- Shows success message
- Fades out after 9.7s
- Removes after 10s
- CSS transition for smooth fade

---

### Form Fields

**HTML Structure:**

```jsx
<form onSubmit={handleSubmit}>
    {/* Name */}
    <Input placeholder="Your name" name="name" required minLength={2} />

    {/* Email & Phone */}
    <Input placeholder="Your email" name="email" type="email" required />
    <Input placeholder="Your phone" name="phone" />

    {/* Message */}
    <textarea
        name="message"
        placeholder="Your message"
        required
        minLength={10}
    />

    {/* File Upload */}
    <input
        type="file"
        name="attach"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        onChange={handleFileChange}
    />

    {/* Submit */}
    <Button type="submit" disabled={submitting}>
        {submitting ? 'Sending…' : 'Send'}
    </Button>
</form>
```

---

## Error Handling

### Error Types and Responses

**1. Missing Environment Variables**

```typescript
// Server: route.ts
if (!path || !apiKey) {
    return new Response(JSON.stringify({ error: 'Missing env var' }), {
        status: 500,
    })
}
```

**Response:**

```json
{
    "error": "Missing env var"
}
```

**Client Impact:**

- Form shows: "Missing env var"
- User sees generic error
- Admin should check server logs

---

**2. Validation Errors (Client-Side)**

```typescript
// Client: form.tsx
if (!name || name.length < 2) {
    setNameError('Name is required and must be at least 2 characters')
}
```

**UX:**

- Red error text appears below field
- Form doesn't submit
- User can fix and retry instantly

---

**3. File Upload Errors**

```typescript
// Too large
if (file.size > maxBytes) {
    setFileError('Attachment must be 15MB or smaller')
}

// Wrong format
if (!typeOk && !extOk) {
    setFileError('Only PDF or MS Office formats allowed')
}
```

**UX:**

- Error appears below file input
- File is cleared from input
- User must select valid file

---

**4. Retool Workflow Errors**

```typescript
// Server: route.ts
if (!response.ok) {
    return new Response(
        JSON.stringify({
            error: 'Retool request failed',
            status: response.status,
            body: text,
        }),
        { status: 502 },
    )
}
```

**Example Response:**

```json
{
    "error": "Retool request failed",
    "status": 400,
    "body": "Invalid workflow input: missing field 'email'"
}
```

**Debugging:**

- Check Retool workflow logs
- Verify input structure matches expectations
- Check Retool workflow is published/enabled

---

**5. Network Errors**

```typescript
// Client: form.tsx
try {
    const response = await fetch('/api/contacts', {...})
} catch (err) {
    setError(String(err instanceof Error ? err.message : err))
}
```

**Examples:**

- Connection timeout
- DNS resolution failure
- CORS errors (shouldn't happen)

---

**6. Unexpected Errors**

```typescript
// Server: route.ts
try {
    // ... main logic
} catch (error) {
    return new Response(
        JSON.stringify({
            error: 'Unexpected server error',
            details: String(error),
        }),
        { status: 500 },
    )
}
```

**Catch-All:**

- Any unhandled exception
- Prevents server crash
- Logs error details
- Returns safe error message

---

### Error Flow Diagram

```
┌──────────────┐
│ Form Submit  │
└──────┬───────┘
       │
       ├─ Validation Error? ──► Show field error, stop
       │
       ▼
┌──────────────┐
│ API Request  │
└──────┬───────┘
       │
       ├─ Network Error? ──► Show connection error
       │
       ▼
┌──────────────┐
│ API Route    │
└──────┬───────┘
       │
       ├─ Missing Env? ──► 500 "Missing env var"
       │
       ▼
┌──────────────┐
│ Call Retool  │
└──────┬───────┘
       │
       ├─ Retool Error? ──► 502 "Retool request failed"
       │
       ├─ Unexpected Error? ──► 500 "Unexpected server error"
       │
       ▼
┌──────────────┐
│   Success    │
└──────────────┘
```

---

## Environment Configuration

### Required Variables

**File:** `.env.local`

```env
# Retool Workflow URL
RETOOL_CONTACT_URL=https://your-org.retool.com/api/v1/workflows/abc123/startTrigger?environment=production

# Retool API Key
RETOOL_API_KEY=retool_wk_1234567890abcdef
```

### Getting Retool Credentials

**1. Create Workflow in Retool**

- Log in to Retool
- Create new Workflow
- Add workflow logic (save to DB, send email, etc.)
- Enable "Webhook trigger"

**2. Get Webhook URL**

- Open workflow settings
- Copy webhook URL
- Set as `RETOOL_CONTACT_URL`

**3. Generate API Key**

- Go to Retool Settings → API Keys
- Create new workflow API key
- Copy key
- Set as `RETOOL_API_KEY`

### Security Notes

⚠️ **Never commit `.env.local` to git**

- Add to `.gitignore`
- Keys are secrets
- Each environment needs own keys

⚠️ **Use environment-specific endpoints**

```env
# Development
RETOOL_CONTACT_URL=...?environment=development

# Production
RETOOL_CONTACT_URL=...?environment=production
```

⚠️ **Rotate keys regularly**

- Retool supports key rotation
- Update `.env.local` with new key
- Restart application

---

## Testing

### Manual Testing

**1. Test Successful Submission**

```bash
# Start dev server
npm run dev

# Navigate to footer form
# Fill out form:
# - Name: "Test User"
# - Email: "test@example.com"
# - Phone: "+1234567890"
# - Message: "This is a test message for the contact form"

# Submit and verify:
# ✓ Success message appears
# ✓ Form resets
# ✓ Check Retool workflow was triggered
```

---

**2. Test File Upload**

```bash
# Prepare test file (< 15MB PDF)
# Upload via form
# Submit

# Verify:
# ✓ File name appears in UI
# ✓ Can remove file before submitting
# ✓ Success message after submit
# ✓ File received in Retool (check base64 field)
```

---

**3. Test Validation Errors**

```bash
# Test empty name
# → Should show: "Name is required and must be at least 2 characters"

# Test invalid email
# → Should show: "Please enter a valid email address"

# Test short message
# → Should show: "Message is required and must be at least 10 characters"

# Test large file (> 15MB)
# → Should show: "Attachment must be 15MB or smaller"

# Test wrong file type
# → Should show: "Only PDF or MS Office formats allowed"
```

---

**4. Test API Endpoint Directly**

```bash
# Using curl
curl -X POST http://localhost:3000/api/contacts \
  -F "name=Test User" \
  -F "email=test@example.com" \
  -F "phone=+1234567890" \
  -F "message=Test message from curl" \
  -F "attach=@/path/to/test.pdf"

# Expected response:
# {"ok":true,"message":"Triggered successfully"}
```

---

**5. Test Error Cases**

```bash
# Missing environment variables
# 1. Remove RETOOL_CONTACT_URL from .env.local
# 2. Restart server
# 3. Submit form
# → Should return: {"error":"Missing env var"}

# Invalid Retool endpoint
# 1. Set wrong RETOOL_CONTACT_URL
# 2. Submit form
# → Should return 502 error

# Network timeout
# 1. Set RETOOL_CONTACT_URL to non-existent server
# 2. Submit form
# → Should handle timeout gracefully
```

---

### Automated Testing

**API Route Test:**

```typescript
// __tests__/api/contacts.test.ts
import { POST } from '@/app/api/contacts/route'

describe('/api/contacts', () => {
    it('returns 500 if env vars missing', async () => {
        delete process.env.RETOOL_CONTACT_URL

        const formData = new FormData()
        formData.append('name', 'Test')
        formData.append('email', 'test@example.com')

        const request = new Request('http://localhost:3000/api/contacts', {
            method: 'POST',
            body: formData,
        })

        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(500)
        expect(data.error).toBe('Missing env var')
    })
})
```

---

## Troubleshooting

### Issue 1: "Missing env var" Error

**Symptom:**

```json
{ "error": "Missing env var" }
```

**Causes:**

- `.env.local` doesn't exist
- Variables not set correctly
- Server not restarted after changes

**Solution:**

```bash
# 1. Check .env.local exists
ls -la .env.local

# 2. Verify variables are set
cat .env.local | grep RETOOL

# 3. Restart dev server
npm run dev
```

---

### Issue 2: Form Submits But Nothing Happens

**Symptom:**

- Form appears to submit
- No success/error message
- Console shows network error

**Debugging:**

```javascript
// Open browser DevTools → Network tab
// Submit form
// Check /api/contacts request
// Look at:
// - Status code
// - Response body
// - Request payload
```

**Common Causes:**

- JavaScript error in form component
- API route not found (check path)
- CORS issue (shouldn't happen with same-origin)

---

### Issue 3: "Retool request failed" Error

**Symptom:**

```json
{
    "error": "Retool request failed",
    "status": 400,
    "body": "..."
}
```

**Debugging:**

**Check Retool Workflow:**

```bash
# 1. Is workflow published?
# 2. Is webhook trigger enabled?
# 3. Check workflow logs in Retool
# 4. Verify input structure matches workflow expectations
```

**Test Retool Endpoint Directly:**

```bash
curl -X POST https://your-org.retool.com/api/v1/workflows/.../startTrigger \
  -H "X-Workflow-Api-Key: your_key" \
  -H "Content-Type: application/json" \
  -d '{"input":{"name":"Test","email":"test@test.com","message":"Test"}}'
```

---

### Issue 4: File Upload Fails

**Symptom:**

- File selected successfully
- Submit shows error
- Or file not received in Retool

**Check:**

1. **File Size**

    ```javascript
    // Must be < 15MB
    console.log(file.size / 1024 / 1024, 'MB')
    ```

2. **File Format**

    ```javascript
    // Check MIME type and extension
    console.log(file.type, file.name)
    ```

3. **Base64 Encoding**

    ```typescript
    // In route.ts, add logging:
    console.log('Attachment size:', attachment?.base64?.length)
    // Should be ~33% larger than original
    ```

4. **Retool Workflow**
    ```
    // Does workflow expect attachment field?
    // Is it configured to handle base64?
    // Check workflow input schema
    ```

---

### Issue 5: Success Message Doesn't Show

**Symptom:**

- Form submits successfully
- No success message appears
- Form doesn't reset

**Check:**

1. **Response Parsing**

    ```typescript
    // Add logging in form.tsx
    const response = await fetch('/api/contacts', {...})
    const data = await response.json()
    console.log('API Response:', data)
    ```

2. **Success State**

    ```typescript
    // Check state is being set
    console.log('Setting success:', data)
    setSuccess('Sent successfully!')
    ```

3. **UI Rendering**
    ```jsx
    // Verify conditional rendering
    {
        success && <p>{success}</p>
    }
    ```

---

### Issue 6: Large Files Cause Timeout

**Symptom:**

- Small files work fine
- Large files (10MB+) timeout
- No error, just hangs

**Solutions:**

1. **Reduce Max File Size**

    ```typescript
    // In form.tsx, reduce limit
    const maxBytes = 10 * 1024 * 1024 // 10MB instead of 15MB
    ```

2. **Add Timeout to API Call**

    ```typescript
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30s

    const response = await fetch('/api/contacts', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
    })

    clearTimeout(timeoutId)
    ```

3. **Optimize Base64 Encoding**
    ```typescript
    // Already optimized in route.ts
    // But could add streaming for very large files
    ```

---

## Best Practices

### Security

✅ **Do:**

- Keep API keys in environment variables
- Validate file types and sizes
- Rate limit the endpoint (if needed)
- Sanitize user input before forwarding

❌ **Don't:**

- Put API keys in frontend code
- Trust client-side validation alone
- Allow unlimited file sizes
- Expose Retool error details to users

---

### Performance

✅ **Do:**

- Set reasonable file size limits
- Use streaming for very large files
- Add timeout to Retool requests
- Cache form submissions if needed

❌ **Don't:**

- Allow files > 15MB
- Block UI thread during upload
- Make synchronous calls
- Retry failed requests infinitely

---

### UX

✅ **Do:**

- Show clear error messages
- Disable submit during processing
- Reset form after success
- Show selected filename
- Auto-hide success message

❌ **Don't:**

- Show technical error details
- Allow multiple simultaneous submits
- Leave user guessing about status
- Keep success message forever

---

## Summary

### Key Points

1. **API Proxy Pattern**
    - Next.js API route acts as middleware
    - Keeps API keys secure
    - Handles data transformation

2. **File Upload**
    - Convert to base64 for JSON transmission
    - Validate size and format
    - Include metadata

3. **Error Handling**
    - Graceful degradation at every level
    - Clear error messages
    - Comprehensive logging

4. **Client-Side**
    - Instant validation feedback
    - File upload UI
    - Success/error states

5. **Retool Integration**
    - Workflow webhook trigger
    - API key authentication
    - Structured input format

### Architecture Benefits

✅ **Security** - API keys never exposed
✅ **Flexibility** - Can change Retool workflow without frontend changes
✅ **Reliability** - Comprehensive error handling
✅ **Maintainability** - Clear separation of concerns
✅ **UX** - Fast feedback, clear messaging

---

**Last Updated:** January 29, 2026
**API Version:** 1.0
**Endpoint:** `/api/contacts`

'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Paperclip, X, Send, Check } from 'lucide-react'

const allowedMimeTypes = new Set([
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
])
const allowedExtensions = new Set([
    '.pdf',
    '.doc',
    '.docx',
    '.xls',
    '.xlsx',
    '.ppt',
    '.pptx',
])

export const FooterForm = () => {
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [fileName, setFileName] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement | null>(null)
    const [nameError, setNameError] = useState<string | null>(null)
    const [emailError, setEmailError] = useState<string | null>(null)
    const [messageError, setMessageError] = useState<string | null>(null)
    const [fileError, setFileError] = useState<string | null>(null)
    const [successVisible, setSuccessVisible] = useState(false)

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

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)
        setNameError(null)
        setEmailError(null)
        setMessageError(null)
        setFileError(null)
        setSuccess(null)
        setSubmitting(true)
        try {
            const form = e.currentTarget

            // Client-side validation
            const nameInput = form.elements.namedItem(
                'name'
            ) as HTMLInputElement | null
            const emailInput = form.elements.namedItem(
                'email'
            ) as HTMLInputElement | null
            const messageInput = form.elements.namedItem(
                'message'
            ) as HTMLTextAreaElement | null

            const name = (nameInput?.value || '').trim()
            const email = (emailInput?.value || '').trim()
            const message = (messageInput?.value || '').trim()

            let hasError = false
            if (!name || name.length < 2) {
                setNameError(
                    'Name is required and must be at least 2 characters'
                )
                hasError = true
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!email || !emailRegex.test(email)) {
                setEmailError('Please enter a valid email address')
                hasError = true
            }

            if (!message || message.length < 10) {
                setMessageError(
                    'Message is required and must be at least 10 characters'
                )
                hasError = true
            }

            if (hasError) {
                setSubmitting(false)
                return
            }

            const formData = new FormData(form)

            const response = await fetch('/api/contacts', {
                method: 'POST',
                body: formData,
            })
            if (!response.ok) {
                const data = await response.json().catch(() => ({}))
                throw new Error(data?.error || 'Failed to send form')
            }
            setSuccess('Sent successfully!')
            form.reset()
            setFileName(null)
            setNameError(null)
            setEmailError(null)
            setMessageError(null)
            setFileError(null)
        } catch (err) {
            setError(String(err instanceof Error ? err.message : err))
        } finally {
            setSubmitting(false)
        }
    }

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        setSuccess(null)
        const file =
            e.target.files && e.target.files[0] ? e.target.files[0] : null
        if (!file) {
            setFileName(null)
            return
        }

        // file validation
        const maxBytes = 15 * 1024 * 1024 // 15MB
        if (file.size > maxBytes) {
            setFileError('Attachment must be 15MB or smaller')
            e.target.value = ''
            setFileName(null)
            return
        }

        const typeOk = allowedMimeTypes.has(file.type)
        const ext = file.name.includes('.')
            ? file.name.slice(file.name.lastIndexOf('.')).toLowerCase()
            : ''
        const extOk = allowedExtensions.has(ext)
        if (!typeOk && !extOk) {
            setFileError(
                'Only PDF or MS Office formats (doc, docx, xls, xlsx, ppt, pptx) are allowed'
            )
            e.target.value = ''
            setFileName(null)
            return
        }

        setFileError(null)
        setFileName(file.name)
    }

    function handleClearFile(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        e.stopPropagation()
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
        setFileName(null)
        setFileError(null)
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Name Input */}
            <div>
                <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                    minLength={2}
                    onChange={() => setNameError(null)}
                    style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        fontSize: '1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 'var(--radius-md)',
                        color: 'white',
                        outline: 'none',
                        transition: 'all 0.2s',
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'var(--brand-red)'
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                    }}
                />
                {nameError && <p style={{ color: 'var(--brand-red)', fontSize: '0.875rem', marginTop: '0.5rem' }}>{nameError}</p>}
            </div>

            {/* Email & Phone Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }} className="md:grid-cols-2">
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        required
                        onChange={() => setEmailError(null)}
                        style={{
                            width: '100%',
                            padding: '1rem 1.25rem',
                            fontSize: '1rem',
                            backgroundColor: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: 'var(--radius-md)',
                            color: 'white',
                            outline: 'none',
                            transition: 'all 0.2s',
                        }}
                        onFocus={(e) => {
                            e.target.style.borderColor = 'var(--brand-red)'
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                        }}
                    />
                    {emailError && <p style={{ color: 'var(--brand-red)', fontSize: '0.875rem', marginTop: '0.5rem' }}>{emailError}</p>}
                </div>

                <input
                    type="tel"
                    name="phone"
                    placeholder="Your phone (optional)"
                    style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        fontSize: '1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 'var(--radius-md)',
                        color: 'white',
                        outline: 'none',
                        transition: 'all 0.2s',
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'var(--brand-red)'
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                    }}
                />
            </div>

            {/* Message Textarea */}
            <div>
                <textarea
                    name="message"
                    placeholder="Your message"
                    required
                    minLength={10}
                    onChange={() => setMessageError(null)}
                    rows={6}
                    style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        fontSize: '1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 'var(--radius-md)',
                        color: 'white',
                        outline: 'none',
                        resize: 'vertical',
                        transition: 'all 0.2s',
                        fontFamily: 'inherit',
                    }}
                    onFocus={(e) => {
                        e.target.style.borderColor = 'var(--brand-red)'
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
                    }}
                    onBlur={(e) => {
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                        e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                    }}
                />
                {messageError && <p style={{ color: 'var(--brand-red)', fontSize: '0.875rem', marginTop: '0.5rem' }}>{messageError}</p>}
            </div>

            {/* File Attachment */}
            <div>
                <label
                    htmlFor="attach"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        cursor: 'pointer',
                        padding: '1rem 1.25rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 'var(--radius-md)',
                        transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)'
                        e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.5)'
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)'
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                    }}
                >
                    <input
                        type="file"
                        name="attach"
                        id="attach"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                    <Paperclip size={20} color="var(--brand-red)" />
                    <span style={{ fontSize: '0.9375rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                        {fileName ? fileName : 'Attach file (PDF, DOC, XLS, PPT)'}
                    </span>
                    {fileName && (
                        <button
                            type="button"
                            onClick={handleClearFile}
                            style={{
                                marginLeft: 'auto',
                                padding: '0.25rem',
                                display: 'flex',
                                alignItems: 'center',
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'rgba(255, 255, 255, 0.6)',
                            }}
                            aria-label="Remove file"
                        >
                            <X size={18} />
                        </button>
                    )}
                </label>
                {fileError && <p style={{ color: 'var(--brand-red)', fontSize: '0.875rem', marginTop: '0.5rem' }}>{fileError}</p>}
            </div>

            {/* Submit Button */}
            <motion.button
                type="submit"
                disabled={submitting}
                whileHover={!submitting ? { scale: 1.02 } : {}}
                whileTap={!submitting ? { scale: 0.98 } : {}}
                style={{
                    width: '100%',
                    padding: '1.125rem 2rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    backgroundColor: submitting ? 'rgba(220, 38, 38, 0.5)' : 'var(--brand-red)',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    cursor: submitting ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                }}
            >
                {submitting ? (
                    <>
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        >
                            <Send size={18} />
                        </motion.div>
                        Sending...
                    </>
                ) : (
                    <>
                        <Send size={18} />
                        Send Message
                    </>
                )}
            </motion.button>

            {/* Status Messages */}
            <div style={{ minHeight: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ color: 'var(--brand-red)', fontSize: '0.875rem', textAlign: 'center' }}
                    >
                        {error}
                    </motion.p>
                )}
                {success && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: successVisible ? 1 : 0, y: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            color: '#10b981',
                            fontSize: '0.875rem',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                        }}
                    >
                        <Check size={16} />
                        {success}
                    </motion.p>
                )}
            </div>
        </form>
    )
}

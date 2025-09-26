'use client'

import CloseGrey from '@/assets/close-grey.svg'
import Attach from '@/assets/footer-clip.svg'
import { Button, Input } from '@/components/ui'
import { useEffect, useRef, useState } from 'react'

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
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <Input
                placeholder={'Your name'}
                name="name"
                required
                minLength={2}
                onChange={() => setNameError(null)}
            />
            {nameError && <p className="text-xs text-red">{nameError}</p>}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:gap-9">
                <Input
                    placeholder={'Your email'}
                    name="email"
                    type="email"
                    required
                    onChange={() => setEmailError(null)}
                />
                <Input placeholder={'Your phone'} name="phone" />
            </div>
            {emailError && <p className="text-xs text-red">{emailError}</p>}
            <div className="relative">
                <textarea
                    className="px-5 py-4 w-full outline-0 resize-none bg-dark-green hover:bg-dark-green/60 focus:bg-dark-green/60 text-white placeholder-dark-grey rounded-2xl h-48"
                    name="message"
                    id="message"
                    placeholder="Your message"
                    required
                    minLength={10}
                    onChange={() => setMessageError(null)}
                />
                {messageError && (
                    <p className="absolute top-0 left-0 text-xs text-red">
                        {messageError}
                    </p>
                )}
            </div>
            <div className="flex items-center gap-4">
                <label
                    htmlFor="attach"
                    className="flex items-center gap-4 cursor-pointer text-base xl:text-lg"
                >
                    <input
                        className="hidden"
                        type="file"
                        name="attach"
                        id="attach"
                        accept=".pdf,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                    />
                    <div className="h-8 w-8 bg-background rounded-md center">
                        <Attach />
                    </div>
                    {fileName
                        ? 'You can attach another file or send'
                        : 'Attach your file'}
                </label>

                {fileName && (
                    <span className="flex items-center gap-2 truncate max-w-[60%] text-sm text-white/80">
                        <span className="truncate">{fileName}</span>
                        <button
                            type="button"
                            onClick={handleClearFile}
                            className="cursor-pointer"
                            aria-label="Remove file"
                            title="Remove file"
                        >
                            <CloseGrey className="scale-75" />
                        </button>
                    </span>
                )}
            </div>
            {<p className="text-xs text-red">{fileError ? fileError : ''}</p>}

            <Button
                title={submitting ? 'Sending…' : 'Send'}
                fullSize
                type="submit"
                onClick={() => {}}
                disabled={submitting}
                variant="accent"
                classes="py-3 px-8 md:py-5 md:px-10 text-sm md:text-base xl:text-lg"
            />
            <div className="w-full flex justify-center h-3">
                {error && <p className="text-xs text-red">{error}</p>}
                {success && (
                    <p
                        className={`text-xs text-green-500 transition-opacity duration-300 ${
                            successVisible ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        {success}
                    </p>
                )}
            </div>
        </form>
    )
}

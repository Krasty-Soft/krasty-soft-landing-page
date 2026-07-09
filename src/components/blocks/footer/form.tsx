"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paperclip, X, Send, Check, ArrowLeft } from "lucide-react";

const allowedMimeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
]);
const allowedExtensions = new Set([
  ".pdf",
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
]);

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
  file?: string;
};

const cardClass =
  "rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.03] p-6 md:p-7";
const labelClass =
  "mb-2 block text-[0.8125rem] font-medium tracking-wide text-white/70";
const inputBase =
  "w-full rounded-[var(--radius-md)] bg-white/[0.04] px-4 py-3 text-[0.9375rem] text-white placeholder:text-white/35 outline-none border transition-[border-color,box-shadow,background-color] duration-200 focus:bg-white/[0.06] focus:border-[var(--brand-red)] focus:shadow-[0_0_0_3px_rgba(229,6,6,0.15)]";
const errText = "mt-1.5 text-[0.8125rem] text-[var(--brand-red)]";

const inputCls = (hasError?: string) =>
  `${inputBase} ${hasError ? "border-[var(--brand-red)]" : "border-white/10"}`;

const Req = () => <span className="text-[var(--brand-red)]">*</span>;

export const FooterForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const clearFieldError = (key: keyof FieldErrors) =>
    setErrors((prev) => ({ ...prev, [key]: undefined }));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;

    const val = (n: string) =>
      (
        (form.elements.namedItem(n) as HTMLInputElement | null)?.value || ""
      ).trim();
    const name = val("name");
    const email = val("email");
    const subject = val("subject");
    const message = val("message");

    const next: FieldErrors = {};
    if (name.length < 2)
      next.name = "Please enter your name (at least 2 characters).";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please enter a valid email address.";
    if (message.length < 10)
      next.message = "Tell us a little more — at least 10 characters.";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData(form);
      // Fold the optional subject into the message so it reaches the inbox.
      if (subject) formData.set("message", `Subject: ${subject}\n\n${message}`);

      const res = await fetch("/api/contacts", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }
      form.reset();
      setFileName(null);
      setErrors({});
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) {
      setFileName(null);
      return;
    }
    if (file.size > 15 * 1024 * 1024) {
      setErrors((p) => ({ ...p, file: "Attachment must be 15MB or smaller." }));
      e.target.value = "";
      setFileName(null);
      return;
    }
    const ext = file.name.includes(".")
      ? file.name.slice(file.name.lastIndexOf(".")).toLowerCase()
      : "";
    if (!allowedMimeTypes.has(file.type) && !allowedExtensions.has(ext)) {
      setErrors((p) => ({
        ...p,
        file: "Only PDF or Office files (doc, docx, xls, xlsx, ppt, pptx).",
      }));
      e.target.value = "";
      setFileName(null);
      return;
    }
    clearFieldError("file");
    setFileName(file.name);
  }

  function handleClearFile(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (fileInputRef.current) fileInputRef.current.value = "";
    setFileName(null);
    clearFieldError("file");
  }

  // ---- Success state ---------------------------------------------------
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        className={`${cardClass} flex flex-col items-center text-center`}
        style={{ minHeight: "360px", justifyContent: "center", gap: "1.25rem" }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 15 }}
          style={{
            width: "4.5rem",
            height: "4.5rem",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(135deg, var(--brand-red), #a30303)",
            boxShadow: "0 0 32px rgba(229, 6, 6, 0.35)",
          }}
        >
          <Check size={34} color="white" strokeWidth={3} />
        </motion.div>
        <div>
          <h3
            style={{
              fontSize: "1.375rem",
              fontWeight: 700,
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            Message sent
          </h3>
          <p
            style={{
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              maxWidth: "22rem",
            }}
          >
            Thanks for reaching out — we&apos;ll get back to you within one
            business day.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Send another message
        </button>
      </motion.div>
    );
  }

  // ---- Form ------------------------------------------------------------
  return (
    <form onSubmit={handleSubmit} noValidate className={cardClass}>
      <div className="flex flex-col gap-5">
        {/* Name */}
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            Full name <Req />
          </label>
          <input
            id="cf-name"
            type="text"
            name="name"
            autoComplete="name"
            placeholder="Jane Doe"
            aria-invalid={!!errors.name}
            onChange={() => clearFieldError("name")}
            className={inputCls(errors.name)}
          />
          {errors.name && <p className={errText}>{errors.name}</p>}
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label htmlFor="cf-email" className={labelClass}>
              Email <Req />
            </label>
            <input
              id="cf-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder="jane@company.com"
              aria-invalid={!!errors.email}
              onChange={() => clearFieldError("email")}
              className={inputCls(errors.email)}
            />
            {errors.email && <p className={errText}>{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="cf-phone" className={labelClass}>
              Phone <span className="text-white/40">(optional)</span>
            </label>
            <input
              id="cf-phone"
              type="tel"
              name="phone"
              autoComplete="tel"
              placeholder="+1 555 000 0000"
              className={inputCls()}
            />
          </div>
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="cf-subject" className={labelClass}>
            Subject <span className="text-white/40">(optional)</span>
          </label>
          <input
            id="cf-subject"
            type="text"
            name="subject"
            placeholder="New project inquiry"
            className={inputCls()}
          />
        </div>

        {/* Message */}
        <div>
          <label htmlFor="cf-message" className={labelClass}>
            Message <Req />
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={5}
            placeholder="Tell us about your project, timeline, and goals…"
            aria-invalid={!!errors.message}
            onChange={() => clearFieldError("message")}
            className={`${inputCls(errors.message)} resize-y`}
          />
          {errors.message && <p className={errText}>{errors.message}</p>}
        </div>

        {/* Attachment */}
        <div>
          <label
            htmlFor="cf-attach"
            className="flex cursor-pointer items-center gap-3 rounded-[var(--radius-md)] border border-dashed border-white/15 bg-white/[0.02] px-4 py-3 transition-colors duration-200 hover:border-[rgba(229,6,6,0.5)] hover:bg-white/[0.04]"
          >
            <input
              id="cf-attach"
              type="file"
              name="attach"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            <Paperclip size={18} color="var(--brand-red)" className="shrink-0" />
            <span className="truncate text-[0.9375rem] text-white/70">
              {fileName ?? "Attach a file"}
            </span>
            <span className="ml-auto shrink-0 text-[0.75rem] text-white/35">
              {fileName ? "" : "PDF · DOC · XLS · PPT · 15MB"}
            </span>
            {fileName && (
              <button
                type="button"
                onClick={handleClearFile}
                aria-label="Remove file"
                className="ml-auto flex shrink-0 items-center text-white/50 transition-colors hover:text-white"
              >
                <X size={18} />
              </button>
            )}
          </label>
          {errors.file && <p className={errText}>{errors.file}</p>}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={!submitting ? { scale: 1.015 } : undefined}
          whileTap={!submitting ? { scale: 0.985 } : undefined}
          className="mt-1 flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] px-6 py-3.5 text-[0.9375rem] font-semibold text-white transition-colors"
          style={{
            backgroundColor: submitting
              ? "rgba(229, 6, 6, 0.5)"
              : "var(--brand-red)",
            cursor: submitting ? "not-allowed" : "pointer",
            boxShadow: submitting ? "none" : "0 8px 24px rgba(229, 6, 6, 0.25)",
          }}
        >
          {submitting ? (
            <>
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="inline-flex"
              >
                <Send size={18} />
              </motion.span>
              Sending…
            </>
          ) : (
            <>
              <Send size={18} />
              Send message
            </>
          )}
        </motion.button>

        {/* Global error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center text-[0.875rem] text-[var(--brand-red)]"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
};

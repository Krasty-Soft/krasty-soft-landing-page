"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Upload, X, FileText, Loader2, CheckCircle2 } from "lucide-react";

interface JobApplicationFormProps {
  position: string;
}

export const JobApplicationForm = ({ position }: JobApplicationFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Check file size (max 10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setErrorMessage("File size must be less than 10MB");
        return;
      }
      // Check file type
      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        setErrorMessage("Please upload a PDF or Word document");
        return;
      }
      setFile(selectedFile);
      setErrorMessage("");
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("coverLetter", formData.coverLetter);
      form.append("position", position);
      if (file) {
        form.append("cv", file);
      }

      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to submit application");
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", phone: "", coverLetter: "" });
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to submit application"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "2rem",
        backgroundColor: "var(--surface-primary)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
      }}
    >
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "var(--text-primary)",
          marginBottom: "0.5rem",
        }}
      >
        Apply for this position
      </h3>
      <p
        style={{
          color: "var(--text-secondary)",
          marginBottom: "2rem",
          fontSize: "0.9375rem",
        }}
      >
        Fill out the form below and attach your CV/Resume. We&apos;ll get back to you
        soon.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="name"
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              fontSize: "0.9375rem",
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-md)",
              color: "var(--text-primary)",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "var(--brand-red)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "var(--border-default)")
            }
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="email"
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              fontSize: "0.9375rem",
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-md)",
              color: "var(--text-primary)",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "var(--brand-red)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "var(--border-default)")
            }
          />
        </div>

        {/* Phone */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="phone"
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              fontSize: "0.9375rem",
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-md)",
              color: "var(--text-primary)",
              outline: "none",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "var(--brand-red)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "var(--border-default)")
            }
          />
        </div>

        {/* Cover Letter */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="coverLetter"
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            Cover Letter *
          </label>
          <textarea
            id="coverLetter"
            name="coverLetter"
            required
            rows={6}
            value={formData.coverLetter}
            onChange={handleInputChange}
            placeholder="Tell us why you're a great fit for this position..."
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              fontSize: "0.9375rem",
              backgroundColor: "var(--bg-primary)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-md)",
              color: "var(--text-primary)",
              outline: "none",
              transition: "border-color 0.2s",
              resize: "vertical",
              fontFamily: "inherit",
            }}
            onFocus={(e) =>
              (e.currentTarget.style.borderColor = "var(--brand-red)")
            }
            onBlur={(e) =>
              (e.currentTarget.style.borderColor = "var(--border-default)")
            }
          />
        </div>

        {/* CV Upload */}
        <div style={{ marginBottom: "2rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.875rem",
              fontWeight: 600,
              color: "var(--text-primary)",
              marginBottom: "0.5rem",
            }}
          >
            CV/Resume * (PDF or Word, max 10MB)
          </label>

          {!file ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                padding: "2rem",
                border: "2px dashed var(--border-default)",
                borderRadius: "var(--radius-md)",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: "var(--bg-primary)",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--brand-red)";
                e.currentTarget.style.backgroundColor = "rgba(220, 38, 38, 0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-default)";
                e.currentTarget.style.backgroundColor = "var(--bg-primary)";
              }}
            >
              <Upload
                size={32}
                color="var(--brand-red)"
                style={{ margin: "0 auto 0.5rem" }}
              />
              <p style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                Click to upload your CV
              </p>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem" }}>
                PDF or Word document
              </p>
            </div>
          ) : (
            <div
              style={{
                padding: "1rem",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                borderRadius: "var(--radius-md)",
                backgroundColor: "rgba(16, 185, 129, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <FileText size={24} color="#10b981" />
                <div>
                  <p
                    style={{
                      color: "var(--text-primary)",
                      fontWeight: 600,
                      fontSize: "0.9375rem",
                    }}
                  >
                    {file.name}
                  </p>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.75rem" }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                style={{
                  padding: "0.5rem",
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "var(--radius-sm)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <X size={20} color="var(--text-secondary)" />
              </button>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
        </div>

        {/* Error Message */}
        {(errorMessage || submitStatus === "error") && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: "1rem",
              backgroundColor: "rgba(220, 38, 38, 0.1)",
              border: "1px solid rgba(220, 38, 38, 0.3)",
              borderRadius: "var(--radius-md)",
              color: "#ef4444",
              marginBottom: "1.5rem",
              fontSize: "0.875rem",
            }}
          >
            {errorMessage || "Failed to submit application. Please try again."}
          </motion.div>
        )}

        {/* Success Message */}
        {submitStatus === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: "1rem",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "var(--radius-md)",
              color: "#10b981",
              marginBottom: "1.5rem",
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <CheckCircle2 size={20} />
            Application submitted successfully! We&apos;ll review your application and get
            back to you soon.
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting || !file}
          whileHover={{ scale: isSubmitting || !file ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting || !file ? 1 : 0.98 }}
          style={{
            width: "100%",
            padding: "1rem",
            fontSize: "1rem",
            fontWeight: 700,
            color: "white",
            backgroundColor: isSubmitting || !file ? "#6b7280" : "var(--brand-red)",
            border: "none",
            borderRadius: "var(--radius-full)",
            cursor: isSubmitting || !file ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            transition: "background-color 0.2s",
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Submitting...
            </>
          ) : (
            "Submit Application"
          )}
        </motion.button>
      </form>
    </div>
  );
};

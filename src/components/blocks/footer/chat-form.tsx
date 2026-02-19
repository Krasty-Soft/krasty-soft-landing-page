"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, X, Bot, User, Check } from "lucide-react";

interface Message {
  id: string;
  type: "bot" | "user";
  content: string;
  isTyping?: boolean;
}

type Step =
  | "name"
  | "email"
  | "phone"
  | "purpose"
  | "message"
  | "file"
  | "done";

export const ChatForm = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState<Step>("name");
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    purpose: "",
    message: "",
    file: null as File | null,
  });

  // Auto-scroll to bottom (only after user interaction)
  const scrollToBottom = () => {
    if (hasInteracted) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, hasInteracted]);

  // Initial greeting
  useEffect(() => {
    addBotMessage("👋 Hi! I'm Krasty Bot. Let's get started!", 1000);
    setTimeout(() => {
      addBotMessage("What's your name?", 2000);
    }, 2000);
  }, []);

  const addBotMessage = (content: string, delay = 0) => {
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(
        () => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              type: "bot",
              content,
            },
          ]);
        },
        1000 + Math.random() * 500,
      ); // Random typing delay
    }, delay);
  };

  const addUserMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "user",
        content,
      },
    ]);
  };

  const handleNextStep = () => {
    if (!input.trim() && currentStep !== "file") return;

    // Mark as interacted once user starts typing
    if (!hasInteracted) {
      setHasInteracted(true);
    }

    const value = input.trim();
    const valueLower = value.toLowerCase();

    // Check for skip commands on optional fields
    const isSkipCommand = ["no", "skip", "nope", "na", "n/a", "pass"].includes(
      valueLower,
    );

    // Validation for required fields
    if (currentStep === "name" && value.length < 2) {
      addUserMessage(value);
      addBotMessage(
        "Hmm, that name seems too short. Could you tell me your full name? 😊",
        500,
      );
      setInput("");
      return;
    }

    if (currentStep === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        addUserMessage(value);
        addBotMessage("Oops! That doesn't look like a valid email. 📧", 500);
        addBotMessage("Could you double-check and try again?", 1500);
        setInput("");
        return;
      }
    }

    // Handle optional phone field with skip
    if (currentStep === "phone" && isSkipCommand) {
      addUserMessage("Skip");
      addBotMessage("No problem! 👌", 500);
      addBotMessage("What brings you here today?", 1500);
      setFormData((prev) => ({ ...prev, phone: "" }));
      setInput("");
      setCurrentStep("purpose");
      return;
    }

    // Validate message length
    if (currentStep === "message" && value.length < 10 && !isSkipCommand) {
      addUserMessage(value);
      addBotMessage(
        "Could you tell me a bit more? At least 10 characters please. 📝",
        500,
      );
      setInput("");
      return;
    }

    // Add user message
    if (currentStep !== "file") {
      addUserMessage(value);
    }

    // Update form data
    setFormData((prev) => ({
      ...prev,
      [currentStep]: value,
    }));

    setInput("");

    // Move to next step
    switch (currentStep) {
      case "name":
        addBotMessage(`Nice to meet you, ${value}! 🎉`, 500);
        addBotMessage("What's your email address?", 2000);
        setCurrentStep("email");
        break;
      case "email":
        addBotMessage("Great! 📧", 500);
        addBotMessage(
          'Your phone number? (Type "skip" if you prefer not to share)',
          1500,
        );
        setCurrentStep("phone");
        break;
      case "phone":
        if (!isSkipCommand && value) {
          addBotMessage("Perfect! 📱", 500);
        } else if (!value) {
          addBotMessage("No problem! 👌", 500);
        }
        addBotMessage("What brings you here today?", 1500);
        setCurrentStep("purpose");
        break;
      case "purpose":
        addBotMessage(`${value} - sounds exciting! 🚀`, 500);
        addBotMessage("Tell me more about it...", 1500);
        setCurrentStep("message");
        break;
      case "message":
        addBotMessage("Awesome! 💡", 500);
        addBotMessage("Want to attach any files? (PDF, DOC, etc.)", 1500);
        setCurrentStep("file");
        break;
      case "file":
        handleSubmit();
        break;
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        addBotMessage("⚠️ File is too large. Max 15MB please.", 0);
        return;
      }
      setFormData((prev) => ({ ...prev, file }));
      addUserMessage(`📎 ${file.name}`);
      addBotMessage("Great! Got your file. 📄", 500);
      setTimeout(() => handleSubmit(), 1500);
    }
  };

  const handleSkipFile = () => {
    addUserMessage("Skip file");
    setTimeout(() => handleSubmit(), 500);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    addBotMessage("Let me send this to our team... ⏳", 0);

    try {
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("phone", formData.phone);
      form.append("message", `${formData.purpose}\n\n${formData.message}`);
      if (formData.file) {
        form.append("attach", formData.file);
      }

      const response = await fetch("/api/contacts", {
        method: "POST",
        body: form,
      });

      if (!response.ok) {
        throw new Error("Failed to send");
      }

      addBotMessage("✨ All done! We'll get back to you soon.", 1500);
      addBotMessage("Thanks for reaching out! 🙌", 2500);
      setCurrentStep("done");
    } catch (error) {
      addBotMessage("❌ Oops! Something went wrong. Please try again.", 1000);
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleNextStep();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "300px",
        backgroundColor: "rgba(255, 255, 255, 0.03)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        borderRadius: "var(--radius-lg)",
        overflow: "hidden",
        width: "100%",
        maxWidth: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* Chat Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          width: "100%",
          boxSizing: "border-box",
        }}
        className="md:p-6"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              style={{
                display: "flex",
                justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
                gap: "0.75rem",
                width: "100%",
                maxWidth: "100%",
              }}
            >
              {msg.type === "bot" && (
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "50%",
                    backgroundColor: "var(--brand-red)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Bot size={18} color="white" />
                </div>
              )}

              <div
                style={{
                  maxWidth: "70%",
                  padding: "0.875rem 1.125rem",
                  borderRadius: "var(--radius-md)",
                  backgroundColor:
                    msg.type === "user"
                      ? "var(--brand-red)"
                      : "rgba(255, 255, 255, 0.08)",
                  color: "white",
                  fontSize: "0.9375rem",
                  lineHeight: "1.5",
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                }}
              >
                {msg.content}
              </div>

              {msg.type === "user" && (
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <User size={18} color="white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: "flex",
              gap: "0.75rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "50%",
                backgroundColor: "var(--brand-red)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Bot size={18} color="white" />
            </div>
            <div
              style={{
                padding: "0.875rem 1.125rem",
                borderRadius: "var(--radius-md)",
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                display: "flex",
                gap: "0.375rem",
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {currentStep !== "done" && (
        <div
          style={{
            padding: "1rem",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            width: "100%",
            boxSizing: "border-box",
          }}
          className="md:px-6"
        >
          {currentStep === "file" ? (
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                width: "100%",
                maxWidth: "100%",
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                style={{ display: "none" }}
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => fileInputRef.current?.click()}
                style={{
                  flex: 1,
                  padding: "0.875rem",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "var(--radius-md)",
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <Paperclip size={18} />
                Attach File
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSkipFile}
                disabled={submitting}
                style={{
                  flex: 1,
                  padding: "0.875rem",
                  backgroundColor: "var(--brand-red)",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  color: "white",
                  cursor: submitting ? "not-allowed" : "pointer",
                  fontWeight: 600,
                }}
              >
                {submitting ? "Sending..." : "Skip & Send"}
              </motion.button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "flex-end",
                width: "100%",
                maxWidth: "100%",
              }}
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => setHasInteracted(true)}
                placeholder={
                  currentStep === "message"
                    ? "Type your message..."
                    : currentStep === "phone"
                      ? 'Type phone or "skip"...'
                      : "Type here..."
                }
                rows={currentStep === "message" ? 3 : 1}
                disabled={isTyping || submitting}
                style={{
                  flex: 1,
                  minWidth: 0,
                  padding: "0.875rem 1rem",
                  fontSize: "0.9375rem",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "var(--radius-md)",
                  color: "white",
                  outline: "none",
                  resize: "none",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                  maxWidth: "100%",
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextStep}
                disabled={isTyping || submitting || !input.trim()}
                style={{
                  width: "3rem",
                  minWidth: "3rem",
                  height: "3rem",
                  borderRadius: "50%",
                  backgroundColor:
                    isTyping || submitting || !input.trim()
                      ? "rgba(220, 38, 38, 0.3)"
                      : "var(--brand-red)",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor:
                    isTyping || submitting || !input.trim()
                      ? "not-allowed"
                      : "pointer",
                  flexShrink: 0,
                }}
              >
                <Send size={18} color="white" />
              </motion.button>
            </div>
          )}
        </div>
      )}

      {/* Success State */}
      {currentStep === "done" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            padding: "2rem",
            textAlign: "center",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            borderTop: "1px solid rgba(16, 185, 129, 0.3)",
          }}
        >
          <Check size={48} color="#10b981" style={{ margin: "0 auto 1rem" }} />
          <p
            style={{ color: "#10b981", fontSize: "1.125rem", fontWeight: 600 }}
          >
            Message sent successfully!
          </p>
        </motion.div>
      )}
    </div>
  );
};

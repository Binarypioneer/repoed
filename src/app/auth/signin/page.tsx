"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Phone, Chrome } from "lucide-react";

export const dynamic = "force-dynamic";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [method, setMethod] = useState<"email" | "phone" | "google">("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [codesSent, setCodesSent] = useState<{ email?: boolean; phone?: boolean }>({});
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  // Send email code
  const handleSendEmailCode = async () => {
    setError(null);
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/send-email-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("Failed to send code");
      }

      setCodesSent((prev) => ({ ...prev, email: true }));
    } catch (err) {
      setError("Failed to send code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Send phone code
  const handleSendPhoneCode = async () => {
    setError(null);
    if (!phone || phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/send-phone-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      if (!res.ok) {
        throw new Error("Failed to send code");
      }

      setCodesSent((prev) => ({ ...prev, phone: true }));
    } catch (err) {
      setError("Failed to send code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Verify email code
  const handleEmailVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!emailCode || emailCode.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signIn("email-code", {
        email,
        code: emailCode,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid or expired code");
        setIsLoading(false);
      } else if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  // Verify phone code
  const handlePhoneVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!phoneCode || phoneCode.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signIn("phone-code", {
        phone,
        code: phoneCode,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid or expired code");
        setIsLoading(false);
      } else if (result?.ok) {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  // Google sign-in
  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      await signIn("google", { redirect: false, callbackUrl });
    } catch (err) {
      setError("Failed to sign in with Google");
    }
  };

  return (
    <>
      {/* Method Tabs */}
      <div className="flex gap-2 mb-8 border-b border-gray-300">
        <button
          onClick={() => {
            setMethod("email");
            setError(null);
          }}
          className={`flex items-center gap-2 px-6 py-3 text-xs font-black uppercase border-b-2 transition-colors ${
            method === "email"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          <Mail className="w-4 h-4" />
          Email
        </button>
        <button
          onClick={() => {
            setMethod("phone");
            setError(null);
          }}
          className={`flex items-center gap-2 px-6 py-3 text-xs font-black uppercase border-b-2 transition-colors ${
            method === "phone"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          <Phone className="w-4 h-4" />
          Phone
        </button>
        <button
          onClick={() => {
            setMethod("google");
            setError(null);
          }}
          className={`flex items-center gap-2 px-6 py-3 text-xs font-black uppercase border-b-2 transition-colors ${
            method === "google"
              ? "border-black text-black"
              : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          <Chrome className="w-4 h-4" />
          Google
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 border border-red-300 bg-red-50 px-4 py-3">
          <p className="text-xs text-red-700 font-medium">{error}</p>
        </div>
      )}

      {/* Email Method */}
      {method === "email" && (
        <form onSubmit={handleEmailVerify} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-black mb-3">
              Email Address
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 border border-black text-sm focus:outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400"
                disabled={isLoading || codesSent.email}
              />
              <button
                type="button"
                onClick={handleSendEmailCode}
                disabled={isLoading || codesSent.email}
                className="px-4 py-3 bg-black text-white text-xs font-black uppercase hover:bg-gray-900 transition-colors disabled:bg-gray-400"
              >
                {codesSent.email ? "Sent!" : "Send Code"}
              </button>
            </div>
          </div>

          {codesSent.email && (
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-black mb-3">
                Enter 6-Digit Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={emailCode}
                onChange={(e) => setEmailCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                className="w-full px-4 py-3 border border-black text-sm text-center font-mono text-2xl tracking-widest focus:outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400"
                disabled={isLoading}
              />
              <p className="text-[10px] text-gray-600 mt-2">Code expires in 10 minutes</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !codesSent.email}
            className="w-full bg-black text-white px-4 py-3 text-xs font-black uppercase tracking-widest hover:bg-gray-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Sign In"}
          </button>
        </form>
      )}

      {/* Phone Method */}
      {method === "phone" && (
        <form onSubmit={handlePhoneVerify} className="space-y-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-black mb-3">
              Phone Number
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                placeholder="1234567890"
                className="flex-1 px-4 py-3 border border-black text-sm focus:outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400"
                disabled={isLoading || codesSent.phone}
              />
              <button
                type="button"
                onClick={handleSendPhoneCode}
                disabled={isLoading || codesSent.phone}
                className="px-4 py-3 bg-black text-white text-xs font-black uppercase hover:bg-gray-900 transition-colors disabled:bg-gray-400"
              >
                {codesSent.phone ? "Sent!" : "Send Code"}
              </button>
            </div>
          </div>

          {codesSent.phone && (
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-black mb-3">
                Enter 6-Digit Code
              </label>
              <input
                type="text"
                maxLength={6}
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="000000"
                className="w-full px-4 py-3 border border-black text-sm text-center font-mono text-2xl tracking-widest focus:outline-none focus:ring-1 focus:ring-black placeholder:text-gray-400"
                disabled={isLoading}
              />
              <p className="text-[10px] text-gray-600 mt-2">Code expires in 10 minutes</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !codesSent.phone}
            className="w-full bg-black text-white px-4 py-3 text-xs font-black uppercase tracking-widest hover:bg-gray-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? "Verifying..." : "Sign In"}
          </button>
        </form>
      )}

      {/* Google Method */}
      {method === "google" && (
        <div className="space-y-6">
          <p className="text-sm text-gray-700 text-center">
            Sign in securely with your Google account
          </p>
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full border-2 border-black px-4 py-3 text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Continue with Google"}
          </button>
        </div>
      )}

      {/* Demo Info */}
      <div className="mt-8 pt-8 border-t border-gray-200">
        <p className="text-xs text-gray-600 text-center mb-2">
          Demo Mode - Verification codes shown in console
        </p>
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          For demo: Any email or phone works. Codes are sent to console. Google OAuth requires setup.
        </p>
      </div>

      {/* Back to Home */}
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-xs font-black uppercase tracking-widest hover:text-gray-600 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-3">
            Sign In
          </h1>
          <p className="text-xs text-gray-600 uppercase tracking-wider">
            Choose your preferred sign-in method
          </p>
        </div>

        <Suspense fallback={<div className="text-center text-sm text-gray-500">Loading...</div>}>
          <SignInForm />
        </Suspense>
      </div>
    </div>
  );
}

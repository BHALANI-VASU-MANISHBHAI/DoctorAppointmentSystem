import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/index.js";

function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    const emailParam = searchParams.get("email");
    console.log("Received token:", tokenParam);
    console.log("Received email:", emailParam);
    if (!tokenParam) {
      toast.error("Invalid verification link. Please try again.");
      setTimeout(() => navigate("/auth/verify-account"), 2000);
      return;
    }

    setToken(tokenParam);
    setEmail(emailParam || "");
    setLoading(false);

    // Auto-verify on page load with both token and email parameters
    verifyAccount(tokenParam, emailParam || "");
  }, [searchParams, navigate]);

  const verifyAccount = async (verificationToken, emailParam) => {
    try {
      setVerifying(true);
      const response = await API.auth.verifyEmail({
        token: verificationToken,
        email: emailParam,
      });

      // Check if verification was successful
      console.log("Verification response:", response);
      setVerificationSuccess(true);
      toast.success("Account verified successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/patient/login");
      }, 2000);
    } catch (error) {
      console.error("Error verifying account:", error);
      toast.error(
        error.response?.data?.message ||
          "Verification failed. Please try again or request a new link."
      );

      setTimeout(() => {
        navigate("/auth/verify-account");
      }, 3000);
    } finally {
      setVerifying(false);
    }
  };

  if (verificationSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-md items-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-xl backdrop-blur text-center">
            <div className="mb-6 flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-green-600 mb-3">
              Account Verified!
            </h1>
            <p className="text-gray-600 mb-2">
              Your email has been successfully verified.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              You'll be redirected to the login page shortly.
            </p>
            <a
              href="/patient/login"
              className="inline-block text-sky-600 hover:text-sky-700 font-semibold"
            >
              Click here if not redirected
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-md items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-xl backdrop-blur">
          <div className="text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative h-16 w-16">
                <svg
                  className="animate-spin h-16 w-16 text-sky-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Verifying Your Account
            </h1>
            <p className="text-gray-600 mb-2">
              Please wait while we verify your email address...
            </p>
            {email && (
              <p className="text-gray-500 text-sm">
                Verifying <span className="font-medium">{email}</span>
              </p>
            )}

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm mb-4">
                This may take a few moments. Please don't close this page.
              </p>
              <div className="flex justify-center gap-1">
                <div className="h-2 w-2 rounded-full bg-sky-600 animate-bounce" />
                <div
                  className="h-2 w-2 rounded-full bg-sky-600 animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                />
                <div
                  className="h-2 w-2 rounded-full bg-sky-600 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;

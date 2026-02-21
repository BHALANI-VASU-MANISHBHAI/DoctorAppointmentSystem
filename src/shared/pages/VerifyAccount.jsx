import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/index.js";

function VerifyAccount() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const response = await API.auth.sendAccountVerificationLink({ email });
    console.log("Send verification link response:", response);
    } catch (error) {
      console.error("Error sending verification link:", error.response);  
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-md items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-xl backdrop-blur">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Account</h1>
            <p className="text-gray-500">Enter your email address to verify your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-sky-600 to-sky-700 text-white font-semibold py-3 rounded-lg hover:from-sky-700 hover:to-sky-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Verification Link"
              )}
            </button>

            <div className="text-center">
              <p className="text-gray-600 text-sm">
                Already verified?{" "}
                <a href="/patient/login" className="text-sky-600 hover:text-sky-700 font-semibold">
                  Login here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccount;
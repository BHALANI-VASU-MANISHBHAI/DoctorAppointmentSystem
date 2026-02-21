import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      await API.password.forgetPassword({ email });
      toast.success("Reset link sent to your email! Check your inbox.");
      setCodeSent(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Failed to send reset link");
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
            <p className="text-gray-500">Enter your email address and we'll send you a link to reset your password</p>
          </div>

          {codeSent ? (
            <div className="text-center space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-700 font-medium">✓ Reset link sent successfully!</p>
                <p className="text-green-600 text-sm mt-2">Check your email at <span className="font-semibold">{email}</span></p>
              </div>
              
              <div className="text-sm text-gray-600">
                <p className="mb-4">Click the link in the email to reset your password. The link will expire in 24 hours.</p>
              </div>

              <div className="border-t pt-6">
                <p className="text-gray-600 text-sm">Didn't receive the email?</p>
                <button
                  onClick={() => {
                    setCodeSent(false);
                    setEmail("");
                  }}
                  className="text-sky-600 hover:text-sky-700 font-semibold mt-2"
                >
                  Try another email
                </button>
              </div>
            </div>
          ) : (
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
                className="w-full bg-gradient-to-r from-sky-600 to-sky-700 text-white font-semibold py-3 rounded-lg hover:from-sky-700 hover:to-sky-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <div className="text-center">
                <p className="text-gray-600 text-sm">
                  Remember your password?{" "}
                  <Link to="/login" className="text-sky-600 hover:text-sky-700 font-semibold">
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;

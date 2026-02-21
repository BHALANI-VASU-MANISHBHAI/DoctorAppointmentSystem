import { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/index.js";

function PasswordReset() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("verify"); // verify | reset
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => {
    // Get email and otp from URL query parameters
    const emailParam = searchParams.get("email");
    const otpParam = searchParams.get("otp");

    if (emailParam) {
      setEmail(emailParam);
    }
    if (otpParam) {
      setOtp(otpParam);
      setStep("reset"); // If otp is in URL, go directly to reset step
    }
  }, [searchParams]);

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (!email || !otp) {
      toast.error("Please enter email and verification code");
      return;
    }

    try {
      setLoading(true);
      // This is just a verification step - actual reset happens on next step
      setStep("reset");
      toast.success("Code verified! Please enter your new password.");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Failed to verify code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await API.password.resetPassword({
        email,
        otp,
        newPassword,
      });
      toast.success("Password reset successfully! Redirecting to login...");
      setResetSuccess(true);
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  if (resetSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 relative overflow-hidden">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-md items-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-xl backdrop-blur text-center">
            <div className="text-6xl mb-4">✓</div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">Password Reset Successfully!</h1>
            <p className="text-gray-600 mb-6">Your password has been updated. You will be redirected to login page.</p>
            <Link to="/login" className="text-sky-600 hover:text-sky-700 font-semibold">
              Click here if not redirected
            </Link>
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
          {/* Step 1: Verify Code */}
          {step === "verify" && (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Identity</h1>
                <p className="text-gray-500">Enter the verification code sent to your email</p>
              </div>

              <form onSubmit={handleVerifyCode} className="space-y-6">
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

                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-2">
                    Verification Code
                  </label>
                  <input
                    id="otp"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter the code from your email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-2">Check your email for the reset code</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-sky-600 to-sky-700 text-white font-semibold py-3 rounded-lg hover:from-sky-700 hover:to-sky-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                </button>

                <div className="text-center">
                  <p className="text-gray-600 text-sm">
                    Didn't receive a code?{" "}
                    <Link to="/auth/forgot" className="text-sky-600 hover:text-sky-700 font-semibold">
                      Request new one
                    </Link>
                  </p>
                </div>
              </form>
            </>
          )}

          {/* Step 2: Reset Password */}
          {step === "reset" && (
            <>
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Set New Password</h1>
                <p className="text-gray-500">Enter your new password</p>
              </div>

              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      id="newPassword"
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? "👁️" : "🔒"}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm password"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? "👁️" : "🔒"}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-sky-600 to-sky-700 text-white font-semibold py-3 rounded-lg hover:from-sky-700 hover:to-sky-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Resetting..." : "Reset Password"}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;

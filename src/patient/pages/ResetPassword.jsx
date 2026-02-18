import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../shared/api";

function ResetPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState("email"); // email | code | newpassword
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await API.password.forgetPassword({ email });
      toast.success("Reset code sent to your email");
      setStep("code");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Failed to send reset code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await API.password.resetPassword({ email, otp: code, newPassword: newPassword });
      toast.success("Password reset successful! You can now login.");
      navigate("/login");
    } catch (error) {
        console.log(error.response?.data);
        console.error("Error:", error);
        toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-xl backdrop-blur">
          {/* Progress Steps */}
          <div className="mb-8 flex justify-between">
            <div className={`flex flex-col items-center ${step === "email" || step === "code" || step === "newpassword" ? "" : ""}`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${
                step === "email" || step === "code" || step === "newpassword" ? "bg-sky-600" : "bg-gray-300"
              }`}>
                1
              </div>
              <p className="mt-2 text-xs font-medium text-gray-600">Email</p>
            </div>

            <div className={`flex flex-1 items-center px-4`}>
              <div className={`h-1 flex-1 ${step === "code" || step === "newpassword" ? "bg-sky-600" : "bg-gray-300"}`} />
            </div>

            <div className={`flex flex-col items-center`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${
                step === "code" || step === "newpassword" ? "bg-sky-600" : "bg-gray-300"
              }`}>
                2
              </div>
              <p className="mt-2 text-xs font-medium text-gray-600">Verify Code</p>
            </div>

            <div className={`flex flex-1 items-center px-4`}>
              <div className={`h-1 flex-1 ${step === "newpassword" ? "bg-sky-600" : "bg-gray-300"}`} />
            </div>

            <div className={`flex flex-col items-center`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-white ${
                step === "newpassword" ? "bg-sky-600" : "bg-gray-300"
              }`}>
                3
              </div>
              <p className="mt-2 text-xs font-medium text-gray-600">New Password</p>
            </div>
          </div>

          {/* Step 1: Email */}
          {step === "email" && (
            <form onSubmit={handleRequestReset} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Forgot your password?</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Enter your email address and we'll send you a code to reset your password.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 px-5 py-3 font-semibold text-white shadow-lg transition hover:from-sky-700 hover:to-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send reset code"}
              </button>

              <div className="text-center text-sm text-slate-600">
                Remember your password?{" "}
                <Link to="/login" className="font-semibold text-sky-700 hover:text-sky-900">
                  Sign in
                </Link>
              </div>
            </form>
          )}

          {/* Step 2: Verify Code */}
          {step === "code" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Verify reset code</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Enter the code we sent to <strong>{email}</strong>
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setStep("newpassword"); }} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Verification code</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter the code"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 px-5 py-3 font-semibold text-white shadow-lg transition hover:from-sky-700 hover:to-blue-800"
                >
                  Verify code
                </button>
              </form>

              <div className="text-center">
                <button
                  onClick={() => setStep("email")}
                  className="text-sm font-semibold text-sky-700 hover:text-sky-900"
                >
                  Change email
                </button>
              </div>
            </div>
          )}

          {/* Step 3: New Password */}
          {step === "newpassword" && (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">Create new password</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Choose a strong password for your account.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">New password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Confirm password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter your password"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 px-5 py-3 font-semibold text-white shadow-lg transition hover:from-sky-700 hover:to-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Resetting..." : "Reset password"}
              </button>

              <div className="text-center">
                <button
                  onClick={() => setStep("code")}
                  className="text-sm font-semibold text-sky-700 hover:text-sky-900"
                >
                  Back
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;

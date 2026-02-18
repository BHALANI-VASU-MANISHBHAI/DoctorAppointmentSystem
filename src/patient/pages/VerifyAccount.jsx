import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../shared/api";

function VerifyAccount() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const initialEmail = searchParams.get("email");
    if (initialEmail) {
      setEmail(initialEmail);
    }
  }, [searchParams]);

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      setSending(true);
      await API.auth.sendVerificationCodeEmail({ email });
      toast.success("Verification code sent");
    } catch (error) {
        console.log(error.response?.data);
      toast.error(error.response?.data || "Failed to send code");
    } finally {
      setSending(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      setVerifying(true);
      await API.auth.verifyEmail({ email, otp: code });
      toast.success("Account verified. You can log in now.");
      setCode("");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data || "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-sky-300/30 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-4xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-xl backdrop-blur">
          <div className="mb-6 text-center">
            <h1 className="text-3xl font-serif font-semibold text-slate-900">Verify your account</h1>
            <p className="mt-2 text-sm text-slate-600">
              Enter your email to receive a verification code, then confirm it below.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <form onSubmit={handleSendCode} className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-800">Send code</h2>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
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
                disabled={sending}
                className="w-full rounded-xl bg-gradient-to-r from-sky-600 to-blue-700 px-5 py-3 font-semibold text-white shadow-lg transition hover:from-sky-700 hover:to-blue-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {sending ? "Sending..." : "Send verification code"}
              </button>
            </form>

            <form onSubmit={handleVerify} className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-800">Verify code</h2>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Code</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter the code"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                />
              </div>
              <button
                type="submit"
                disabled={verifying}
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 font-semibold text-white shadow-lg transition hover:from-amber-600 hover:to-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {verifying ? "Verifying..." : "Verify account"}
              </button>
            </form>
          </div>

          <div className="mt-6 flex flex-col gap-2 text-sm text-slate-600">
            <span>
              Already verified?{" "}
              <Link to="/login" className="font-semibold text-sky-700 hover:text-sky-900">
                Sign in
              </Link>
            </span>
            <span>
              Need a new account?{" "}
              <Link to="/signup" className="font-semibold text-amber-700 hover:text-amber-900">
                Create one
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccount;

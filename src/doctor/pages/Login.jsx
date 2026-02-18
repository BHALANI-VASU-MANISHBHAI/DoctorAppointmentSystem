import { useState, useContext } from "react";
import { toast } from "react-toastify";
import API from "../../shared/api/index.js";
import { useNavigate, Link } from "react-router-dom";
import { GlobalContext } from "../../shared/contexts/GlobalContext";

function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Attempting doctor login with:", { email, password });
    try {
      const { token } = await API.auth.login({ email, password });
      console.log("Received token from API:", token);
      setToken(token);
      toast.success("Doctor login successful");
      navigate("/view-slots");
    } catch (error) {
      console.error("Doctor login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-cyan-50 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-cyan-300/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-teal-300/30 blur-3xl" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid w-full gap-10 lg:grid-cols-2">
          <div className="hidden lg:block">
            <div className="rounded-3xl bg-gradient-to-br from-teal-600 to-cyan-600 p-10 text-white shadow-xl">
              <h1 className="text-4xl font-serif font-semibold tracking-tight">
                Doctor Portal
              </h1>
              <p className="mt-3 text-teal-100">
                Manage your schedule, view appointments, and connect with patients.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 rounded-xl bg-white/10 p-4">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Manage schedule</p>
                    <p className="text-xs text-teal-100">Create and update time slots</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white/10 p-4">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">View patients</p>
                    <p className="text-xs text-teal-100">Track all appointments</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white/10 p-4">
                  <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Easy access</p>
                    <p className="text-xs text-teal-100">Secure and convenient</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-full rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-xl backdrop-blur">
              <div className="mb-6">
                <div className="mb-4 flex justify-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-teal-600 to-cyan-600 flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-3xl font-serif font-semibold text-slate-900 text-center">Doctor Login</h2>
                <p className="mt-2 text-sm text-slate-600 text-center">
                  Access your professional dashboard
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="doctor@example.com"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-slate-900 shadow-sm outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
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
                  className="w-full rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:from-teal-700 hover:to-cyan-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Signing in..." : "Sign in as Doctor"}
                </button>
              </form>

              <div className="mt-6 flex flex-col gap-3 text-center text-sm text-slate-600">
                <p>Professional healthcare provider access</p>
                <span>
                  Forgot your password?{" "}
                  <Link to="/reset-password" className="font-semibold text-teal-600 hover:text-teal-700">
                    Reset it
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

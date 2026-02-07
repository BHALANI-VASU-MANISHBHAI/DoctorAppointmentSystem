import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";

function Signup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            await API.auth.register({ name: fullName, email, password });
            toast.success("Account created. Please verify your email.");
            navigate(`/verify?email=${encodeURIComponent(email)}`);
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-sky-50 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-sky-300/30 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />

            <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid w-full gap-10 lg:grid-cols-2">
                    <div className="flex items-center">
                        <div className="w-full rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-xl backdrop-blur">
                            <div className="mb-6">
                                <h2 className="text-3xl font-serif font-semibold text-slate-900">Create account</h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    Join the platform and book appointments in minutes.
                                </p>
                            </div>

                            <form onSubmit={handleSignup} className="space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
                                    <input
                                        type="text"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        placeholder="Enter your full name"
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Create a password"
                                            required
                                            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pr-12 text-slate-900 shadow-sm outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
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

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">Confirm password</label>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Re-enter your password"
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-3 font-semibold text-white shadow-lg transition hover:from-amber-600 hover:to-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {loading ? "Creating account..." : "Create account"}
                                </button>
                            </form>

                            <div className="mt-6 flex flex-col gap-2 text-sm text-slate-600">
                                <span>
                                    Already have an account?{" "}
                                    <Link to="/login" className="font-semibold text-amber-700 hover:text-amber-900">
                                        Sign in
                                    </Link>
                                </span>
                                <span>
                                    Need to verify your email?{" "}
                                    <Link to="/verify" className="font-semibold text-sky-700 hover:text-sky-900">
                                        Verify your account
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <div className="rounded-3xl bg-gradient-to-br from-amber-500 to-orange-500 p-10 text-white shadow-xl">
                            <h1 className="text-4xl font-serif font-semibold tracking-tight">
                                Start your care journey
                            </h1>
                            <p className="mt-3 text-amber-100">
                                Create an account to discover specialists, compare slots, and keep your visits organized.
                            </p>
                            <div className="mt-8 space-y-4">
                                <div className="flex items-center gap-3 rounded-xl bg-white/10 p-4">
                                    <div className="h-10 w-10 rounded-full bg-white/20" />
                                    <div>
                                        <p className="text-sm font-semibold">Curated specialists</p>
                                        <p className="text-xs text-amber-100">Choose the right doctor</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-xl bg-white/10 p-4">
                                    <div className="h-10 w-10 rounded-full bg-white/20" />
                                    <div>
                                        <p className="text-sm font-semibold">Verified access</p>
                                        <p className="text-xs text-amber-100">Confirm your email in minutes</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-xl bg-white/10 p-4">
                                    <div className="h-10 w-10 rounded-full bg-white/20" />
                                    <div>
                                        <p className="text-sm font-semibold">Track visits</p>
                                        <p className="text-xs text-amber-100">Manage all appointments</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;



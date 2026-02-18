import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api";
import { GlobalContext } from "../contexts/GlobalContext";

function Login() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { setToken ,navigate } = useContext(GlobalContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { token } = await API.auth.login({ email, password });
            setToken(token);
            toast.success("Login successful");
            navigate("/");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-amber-50 relative overflow-hidden">
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-amber-300/30 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />

            <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
                <div className="grid w-full gap-10 lg:grid-cols-2">
                    <div className="hidden lg:block">
                        <div className="rounded-3xl bg-gradient-to-br from-sky-600 to-blue-700 p-10 text-white shadow-xl">
                            <h1 className="text-4xl font-serif font-semibold tracking-tight">
                                Welcome back
                            </h1>
                            <p className="mt-3 text-sky-100">
                                Sign in to manage your appointments, view upcoming visits, and book new slots.
                            </p>
                            <div className="mt-8 space-y-4">
                                <div className="flex items-center gap-3 rounded-xl bg-white/10 p-4">
                                    <div className="h-10 w-10 rounded-full bg-white/20" />
                                    <div>
                                        <p className="text-sm font-semibold">Verified doctors</p>
                                        <p className="text-xs text-sky-100">Find trusted specialists fast</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-xl bg-white/10 p-4">
                                    <div className="h-10 w-10 rounded-full bg-white/20" />
                                    <div>
                                        <p className="text-sm font-semibold">Instant booking</p>
                                        <p className="text-xs text-sky-100">Pick a slot and confirm</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 rounded-xl bg-white/10 p-4">
                                    <div className="h-10 w-10 rounded-full bg-white/20" />
                                    <div>
                                        <p className="text-sm font-semibold">Secure access</p>
                                        <p className="text-xs text-sky-100">Your data stays protected</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="w-full rounded-3xl border border-slate-100 bg-white/90 p-8 shadow-xl backdrop-blur">
                            <div className="mb-6">
                                <h2 className="text-3xl font-serif font-semibold text-slate-900">Login</h2>
                                <p className="mt-2 text-sm text-slate-600">
                                    Access your account to continue booking.
                                </p>
                            </div>

                            <form onSubmit={handleLogin} className="space-y-5">
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

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
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
                                    {loading ? "Signing in..." : "Sign in"}
                                </button>
                            </form>

                            <div className="mt-6 flex flex-col gap-2 text-sm text-slate-600">
                                <span>
                                    Do not have an account?{" "}
                                    <Link to="/signup" className="font-semibold text-sky-700 hover:text-sky-900">
                                        Create one
                                    </Link>
                                </span>
                                <span>
                                    Forgot your password?{" "}
                                    <Link to="/reset-password" className="font-semibold text-sky-700 hover:text-sky-900">
                                        Reset it
                                    </Link>
                                </span>
                                <span>
                                    Not verified yet?{" "}
                                    <Link to="/verify" className="font-semibold text-amber-700 hover:text-amber-900">
                                        Verify your account
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
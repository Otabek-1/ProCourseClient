import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (mode === "register") {
        if (form.password !== form.confirm) {
          setMessage("Passwords do not match ❌");
          setLoading(false);
          return;
        }

        const res = await axios.post("http://localhost:4000/register", {
          full_name: form.full_name,
          email: form.email,
          password: form.password,
        });

        setMessage("✅ Registration successful! Now login.");
        setMode("login");
      } else {
        const res = await axios.post("http://localhost:4000/login", {
          email: form.email,
          password: form.password,
        });

        setMessage("✅ Login successful!");
        console.log(res);

        // userni localStorage ga yozamiz
        localStorage.setItem("user", JSON.stringify(res.data));

        // endi user id bo'yicha role olish
        const userId = res.data.userId;
        // console.log(userId);
        
        const userRes = await axios.get(`http://localhost:4000/user/${userId}`);
        
        if (userRes.data.role === "user") {
          navigate("/home");
        } else {
          navigate("/admin");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error: " + (err.response?.data?.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  // ✅ return endi komponentning oxirida
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8"
      >
        {/* Header Tabs */}
        <div className="flex justify-between mb-6">
          <button
            onClick={() => setMode("login")}
            className={`w-1/2 py-2 rounded-lg font-semibold transition ${
              mode === "login"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={`w-1/2 py-2 rounded-lg font-semibold transition ${
              mode === "register"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Register
          </button>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {mode === "login" ? "Welcome Back 👋" : "Create an Account 🚀"}
        </h2>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                value={form.full_name}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {mode === "register" && (
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="password"
                name="confirm"
                placeholder="Confirm Password"
                value={form.confirm}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            {loading ? "Loading..." : mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="mt-4 text-center text-sm text-red-500">{message}</p>
        )}

        {/* Extra Links */}
        {mode === "login" ? (
          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => setMode("register")}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              Register now
            </span>
          </p>
        ) : (
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => setMode("login")}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        )}
      </motion.div>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { signUpUser } from "../services/api";
import Loader from "../components/Loader";
import HomeNav from "../components/HomeNav";

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signUpUser(
        formData.username,
        formData.email,
        formData.password
      );

      if (res?.status === 201) {
        navigate("/dashboard");
      } else {
        setError(res?.data?.message || "Failed to sign up. Please try again.");
        setIsLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <HomeNav />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-[90%] p-12 flex items-center justify-center bg-gray-50 px-4"
      >
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Create Your Account
          </h1>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-red-500 text-center mb-4 text-sm"
            >
              {error}
            </motion.p>
          )}

          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:outline-none transition duration-300"
                required
              />
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className={`w-full py-3 mt-4 rounded-md text-white font-medium transition duration-300 ${
                isLoading
                  ? "bg-teal-400 cursor-not-allowed opacity-70"
                  : "bg-teal-500 hover:bg-teal-600"
              }`}
            >
              {isLoading ? <Loader /> : "Sign Up"}
            </motion.button>
          </form>

          <motion.p
            className="mt-6 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Already have an account?{" "}
            <a
              href="/login"
              className="text-teal-600 font-medium hover:underline"
            >
              Log in
            </a>
          </motion.p>
        </div>
      </motion.section>
    </>
  );
};

export default SignUpPage;

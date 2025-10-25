import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import LoginForm from "../components/LoginForm";
import HomeNav from "../components/HomeNav";

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleLoginSuccess = (): void => {
    navigate("/dashboard");
  };

  return (
    <>
      <HomeNav />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-8 bg-gray-50"
      >
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
            Welcome Back
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

          <LoginForm
            name=""
            pass=""
            onLoginSuccess={handleLoginSuccess}
            setError={setError}
          />

          <motion.p
            className="mt-6 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-teal-600 font-medium hover:underline"
            >
              Sign up
            </a>
          </motion.p>
        </div>
      </motion.section>
    </>
  );
};

export default LoginPage;

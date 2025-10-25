import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showButton, setShowButton] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handler as EventListener);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handler as EventListener
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === "accepted") {
      console.log("✅ User accepted the PWA install");
    } else {
      console.log("❌ User dismissed the PWA install");
    }

    setDeferredPrompt(null);
    setShowButton(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-200 via-sky-300 to-indigo-200">
      {/* Navbar */}
      <motion.nav
        className="fixed top-0 left-0 w-full bg-transparent text-gray-900 py-4 px-8 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="flex justify-between items-center">
          <motion.h1
            className="text-3xl font-bold text-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            QuickLink
          </motion.h1>
          <div className="space-x-6 hidden md:flex">
            <Link to="/signup">
              <motion.button
                className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                Sign Up
              </motion.button>
            </Link>
            <Link to="/login">
              <motion.button
                className="px-6 py-2 bg-transparent border-2 border-gray-800 hover:bg-gray-800 hover:text-white text-gray-800 rounded-full"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                Login
              </motion.button>
            </Link>
            {showButton && (
              <motion.button
                onClick={handleInstallClick}
                className="px-3 py-2 bg-transparent border-2 border-gray-800   text-gray-800 rounded-full"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.1 }}
              >
                Install app
              </motion.button>
            )}
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-800">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } absolute top-0 left-0 w-full bg-black bg-opacity-50 py-4 px-8 z-10`}
        >
          <div className="flex justify-end">
            <button onClick={toggleMenu} className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center mt-4">
            <Link
              to="/signup"
              onClick={toggleMenu}
              className="py-2 px-4 text-white hover:bg-gray-700 rounded"
            >
              Sign Up
            </Link>
            <Link
              to="/login"
              onClick={toggleMenu}
              className="py-2 px-4 text-white hover:bg-gray-700 rounded mt-2"
            >
              Login
            </Link>
            {showButton && (
              <button
                onClick={handleInstallClick}
                className="py-2 px-4 text-white hover:bg-gray-700 rounded mt-2"
              >
                Install App
              </button>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        className="flex items-center justify-center h-screen px-4 text-center text-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="max-w-xl space-y-8"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl mt-[8rem] sm:mt-0lg:text-6xl font-bold tracking-wide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            Share Files Securely, Anytime, Anywhere
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            A fast, secure way to upload, store, and share your files. Get
            started now!
          </motion.p>
          <Link to="/signup">
            <motion.button
              className="mt-6 px-8 py-4 bg-teal-500 hover:bg-teal-600 text-white rounded-full shadow-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Get Started
            </motion.button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50 text-gray-900">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          What We Offer
        </motion.h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {/* Feature 1 */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transform transition duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <motion.h3
              className="text-2xl font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Easy Upload
            </motion.h3>
            <p className="text-lg">
              Upload your files quickly with a simple drag-and-drop interface.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transform transition duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <motion.h3
              className="text-2xl font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Quick Sharing
            </motion.h3>
            <p className="text-lg">
              Share your files instantly with a unique link or QR code.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transform transition duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 1 }}
          >
            <motion.h3
              className="text-2xl font-semibold mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Secure Storage
            </motion.h3>
            <p className="text-lg">
              Enjoy peace of mind with encrypted file storage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <motion.section
        className="py-16 bg-gradient-to-r from-teal-300 via-sky-200 to-indigo-200 text-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          What Our Users Say
        </motion.h2>
        <div className="container mx-auto text-center">
          <motion.div
            className="mx-auto bg-white text-gray-900 p-8 rounded-xl shadow-xl max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <p className="text-lg italic">
              "QuickLink is the easiest and most secure way to share files."
            </p>
            <p className="mt-4 font-semibold">Kuldeep, Developer</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        className="py-20 bg-gray-800 text-white text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.h2
          className="text-3xl font-semibold mb-6"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        >
          Ready to Start Sharing?
        </motion.h2>
        <Link to="/signup">
          <motion.button
            className="px-10 py-4 bg-pink-500 hover:bg-pink-600 text-white text-xl rounded-full transform transition duration-300"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0 }}
          >
            Get Started Now
          </motion.button>
        </Link>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-6 text-center">
        <p>&copy; 2025 QuickLink. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpUser } from '../services/api';
import { motion } from 'framer-motion';
import Loader from '../components/Loader';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
     const res =  await signUpUser(username, email, password);
      if(res){
        navigate('/dashboard');
      }
      else{
        setError('Failed to sign up. Please try again.');
      setIsLoading(false);
      }
    } catch (error) {
      setError('Failed to sign up. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gray-50"
    >
      <div className="bg-white p-8 rounded-xl shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h2>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-red-500 text-center mb-4"
          >
            {error}
          </motion.p>
        )}

        <form onSubmit={handleSignUp}>
        <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-600 mb-2">
              Username
            </label>
            <input
              type="username"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
              required
              placeholder="Enter username"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 transition duration-300"
              required
              placeholder="Enter your password"
            />
          </div>

          <motion.button
            type="submit"
            className={`w-full p-4 mt-4 bg-teal-500 text-white rounded-md shadow-md transform transition duration-300 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-teal-600'
            }`}
            disabled={isLoading}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {isLoading ? <Loader/> : 'Sign Up'}
          </motion.button>
        </form>

        <motion.p
          className="mt-6 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Already have an account?{' '}
          <a href="/login" className="text-teal-500 hover:underline">
            Log In
          </a>
        </motion.p>
      </div>
    </motion.div>
  );
};

export default SignUpPage;

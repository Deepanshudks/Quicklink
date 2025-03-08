import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import LoginForm from '../components/LoginForm'; // Assuming LoginForm is in 'components' folder
import HomeNav from '../components/HomeNav';

const LoginPage: React.FC = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isGuest, setIsGuest] = useState(false)

  const handleLoginSuccess = () => {
    navigate('/dashboard'); 
  };

  return (
    <>
    <div >
    <HomeNav/>
    </div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center"
      >
      <div className="bg-white p-8 rounded-xl shadow-lg w-full sm:w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>

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
        {
          isGuest?(<LoginForm name="user" pass="12345" onLoginSuccess={handleLoginSuccess} setError={setError} />):(<LoginForm name="" pass="" onLoginSuccess={handleLoginSuccess} setError={setError} />)
        }
        
        {/* <motion.p
          className="mt-6 text-center cursor-pointer text-blue-300 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          onClick={(e)=>{
            setIsGuest(true)
            navigate("/login")
          }}
        >
          Login as Guest
        </motion.p> */}

        <motion.p
          className="mt-6 text-center text-sm text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Don't have an account?{' '}
          <a href="/signup" className="text-teal-500 hover:underline">
            Sign Up
          </a>
        </motion.p>
      </div>
    </motion.div>
    
    </>
  );
};

export default LoginPage;

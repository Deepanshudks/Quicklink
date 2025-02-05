import React, { useState } from 'react';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { loginUser } from '../services/api';
import toast from 'react-hot-toast';
import Loader from './Loader';

interface LoginFormProps {
  onLoginSuccess: () => void;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isloading, setIsloading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate: (values) => {
      const errors: { username?: string; password?: string } = {};
      if (!values.username) {
        errors.username = 'Required';
      }
      if (!values.password) {
        errors.password = 'Required';
      }
      return errors;
    },
    onSubmit: async (value) => {
      setIsloading(true)

      const res = await loginUser(value.username, value.password)
      if (res?.status == 200) {
        
        onLoginSuccess()
        setIsloading(false)
      } else {
        toast.error(res?.data.message || "Failed to login")
        setIsloading(false)
      }
    }
    // async (values) => {
    //   try {
    //     // Simulating an API call with axios
    //     await axios.post('/api/login', values);
    //     onLoginSuccess(); // Call the success handler passed from the parent
    //   } catch (error) {
    //     formik.setFieldError('email', 'Invalid credentials'); // Set form error for email
    //     setError('Invalid credentials'); // Set error message on parent
    //   }
    // },
  });

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-16">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Login </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2 text-gray-600" htmlFor="username">
            Username
          </label>
          <input
            type="username"
            id="username"
            name="username"
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300 ${formik.errors.username ? 'border-red-500' : 'border-gray-300'
              }`}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.username}</div>
          )}
        </div>

        <div className="mb-4 relative">
          <label className="block text-sm font-semibold mb-2 text-gray-600" htmlFor="password">
            Password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300 ${formik.errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-teal-500 py-6 focus:outline-none"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>

          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
          )}
        </div>

        {formik.errors.username && formik.touched.username && (
          <div className="text-red-500 text-sm mb-2">Invalid credentials</div>
        )}

        <motion.button
          type="submit"
          className="mt-4 bg-teal-500 text-white p-3 rounded-md w-full hover:bg-teal-600 transition duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >{
            isloading ? <Loader /> : "Log In"
          }
        </motion.button>
      </form>
    </div>
  );
};

export default LoginForm;

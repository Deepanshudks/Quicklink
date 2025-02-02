import React, { useState } from 'react';
import { useFormik, FormikErrors } from 'formik';
import { motion } from 'framer-motion';
import axios from 'axios';
import Loader from './Loader';

interface FormValues {
  email: string;
  password: string;
}

// Extend FormikErrors to allow for a "general" error
interface FormikCustomErrors extends FormikErrors<FormValues> {
  general?: string;
}

const SignUpForm: React.FC = () => {
    const [isloading, setIsloading] = useState(false);
  
  const formik = useFormik<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: (values) => {
      const errors: FormikCustomErrors = {}; // Use the extended type
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setIsloading(true)
        await axios.post('/api/signup', { email: values.email, password: values.password });
        // Handle successful signup (e.g., redirect to login)
        setIsloading(false)
      } catch (error) {
        formik.setFieldError('general', 'Error creating account'); // Set the general error
        setIsloading(false)
      }
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto p-6 bg-white rounded shadow-md"
    >
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.email && formik.errors.email && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-red-500 text-sm mt-1"
            >
              {formik.errors.email}
            </motion.div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
          />
          {formik.touched.password && formik.errors.password && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-red-500 text-sm mt-1"
            >
              {formik.errors.password}
            </motion.div>
          )}
        </div>
          {/* @ts-ignore  */}
        {formik.errors.general && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-red-500 text-sm mb-4"
          >
            {/* @ts-ignore  */}
            {formik.errors.general}
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          className="mt-4 bg-blue-500 text-white p-2 rounded w-full"
          type="submit"
          disabled={formik.isSubmitting}
        >
          {isloading? <Loader/> : 'Sign Up'}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default SignUpForm;

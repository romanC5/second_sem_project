import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation, useRegisterMutation } from '../services/dummyApi';

const Login_Signup = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (isLogin) {
      // Login
      if (!form.email || !form.password) {
        setError('Please fill in all required fields.');
        return;
      }

      try {
        const result = await login({ 
          email: form.email, 
          password: form.password 
        }).unwrap();

        if (result.success) {
          setSuccess('Login successful!');
          localStorage.setItem('token', result.data.token);
          localStorage.setItem('userInfo', JSON.stringify(result.data.user));
          
          // Redirect based on role
          setTimeout(() => {
            if (result.data.user.role === 'superadmin') {
              navigate('/superadmin');
            } else if (result.data.user.role === 'shopkeeper') {
              navigate('/admin');
            } else {
              navigate('/');
            }
            window.location.reload();
          }, 500);
        }
      } catch (err) {
        setError(err?.data?.message || 'Login failed. Please check your credentials.');
        console.error('Login error:', err);
      }
    } else {
      // Signup
      if (!form.name || !form.email || !form.password) {
        setError('Please fill in all required fields.');
        return;
      }

      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }

      if (form.password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
      }

      try {
        const result = await register({
          name: form.name,
          email: form.email,
          password: form.password,
          phone: form.phone,
        }).unwrap();

        if (result.success) {
          setSuccess('Registration successful! Please login.');
          setForm({ name: '', email: '', password: '', confirmPassword: '', phone: '' });
          setTimeout(() => setIsLogin(true), 2000);
        }
      } catch (err) {
        setError(err?.data?.message || 'Registration failed. Please try again.');
        console.error('Registration error:', err);
      }
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-10 px-2">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-brand-red">
          {isLogin ? 'Login' : 'Sign Up'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block mb-1 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                placeholder="Enter your full name"
                autoComplete="name"
              />
            </div>
          )}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block mb-1 font-medium">Phone (Optional)</label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                placeholder="Enter your phone number"
                autoComplete="tel"
              />
            </div>
          )}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
              placeholder="Password"
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                placeholder="Confirm Password"
                autoComplete="new-password"
              />
            </div>
          )}
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          <button
            type="submit"
            disabled={isLoggingIn || isRegistering}
            className="w-full py-3 bg-black font-bold text-white rounded-lg text-xl duration-200 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingIn || isRegistering 
              ? (isLogin ? 'Logging in...' : 'Signing up...') 
              : (isLogin ? 'Login' : 'Sign Up')
            }
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-600">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </span>
          <button
            className="ml-2 text-brand-red hover:underline font-semibold"
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setSuccess('');
            }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login_Signup;
import React, { useState } from 'react';

const Login_Signup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    userOrEmail: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.userOrEmail || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (!isLogin && form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (isLogin) {
      // DummyJSON login expects username, but will accept email if user exists
      const username = form.userOrEmail;
      try {
        const res = await fetch('https://dummyjson.com/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            password: form.password,
            expiresInMins: 30,
          }),
          // credentials: 'include',
        });
          const data = await res.json();
          console.log('Login response:', data);
          const token = data.accessToken || data.token;
          if (token) {
            setSuccess('Login successful!');
            setForm({ userOrEmail: '', password: '', confirmPassword: '' });
            localStorage.setItem('accessToken', token);
            fetch('https://dummyjson.com/auth/me', {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            })
              .then(res => res.json())
              .then(user => {
                console.log('User info:', user);
                setUserInfo(user);
              });
          } else {
            setError(data.message || 'Login failed.');
            console.error('Login failed:', data);
          }
      } catch (err) {
        setError('Network error.');
      }
    } else {
      // Simulate signup
      setTimeout(() => {
        setSuccess('Signup successful!');
        setForm({ userOrEmail: '', password: '', confirmPassword: '' });
      }, 800);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-10 px-2">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center text-brand-red">
          {isLogin ? 'Login' : 'Sign Up'}
        </h1>
  <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Username or Email</label>
            <input
              type="text"
              name="userOrEmail"
              value={form.userOrEmail}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
              placeholder="Enter your username or email"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
              placeholder="Password"
              autoComplete="off"
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
                autoComplete="off"
              />
            </div>
          )}
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          {/* {userInfo && (
            <div className="bg-green-50 border border-green-200 rounded p-4 mt-4 text-green-900 text-sm">
              <div className="font-bold mb-1">Logged in as:</div>
              <div>Username: {userInfo.username}</div>
              <div>Email: {userInfo.email}</div>
              <div>Name: {userInfo.firstName} {userInfo.lastName}</div>
            </div>
          )} */}
          <button
            type="submit"
            className="w-full py-3 hover:bg-brand-red-dark font-bold rounded-lg text-2xl duration-200 shadow-md cursor-pointer"
          >
            {isLogin ? 'Login' : 'Sign Up'}
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
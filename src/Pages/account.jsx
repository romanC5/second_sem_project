import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('userInfo');
      if (userStr) setUser(JSON.parse(userStr));
      else setUser(null);
    } catch {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userInfo');
    navigate('/login_Signup');
    window.location.reload();
  };

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="text-xl text-gray-600">You are not logged in.</div>
        <button
          onClick={() => navigate('/login_Signup')}
          className="mt-4 px-6 py-2 bg-brand-red text-white rounded-lg font-semibold shadow hover:bg-brand-red-dark transition-colors duration-200"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 py-10 px-2">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
        <img
          src={user.image}
          alt="Account"
          className="w-24 h-24 rounded-full object-cover border-4 border-brand-red mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">{user.firstName} {user.lastName}</h2>
        <div className="text-gray-700 mb-1">Username: <span className="font-semibold">{user.username}</span></div>
        <div className="text-gray-700 mb-1">Email: <span className="font-semibold">{user.email}</span></div>
        <div className="text-gray-700 mb-6">Gender: <span className="font-semibold">{user.gender}</span></div>
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-black text-white rounded-lg font-semibold shadow"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Account;
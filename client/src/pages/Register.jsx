// File: client/src/pages/Register.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export default function Register({ setUser }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(3); // default: login
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    code: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const logo1Url = "https://res.cloudinary.com/dkoqcp1g9/image/upload/v1750591433/Geolook-Logo_wyuybf.png";
  const logo2Url = "https://res.cloudinary.com/dkoqcp1g9/image/upload/v1750621233/Logo_qytjcp.png";

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await fetch('https://mavenox.onrender.com/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data.name);
          navigate('/');
        }
      }
    };
    checkAuth();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const register = async () => {
    if (!form.name || !form.email || !form.password || !form.confirm)
      return alert('Please fill all fields');
    if (!validateEmail(form.email)) return alert('Invalid email format');
    if (form.password !== form.confirm)
      return alert('Passwords do not match');
    if (form.password.length < 6)
      return alert('Password must be at least 6 characters');

    const res = await fetch('https://mavenox.onrender.com/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        password: form.password,
      }),
    });
    if (res.status === 409) return alert('Email already exists');
    if (res.ok) {
      alert('Confirmation code sent to your email');
      setStep(2);
    } else {
      alert('Registration failed');
    }
  };

  const confirm = async () => {
    if (!form.code) return alert('Please enter the confirmation code');
    const res = await fetch('https://mavenox.onrender.com/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, code: form.code }),
    });
    if (res.ok) {
      alert('Verification successful');
      setStep(3);
    } else {
      alert('Invalid confirmation code');
    }
  };

  const login = async () => {
    if (!form.email || !form.password)
      return alert('Please fill all login fields');
    const res = await fetch('https://mavenox.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      setUser(data.name);
      alert('Login successful');
      navigate('/');
    } else {
      alert(data.error || 'Login failed');
    }
  };

  const inputClass =
    'bg-white/10 text-white border border-gray-500 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-300 transition-all duration-300';

  const buttonClass =
    'bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-400 hover:to-lime-400 transition-all text-white font-bold py-2 px-4 rounded w-full shadow-md';

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-white to-green-300 text-transparent bg-clip-text flex items-center justify-center gap-2">
            {step === 1 && 'Create Account'}
            {step === 2 && 'Email Verification'}
            {step === 3 && (
              <>
                <img src={logo1Url} alt="Logo" className="h-8 sm:h-10 object-contain inline-block" />
              </>
            )}
          </h2>

          {step === 1 && (
            <div className="space-y-4">
              <input name="name" onChange={handleChange} className={inputClass} placeholder="Full Name" />
              <input name="email" onChange={handleChange} className={inputClass} placeholder="Email Address" />
              <input name="password" type="password" onChange={handleChange} className={inputClass} placeholder="Password" />
              <input name="confirm" type="password" onChange={handleChange} className={inputClass} placeholder="Confirm Password" />
              <button onClick={register} className={buttonClass}>Sign Up</button>

              <div className="text-center text-sm text-gray-300">
                Already have an account?{" "}
                <button onClick={() => setStep(3)} className="text-green-300 hover:underline">
                  Sign In
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <input name="code" onChange={handleChange} className={inputClass} placeholder="Enter Confirmation Code" />
              <button onClick={confirm} className={buttonClass}>Verify Code</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <input name="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="Email Address" />
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-2 text-white/60 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <button onClick={login} className={buttonClass}>Login</button>

              <div className="text-center text-sm text-gray-300 flex flex-col items-center gap-1">
                <div>
                  Don’t have an account?{" "}
                  <button onClick={() => setStep(1)} className="text-green-300 hover:underline">
                    Sign Up
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className='mt-6 text-lg font-bold text-center bg-gradient-to-r from-white to-green-300 text-transparent bg-clip-text flex items-center justify-center gap-2'>
                    in association with
                  </span>
                  <img src={logo2Url} alt="Logo 2" className="mt-4 h-6 sm:h-8 object-contain" />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

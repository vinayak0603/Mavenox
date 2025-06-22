// File: client/src/pages/Register.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Register({ setUser }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(3); // Default to login screen
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', code: '' });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const res = await fetch('https://mavenox.onrender.com/verify', {
          headers: { Authorization: `Bearer ${token}` }
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

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const register = async () => {
    if (!form.name || !form.email || !form.password || !form.confirm) return alert('Please fill all fields');
    if (!validateEmail(form.email)) return alert('Invalid email format');
    if (form.password !== form.confirm) return alert('Passwords do not match');
    if (form.password.length < 6) return alert('Password must be at least 6 characters');

    const res = await fetch('https://mavenox.onrender.com/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
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
      body: JSON.stringify({ email: form.email, code: form.code })
    });
    if (res.ok) {
      alert('Verification successful');
      setStep(3);
    } else {
      alert('Invalid confirmation code');
    }
  };

  const login = async () => {
    if (!form.email || !form.password) return alert('Please fill all login fields');
    const res = await fetch('https://mavenox.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, password: form.password })
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
    'bg-white/10 text-white border border-gray-500 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-300 backdrop-blur-sm';
  const buttonClass =
    'bg-green-600 hover:bg-green-500 transition-all text-white font-bold py-2 px-4 rounded w-full';

  return (
    <div className="relative min-h-screen bg-[#0f172a] text-white overflow-hidden">
      {/* Background Video (Cloudinary Player Embed) */}
      <div className="absolute inset-0 z-0">
        <iframe
          src="https://player.cloudinary.com/embed/?cloud_name=dkoqcp1g9&public_id=Untitled_video_-_Made_with_Clipchamp_46_zdrvxy&player[autoplay]=true&player[autoplayMode]=on-scroll&player[muted]=true&player[loop]=true&player[controls]=false"
          className="w-full h-full object-cover"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Foreground Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-gray-100 mb-8 drop-shadow-lg"
        >
          Structural Health Monitoring Software
        </motion.h1>

        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-xl shadow-xl space-y-6"
        >
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-white">Create Account</h2>
              <input name="name" onChange={handleChange} className={inputClass} placeholder="Name" />
              <input name="email" onChange={handleChange} className={inputClass} placeholder="Email" />
              <input name="password" type="password" onChange={handleChange} className={inputClass} placeholder="Password (min 6 characters)" />
              <input name="confirm" type="password" onChange={handleChange} className={inputClass} placeholder="Confirm Password" />
              <button onClick={register} className={buttonClass}>Sign Up</button>
              <div className="text-center text-gray-300">or</div>
              <button
                onClick={() => setStep(3)}
                className="bg-gray-700 hover:bg-gray-600 transition-all text-white font-bold py-2 px-4 rounded w-full"
              >
                Login Instead
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-white">Email Verification</h2>
              <input name="code" onChange={handleChange} className={inputClass} placeholder="Enter Confirmation Code" />
              <button onClick={confirm} className={buttonClass}>Verify Code</button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-center text-white">Login</h2>
              <input name="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="Email" />
              <input name="password" type="password" value={form.password} onChange={handleChange} className={inputClass} placeholder="Password" />
              <button onClick={login} className={buttonClass}>Login</button>
              <div className="text-center text-gray-300">or</div>
              <button
                onClick={() => setStep(1)}
                className="bg-gray-700 hover:bg-gray-600 transition-all text-white font-bold py-2 px-4 rounded w-full"
              >
                Register Instead
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

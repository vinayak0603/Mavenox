// File: client/src/pages/Register.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register({ setUser }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
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
    'bg-[#1f2937] text-white border border-gray-600 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400';
  const buttonClass =
    'bg-green-600 hover:bg-green-500 transition-all text-white font-bold py-2 px-4 rounded w-full';

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white p-4">
      <div className="w-full max-w-md bg-[#1e293b] p-8 rounded-xl shadow-lg">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">Create Account</h2>
            <input name="name" onChange={handleChange} className={inputClass} placeholder="Name" />
            <input name="email" onChange={handleChange} className={inputClass} placeholder="Email" />
            <input name="password" type="password" onChange={handleChange} className={inputClass} placeholder="Password (min 6 characters)" />
            <input name="confirm" type="password" onChange={handleChange} className={inputClass} placeholder="Confirm Password" />
            <button onClick={register} className={buttonClass}>Sign Up</button>
            <div className="text-center text-gray-400">or</div>
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
            <h2 className="text-xl font-bold text-center">Email Verification</h2>
            <input name="code" onChange={handleChange} className={inputClass} placeholder="Enter Confirmation Code" />
            <button onClick={confirm} className={buttonClass}>Verify Code</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-center">Login</h2>
            <input name="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="Email" />
            <input name="password" type="password" value={form.password} onChange={handleChange} className={inputClass} placeholder="Password" />
            <button onClick={login} className={buttonClass}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
}

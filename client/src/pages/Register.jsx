import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

export default function Register({ setUser }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(3); // Start with Login screen
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    code: '',
    newPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const logo1Url = "https://res.cloudinary.com/dkoqcp1g9/image/upload/v1750591433/Geolook-Logo_wyuybf.png";
  const logo2Url = "https://res.cloudinary.com/dkoqcp1g9/image/upload/v1750621233/Logo_qytjcp.png";

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    if (!canResend && step === 2) {
      const interval = setInterval(() => {
        setResendTimer((t) => {
          if (t <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 30;
          }
          return t - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [canResend, step]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const register = async () => {
    const errs = {};
    if (!form.name) errs.name = 'Name required';
    if (!form.email || !validateEmail(form.email)) errs.email = 'Valid email required';
    if (!form.password || form.password.length < 6) errs.password = 'Min 6 characters';
    if (form.password !== form.confirm) errs.confirm = 'Passwords do not match';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const res = await fetch('https://mavenox.onrender.com/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });

    if (res.status === 409) setErrors({ email: 'Email already exists' });
    else if (res.ok) {
      setStep(2);
      setCanResend(false);
    }
  };

  const resendCode = async () => {
    setCanResend(false);
    await fetch('https://mavenox.onrender.com/resend-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email }),
    });
  };

  const confirm = async () => {
    if (!form.code) return setErrors({ code: 'Enter confirmation code' });
    const res = await fetch('https://mavenox.onrender.com/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, code: form.code }),
    });
    if (res.ok) setStep(3);
    else setErrors({ code: 'Invalid code' });
  };

  const login = async () => {
    const errs = {};
    if (!form.email || !validateEmail(form.email)) errs.email = 'Valid email required';
    if (!form.password) errs.password = 'Password required';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const res = await fetch('https://mavenox.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, password: form.password }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      localStorage.setItem('token', data.token);
      setUser(data.name);
      navigate('/');
    } else setErrors({ password: data.error });
  };

  const requestReset = async () => {
    const res = await fetch('https://mavenox.onrender.com/request-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email }),
    });
    if (res.ok) setStep(5);
    else setErrors({ email: 'Email not found' });
  };

  const confirmReset = async () => {
    if (!form.code || !form.newPassword) return;
    const res = await fetch('https://mavenox.onrender.com/confirm-reset', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, code: form.code, newPassword: form.newPassword }),
    });
    if (res.ok) setStep(3);
    else setErrors({ code: 'Invalid code or error resetting' });
  };

  const inputClass = 'bg-white/10 text-white border border-gray-500 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-300';
  const buttonClass = 'bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-400 hover:to-lime-400 text-white font-bold py-2 px-4 rounded w-full shadow-md';

  const renderInput = (name, type = 'text', placeholder = '') => (
    <div>
      <input name={name} value={form[name]} onChange={handleChange} type={type} className={inputClass} placeholder={placeholder} />
      {errors[name] && <div className="text-red-400 text-sm mt-1">{errors[name]}</div>}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden text-white">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-white to-green-300 text-transparent bg-clip-text">
            {step === 1 && 'Create Account'}
            {step === 2 && 'Verify Email'}
            {step === 3 && <img src={logo1Url} alt="Logo 1" className="h-8 sm:h-10 inline-block" />}
            {step === 4 && 'Reset Password'}
            {step === 5 && 'Confirm Reset'}
          </h2>

          {step === 1 && <>
            {renderInput('name', 'text', 'Full Name')}
            {renderInput('email', 'text', 'Email Address')}
            {renderInput('password', 'password', 'Password')}
            {renderInput('confirm', 'password', 'Confirm Password')}
            <button onClick={register} className={buttonClass}>Sign Up</button>
            <p className="text-sm text-center">Already have account? <button onClick={() => setStep(3)} className="text-green-300 underline">Sign In</button></p>
          </>}

          {step === 2 && <>
            {renderInput('code', 'text', 'Enter Confirmation Code')}
            <button onClick={confirm} className={buttonClass}>Verify</button>
            <button disabled={!canResend} onClick={resendCode} className="text-green-300 text-sm underline disabled:opacity-50">
              {canResend ? 'Resend Code' : `Resend in ${resendTimer}s`}
            </button>
          </>}

          {step === 3 && <>
            {renderInput('email', 'text', 'Email Address')}
            <div className="relative">
              {renderInput('password', showPassword ? 'text' : 'password', 'Password')}
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-2 text-white/60 hover:text-white">
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <button onClick={login} className={buttonClass}>Login</button>
            <p className="text-sm text-center">Forgot password? <button onClick={() => setStep(4)} className="text-green-300 underline">Reset</button></p>
            <div className="mt-4 text-sm text-gray-300 text-center">
              Don’t have an account? <button onClick={() => setStep(1)} className="text-green-300 underline">Sign Up</button>
            </div>
            <div className="flex flex-col items-center mt-6">
              <div className="text-lg bg-gradient-to-r from-white to-green-300 text-transparent bg-clip-text">
                in association with
              </div>
              <a href="https://mitwpu.edu.in/" target="_blank" rel="noopener noreferrer">
                <img src={logo2Url} alt="Logo 2" className="h-12 mt-2 hover:scale-105 transition-transform" />
              </a>
            </div>
          </>}

          {step === 4 && <>
            {renderInput('email', 'text', 'Email Address')}
            <button onClick={requestReset} className={buttonClass}>Send Reset Code</button>
          </>}

          {step === 5 && <>
            {renderInput('code', 'text', 'Reset Code')}
            {renderInput('newPassword', 'password', 'New Password')}
            <button onClick={confirmReset} className={buttonClass}>Update Password</button>
          </>}
        </motion.div>
      </div>
    </div>
  );
}

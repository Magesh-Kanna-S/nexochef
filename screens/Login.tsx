
import React, { useState } from 'react';

interface LoginProps {
  onLoginComplete: (data: { method: 'Google' | 'Phone'; name: string; phone?: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginComplete }) => {
  const [phase, setPhase] = useState<'CHOICE' | 'PHONE_INPUT' | 'OTP_INPUT' | 'NAME_PROMPT'>('CHOICE');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [method, setMethod] = useState<'Google' | 'Phone'>('Google');

  const handleChoice = (m: 'Google' | 'Phone') => {
    setMethod(m);
    if (m === 'Phone') {
      setPhase('PHONE_INPUT');
    } else {
      setPhase('NAME_PROMPT');
    }
  };

  const handlePhoneSubmit = () => {
    if (phoneNumber.length >= 10) {
      setPhase('OTP_INPUT');
    }
  };

  const handleOtpVerify = () => {
    if (otp === '1234') { // Sample demo OTP
      setPhase('NAME_PROMPT');
    } else {
      alert("Invalid OTP. Try 1234");
    }
  };

  const handleFinalSubmit = () => {
    if (name.trim()) {
      onLoginComplete({ method, name, phone: phoneNumber });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col items-center justify-between p-8 animate-in fade-in duration-700">
      <div className="flex-1 flex flex-col items-center justify-center w-full space-y-12">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-emerald-200 dark:shadow-emerald-900/20">
            <i className="fa-solid fa-mortar-pestle text-white text-4xl"></i>
          </div>
          <h1 className="text-4xl font-black text-gray-800 dark:text-gray-100 tracking-tight">NexoChef</h1>
          <p className="text-gray-600 dark:text-gray-400 font-medium tracking-wide">Your Intelligent Kitchen Helper</p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          {phase === 'CHOICE' && (
            <>
              <button 
                onClick={() => handleChoice('Google')}
                className="w-full bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 py-4 rounded-2xl flex items-center justify-center gap-4 hover:border-emerald-500 dark:hover:border-emerald-500 transition-all active:scale-95 group"
              >
                <i className="fa-brands fa-google text-red-500 text-lg"></i>
                <span className="font-bold text-gray-800 dark:text-gray-100">Continue with Google</span>
              </button>
              <button 
                onClick={() => handleChoice('Phone')}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl flex items-center justify-center gap-4 shadow-xl shadow-emerald-200 dark:shadow-emerald-900/20 active:scale-95 transition-all"
              >
                <i className="fa-solid fa-phone text-lg"></i>
                <span className="font-bold">Login with Phone OTP</span>
              </button>
            </>
          )}

          {phase === 'PHONE_INPUT' && (
            <div className="space-y-4 animate-in slide-in-from-right duration-300">
              <input 
                type="tel" 
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="input-field"
              />
              <button 
                onClick={handlePhoneSubmit}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold active:scale-95 transition-all shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20"
              >
                Send OTP
              </button>
            </div>
          )}

          {phase === 'OTP_INPUT' && (
            <div className="space-y-4 animate-in slide-in-from-right duration-300">
              <p className="text-center text-sm font-bold text-gray-600 dark:text-gray-400">Enter the verification code (1234)</p>
              <input 
                type="text" 
                placeholder="OTP"
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="input-field text-center tracking-[1rem]"
              />
              <button 
                onClick={handleOtpVerify}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold active:scale-95 transition-all shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20"
              >
                Verify OTP
              </button>
            </div>
          )}

          {phase === 'NAME_PROMPT' && (
            <div className="space-y-4 animate-in slide-in-from-right duration-300">
              <p className="text-center text-sm font-bold text-gray-600 dark:text-gray-400">Welcome! Please enter your name to personalize your experience.</p>
              <input 
                type="text" 
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
              <button 
                onClick={handleFinalSubmit}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold active:scale-95 transition-all shadow-lg shadow-emerald-200 dark:shadow-emerald-900/20"
              >
                Complete Login
              </button>
            </div>
          )}
        </div>
      </div>

      <footer className="w-full py-8 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-emerald-600 dark:text-emerald-500 font-black tracking-widest text-[10px] uppercase">
          <i className="fa-solid fa-cube"></i>
          <span>Nexora Labs</span>
        </div>
        <p className="text-[10px] text-gray-500 dark:text-gray-500 font-bold">
          © 2025 Nexora. All Rights Reserved. <br/>
          NexoChef is a registered product of Nexora.
        </p>
      </footer>
    </div>
  );
};

export default Login;

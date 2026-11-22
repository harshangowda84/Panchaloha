import React, { useState } from 'react';
import { X, User, Lock, Mail, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: { name: string; email: string }) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      onLoginSuccess({
        name: name || email.split('@')[0],
        email: email
      });
      onClose();
    }
  };

  const handleQuickDemo = () => {
    onLoginSuccess({
      name: 'Sophia Laurent',
      email: 'sophia.laurent@private-client.com'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="relative w-full max-w-md bg-white shadow-2xl p-8 sm:p-10 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-black transition-colors"
        >
          <X className="w-5 h-5 stroke-[1.5]" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-8">
          <span className="font-serif text-3xl tracking-[0.2em] font-light uppercase text-neutral-900 block mb-1">
            PANCHALOHA
          </span>
          <p className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
            Private Client Portal
          </p>
        </div>

        {/* 1-Click Demo Login Pill */}
        <div className="mb-6 p-3 bg-[#F9F9F8] border border-neutral-200 text-center">
          <p className="text-xs text-neutral-500 mb-2">Want to test the private client experience?</p>
          <button
            onClick={handleQuickDemo}
            className="w-full py-2 bg-neutral-900 text-white hover:bg-black text-[11px] uppercase tracking-[0.18em] transition-colors"
          >
            1-Click Demo Client: Sophia Laurent
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-6">
          <div className="flex-grow border-t border-neutral-200"></div>
          <span className="flex-shrink mx-4 text-[10px] uppercase tracking-widest text-neutral-400">Or continue with</span>
          <div className="flex-grow border-t border-neutral-200"></div>
        </div>

        {/* Sign In / Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Camille Duprès"
                  className="w-full pl-9 pr-3 py-2.5 border border-neutral-300 text-xs focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@domain.com"
                className="w-full pl-9 pr-3 py-2.5 border border-neutral-300 text-xs focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-wider text-neutral-500 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-neutral-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 border border-neutral-300 text-xs focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 bg-black text-white hover:bg-neutral-800 text-xs uppercase tracking-[0.2em] font-medium transition-colors flex items-center justify-center space-x-2"
          >
            <span>{isRegister ? 'Create Account' : 'Sign In'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Toggle between Login and Register */}
        <div className="text-center mt-6 text-xs text-neutral-500">
          {isRegister ? (
            <span>
              Already a member?{' '}
              <button
                onClick={() => setIsRegister(false)}
                className="text-black underline font-medium hover:text-neutral-700"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              New client?{' '}
              <button
                onClick={() => setIsRegister(true)}
                className="text-black underline font-medium hover:text-neutral-700"
              >
                Create Account
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

import { FormEvent, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/navbar';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function LoginPage() {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (mode === 'signin') await signInWithEmail(email, password);
    else await signUpWithEmail(email, password);
  };

  return (
    <div className={`${poppins.className} relative min-h-screen`}>
      <div className="absolute inset-0 -z-10" style={{
        backgroundImage: "radial-gradient(#d9d9d9 1.55px, transparent 1.55px), radial-gradient(#d9d9d9 1.55px, #f2f2f2 1.55px)",
        backgroundSize: "62px 62px",
        backgroundPosition: "0 0, 31px 31px",
      }} />
      <Navbar />
      <main className="p-6 pt-32">
        <div className="max-w-sm mx-auto space-y-4">
          <h1 className="text-xl font-semibold">Login</h1>
          <button onClick={signInWithGoogle} className="w-full border rounded p-2 hover:bg-gray-50">Continue with Google</button>
          <div className="text-center text-sm text-gray-500">or</div>
          <form onSubmit={onSubmit} className="space-y-2">
            <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input className="w-full border p-2 rounded" placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button className="w-full bg-blue-600 text-white rounded p-2 hover:bg-blue-700">{mode === 'signin' ? 'Sign In' : 'Sign Up'}</button>
          </form>
          <div className="text-sm text-gray-600">
            {mode === 'signin' ? (
              <button className="underline" onClick={()=>setMode('signup')}>Create an account</button>
            ) : (
              <button className="underline" onClick={()=>setMode('signin')}>Have an account? Sign in</button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

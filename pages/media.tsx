import { useEffect } from 'react';
import Navbar from '../components/navbar';
import { Poppins } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '500', '600'],
});

const Media = () => {
  // Load the Elfsight script only on the client side to prevent slow loading and hydration issues
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className={`${poppins.className} relative`}>
      {/* Background styling */}
      <div 
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(#f2f2f2 1.55px, transparent 1.55px), radial-gradient(#f2f2f2 1.55px, #f2f2f2 1.55px)",
          backgroundSize: "62px 62px",
          backgroundPosition: "0 0, 31px 31px",
        }}
      />
      
      <Navbar />
      <main className="p-10 pt-32 text-center">
        <h1 className="text-7xl font-bold mt-5 text-[#396d93]">Media</h1>
        <p className="text-[#829cb0] font-medium text-3xl p-3">
          Check out our media through our socials and more!
        </p>
      </main>

      {/* Elfsight widget container */}
      <div className="elfsight-app-832c6128-92d1-460a-8580-0dbec9aa21fb"></div>
      
      {/* Analytics */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default Media;

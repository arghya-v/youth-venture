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
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const script = document.createElement('script');
      script.src = "https://embedsocial.com/cdn/ht.js";
      script.id = "EmbedSocialHashtagScript";
      script.async = true;
      document.head.appendChild(script);
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
      <main className="p-4 pt-20 md:p-10 md:pt-32 text-center">
        <h1 className="text-4xl md:text-7xl font-bold mt-5 text-[#396d93]">Media</h1>
        <p className="text-[#829cb0] font-medium text-xl md:text-3xl p-2 md:p-3">
          Check out our media through our socials and more!
        </p>
      </main>

      {/* EmbedSocial widget */}
      <div className="embedsocial-hashtag" data-ref="f12de9c38d249c50cbf8ea8d9d586d9a038dc274">
        <a className="feed-powered-by-es feed-powered-by-es-feed-img es-widget-branding" 
           href="https://embedsocial.com/social-media-aggregator/" 
           target="_blank" 
           title="Instagram widget">
          <img src="https://embedsocial.com/cdn/icon/embedsocial-logo.webp" alt="EmbedSocial" />
          <div className="es-widget-branding-text">Instagram widget</div>
        </a>
      </div>

      {/* Analytics */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default Media;

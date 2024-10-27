import Navbar from '../components/navbar';
import { Poppins } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '500', '600'],
});

const Media = () => {
  return (
    <div className={`${poppins.className} relative`}>
        <div className="fixed inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(#e5e5f7 1.55px, transparent 1.55px), radial-gradient(#e5e5f7 1.55px, #e5e5f7 1.55px)",
            backgroundSize: "62px 62px", // Adjust this size as needed
            backgroundPosition: "0 0, 31px 31px",
          }}
        />

      <Navbar />
      <main className="p-10 pt-32 text-center"> 
      <h1 className="text-7xl font-bold mt-5 text-[#5474a5]">Media</h1>
      <p className="text-[#828282] font-medium text-3xl p-3">
           Check out our media coming soon through our socials and more!
        </p>
      </main>
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default Media;
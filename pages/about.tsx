import Navbar from '../components/navbar';
import { Poppins } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '500', '600'],
});

const About = () => {
  return (
    <div className={`${poppins.className} relative`}>
      <Navbar />
      <main className="p-10 pt-32 text-center"> 
        <h1 className="text-8xl font-semibold mt-20">
            Coming Soon...
        </h1>
      </main>
      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default About;

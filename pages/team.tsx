import Navbar from '../components/navbar';
import { Poppins } from 'next/font/google';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from '@vercel/speed-insights/next';
import Members from '../components/members';
import MailingList from '@/components/MailingList';
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '500', '600'],
});

const Team = () => {
  return (
    <div className={`${poppins.className} relative`}>
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
      
      {/* Meet the Team Header */}
      <div className="text-center my-10">
        <h2 className="text-4xl font-bold text-[#396d93]">Meet the Team!</h2>
      </div>

      <Members/>
      <Analytics />
      <SpeedInsights />
      <MailingList />
    </div>
  );
};


export default Team;
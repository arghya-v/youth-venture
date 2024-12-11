import Navbar from "../components/navbar";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "500", "600"],
});

const Event = () => {
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
        <h1 className="text-4xl md:text-7xl font-bold mt-5 text-[#396d93]">Our First Event!</h1>
        <p className="text-[#829cb0] font-medium text-xl md:text-3xl p-2 md:p-3">
          Join us to learn how YOU can start a business!
        </p>
        
        {/* Sign Up Button */}
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSf6LM8j1_Mze0VEWEVSwfby5M7pgmc_WJDlUIqIk_xvNxJRuA/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 px-6 py-3 bg-[#396d93] text-white text-lg font-semibold rounded-lg shadow-md hover:bg-[#2d5472] transition duration-300"
        >
          Sign Up Now!
        </a>

        <h2 className="text-4xl md:text-5xl font-bold mt-12 text-[#396d93]">
          About the event:
        </h2>
        <p className="text-[#829cb0] font-medium text-xl md:text-3xl p-3 md:p-3">
          Date: December 15th 4:30 - 6:30 PM<br></br>
          Featuring students...
        </p>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="p-4 border rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-bold text-[#396d93]">Fiona Chen</h3>
            <p className="text-[#829cb0] font-medium">Queen's Smith School of Business</p>
          </div>
          <div className="p-4 border rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-bold text-[#396d93]">Emma Thompson</h3>
            <p className="text-[#829cb0] font-medium">McMaster DeGroote</p>
          </div>
          <div className="p-4 border rounded-lg shadow-lg bg-white">
            <h3 className="text-2xl font-bold text-[#396d93]">Keerthi Bomidi</h3>
            <p className="text-[#829cb0] font-medium">Wilfrid Laurier Lazardis</p>
          </div>
        </div>

        {/* Schedule Image */}
        <div className="mt-12">
          <img
            src="/Schedule.png"
            alt="Event Schedule"
            className="mx-auto w-full max-w-4xl rounded-lg shadow-lg"
          />
        </div>
      </main>

      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default Event;
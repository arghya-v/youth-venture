import Navbar from "../components/navbar";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { FiChevronDown } from "react-icons/fi";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "500", "600"],
});

const About = () => {
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
      <main className="pt-32 md:pt-40 mt-6 text-center">
        <h1 className="text-4xl md:text-7xl lg:text-7xl font-bold mt-2 text-[#396d93]">
          Who We Are
        </h1>
        <FiChevronDown
          size={36}
          className="text-[#396d93] mt-6 mx-auto animate-bounce opacity-70"
        />

        {/* First Section */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-0 py-12 bg-[#f2f2f2]">
          <div className="bg-[#34546b] flex-1 p-8 md:p-10 flex items-center justify-center">
            <h2 className="text-5xl md:text-6xl lg:text-8xl font-semibold text-center md:text-left text-white">
              Our <br /> Goals
            </h2>
          </div>
          <div className="bg-[#34546b] flex-1 p-8 md:p-16 text-lg md:text-2xl text-white flex items-center justify-center">
            <p className="text-center md:text-right max-w-lg">
              Our goals are to engage youth in the world of business by
              fostering connections between students, providing valuable
              networking opportunities, and promoting the growth of innovative
              thinking. Through these initiatives, we aim to inspire and empower
              the next generation of leaders and entrepreneurs.
            </p>
          </div>
        </div>

        {/* Second Section */}
        <div className="flex flex-col md:flex-row items-center justify-center bg-[#f2f2f2] mt-2 gap-8">
          <div className="bg-[#f2f2f2] w-full md:w-1/2 flex items-center md:justify-start">
            <p className="text-lg md:text-2xl text-[#34546b] max-w-lg text-center md:text-left p-8 md:p-8 md:ml-auto md:mr-8">
              We want to empower participants by giving them the skills, tools,
              and assistance they need to turn their ideas into profitable
              companies. We create a community that promotes innovation,
              creativity, and the confidence to pursue entrepreneurial goals
              through dynamic and hands-on experiences.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex items-center justify-center md:justify-end">
            <h3 className="p-6 md:p-10 text-5xl md:text-6xl lg:text-8xl font-semibold text-[#34546b] mt-4 md:mt-2 text-center md:text-right md:mr-28">
              Our <br /> Mission
            </h3>
          </div>
        </div>
      </main>

      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default About;

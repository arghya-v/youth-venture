import { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "500", "600"],
});

const Home = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className={`${poppins.className} relative min-h-screen`}>
      {/* Conditional rendering to avoid hydration issues */}
      {isClient && (
        <div
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(#aeaebf 1.55px, transparent 1.55px), radial-gradient(#aeaebf 1.55px, #e5e5f7 1.55px)",
            backgroundSize: "62px 62px",
            backgroundPosition: "0 0, 31px 31px",
          }}
        />
      )}

      {/* Main Content */}
      <Navbar />
      <main className="p-10 pt-32 text-center">
        <h1 className="text-8xl font-semibold mt-20">
          We are <br />
          <span className="text-[#5474a5] font-bold">Youth Venture</span>
        </h1>
        <p className="text-[#828282] font-medium text-3xl p-3">
          A student-led non-profit organization <br />
          dedicated to fostering passion for business.
        </p>
      </main>

      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default Home;

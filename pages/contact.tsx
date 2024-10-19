import { AiFillLinkedin, AiFillInstagram, AiOutlineMail } from "react-icons/ai";
import Navbar from "../components/navbar";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ContactUsForm from "@/components/contactform";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "500", "600"],
  display: "swap", // Ensures font swap to prevent layout shift
});

const Contact = () => {
  return (
    <div className={`${poppins.className} relative min-h-screen`}>
      {/* Preload the background without waiting for isClient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(#e5e5f7 1.55px, transparent 1.55px), radial-gradient(#e5e5f7 1.55px, #e5e5f7 1.55px)",
          backgroundSize: "62px 62px",
          backgroundPosition: "0 0, 31px 31px",
        }}
      />

      {/* Main Content */}
      <Navbar />
      <main className="p-10 pt-32 text-center">
        <h1 className="text-7xl font-bold mt-5 text-[#5474a5]">Contact Us</h1>
        <p className="text-[#828282] font-medium text-3xl p-3">
          Feel free to contact us through the form below for any inquiries or
          concerns. <br /> We will get back to you as soon as possible!
        </p>
        <ContactUsForm />
        <p className="text-[#828282] font-medium text-2xl p-2">Or Visit our Socials!</p>

        {/* Social Media Icons with fixed sizes to avoid CLS */}
        <div className="flex justify-center gap-10 mt-3">
          <div className="icon-wrapper" style={{ width: "100px", height: "100px" }}>
            <a
              href="https://www.linkedin.com/company/youth-venture-international/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <AiFillLinkedin
                size={100}
                style={{ color: "#5474a5", transition: "opacity 0.3s" }}
                className="hover:opacity-75"
              />
            </a>
          </div>
          <div className="icon-wrapper" style={{ width: "100px", height: "100px" }}>
            <a
              href="https://www.instagram.com/youth.venture_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <AiFillInstagram
                size={100}
                style={{ color: "#5474a5", transition: "opacity 0.3s" }}
                className="hover:opacity-75"
              />
            </a>
          </div>
          <div className="icon-wrapper" style={{ width: "100px", height: "100px" }}>
            <a href="mailto:youthventureint@gmail.com" aria-label="Email">
              <AiOutlineMail
                size={100}
                style={{ color: "#5474a5", transition: "opacity 0.3s" }}
                className="hover:opacity-75"
              />
            </a>
          </div>
        </div>
      </main>

      <Analytics />
      <SpeedInsights />
    </div>
  );
};

export default Contact;

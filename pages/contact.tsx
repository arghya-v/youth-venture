import { AiFillLinkedin, AiFillInstagram, AiOutlineMail } from "react-icons/ai";
import Navbar from "../components/navbar";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ContactUsForm from "@/components/contactform";
import Head from "next/head";
import { useEffect, useState } from "react";

// Configure Poppins font to prevent layout shifts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const Contact = () => {
  const [hydrated, setHydrated] = useState(false);

  // Ensure the component is fully hydrated before rendering to avoid Next.js hydration issues
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null; // Avoid rendering during hydration mismatch

  return (
    <>
      <Head>
        {/* Preload background to prevent shifts */}
        <link
          rel="preload"
          as="image"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' fill='%23e5e5f7'/>"
        />
      </Head>

      <div className={`flex flex-col min-h-screen ${poppins.className}`}>
        {/* Background Layer */}
        <div
          className="fixed inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(#f2f2f2 1.55px, transparent 1.55px), radial-gradient(#f2f2f2 1.55px, #f2f2f2 1.55px)",
            backgroundSize: "62px 62px", // Adjust this size as needed
            backgroundPosition: "0 0, 31px 31px",
          }}
        />

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow p-10 pt-32 text-center">
          <h1 className="text-7xl font-bold mt-5 text-[#396d93]">Contact Us</h1>
          <p className="text-[#829cb0] font-medium text-3xl p-3">
            Feel free to contact us through the form below for any inquiries or concerns.
            <br /> We will get back to you as soon as possible!
          </p>

          <ContactUsForm />

          <p className="text-[#828282] font-medium text-2xl p-2">Or Visit our Socials!</p>

          {/* Social Media Icons */}
          <div className="flex justify-center gap-8 mt-5 flex-wrap">
            {[
              {
                href: "https://www.linkedin.com/company/youth-venture-international/posts/?feedView=all",
                label: "LinkedIn",
                Icon: AiFillLinkedin,
              },
              {
                href: "https://www.instagram.com/youth.venture_/",
                label: "Instagram",
                Icon: AiFillInstagram,
              },
              {
                href: "mailto:youthventureint@gmail.com",
                label: "Email",
                Icon: AiOutlineMail,
              },
            ].map(({ href, label, Icon }) => (
              <div key={label} className="icon-wrapper">
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon
                    size={100}
                    style={{ color: "#396d93", transition: "opacity 0.3s" }}
                    className="hover:opacity-75"
                  />
                </a>
              </div>
            ))}
          </div>
        </main>

        {/* Analytics and Speed Insights */}
        <Analytics />
        <SpeedInsights />
      </div>

      {/* Global CSS for icons */}
      <style jsx global>{`
        .icon-wrapper {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-wrapper:hover {
          background-color: #f0f4f8;
          border-radius: 12px;
        }
      `}</style>
    </>
  );
};

export default Contact;

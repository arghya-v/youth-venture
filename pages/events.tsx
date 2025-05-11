import Navbar from "../components/navbar";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import MailingList from "@/components/MailingList";
import Image from "next/image";
import { useState } from "react";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "500", "600"],
});

const EventPage = () => {
  const [activeEvent, setActiveEvent] = useState<null | "first-event">(null);

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
        {/* Upcoming Event */}
        <h1 className="text-5xl md:text-7xl font-bold text-[#396d93] mb-6">
          Upcoming Event
        </h1>
        <hr className="border-t border-gray-300 my-20 w-3/4 mx-auto" />
        <p className="text-xl md:text-3xl text-[#829cb0] mb-6">
  A Guide to a Successful Scholarship Webinar 🎓

</p>
<p className="text-lg md:text-xl text-[#829cb0] mb-4">
  📅 Saturday, May 24<sup>th</sup>, 2025<br />
  🕓 4:00PM – 5:30PM EST
</p>

{/* Event Features in Cards */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 max-w-4xl mx-auto">
  {[
    " 🎙 Panel discussion with past scholarship winners",
    " 💬 Mock interview",
    " 📝 Free application/resume edit",
  ].map((item, index) => (
    <div
      key={index}
      className="bg-white rounded-lg p-4 shadow hover:shadow-md transition border text-[#396d93] text-base font-medium"
    >
      {item}
    </div>
  ))}
</div>

<a
  href="https://docs.google.com/forms/d/1U91eAF4JI7qG5MbWBkCS7wM3RjqyyqV0u7iVJuyxIyc/preview?pli=1"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block bg-[#396d93] hover:bg-[#2d5472] text-white font-semibold py-3 px-6 rounded-xl transition duration-200"
>
  Register Now
</a>

{/* Subtle divider line before past events */}
<hr className="border-t border-gray-300 my-20 w-3/4 mx-auto" />

        {/* Past Events Section with gray background */}
        <div className="bg-[#E5E5E5] py-12 px-4 md:px-10 mt-20 rounded-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-[#396d93] text-center mb-10">
            Past Events
          </h2>

          {/* Cards Grid */}
          <div className="flex justify-center max-w-5xl mx-auto">
            <div
              className="bg-white rounded-xl shadow-md p-6 cursor-pointer hover:shadow-lg transition"
              onClick={() => setActiveEvent("first-event")}
            >
              <h3 className="text-2xl font-bold text-[#396d93]">Our First Event</h3>
              <p className="text-[#829cb0] mt-2">
                December 15th, 2024 · 4:30–6:30 PM EST
              </p>
            </div>
          </div>
        </div>

        {/* Expanded Modal */}
        {activeEvent === "first-event" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-5xl w-full overflow-y-auto max-h-[90vh] p-6 relative">
              <button
                onClick={() => setActiveEvent(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl font-bold"
              >
                &times;
              </button>
              <h3 className="text-3xl md:text-4xl font-bold text-[#396d93] mb-4">
                Our First Event
              </h3>
              <p className="text-xl text-[#829cb0] mb-4">
                Date: December 15th, 2024 · 4:30 – 6:30 PM EST
              </p>
              <p className="text-[#829cb0] text-lg mb-6">
                Join us to learn how YOU can start a business!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <div className="p-4 border rounded-lg shadow bg-white">
                  <h4 className="text-xl font-bold text-[#396d93]">Fiona Chen</h4>
                  <p className="text-[#829cb0]">Queens Smith School of Business</p>
                </div>
                <div className="p-4 border rounded-lg shadow bg-white">
                  <h4 className="text-xl font-bold text-[#396d93]">Emma Thompson</h4>
                  <p className="text-[#829cb0]">McMaster DeGroote</p>
                  <Image
                    src="/Emma_Thompson.jpeg"
                    alt="Emma Thompson"
                    width={200}
                    height={200}
                    className="mx-auto rounded-full mt-4"
                  />
                </div>
                <div className="p-4 border rounded-lg shadow bg-white">
                  <h4 className="text-xl font-bold text-[#396d93]">Keerthi Bomidi</h4>
                  <p className="text-[#829cb0]">Wilfrid Laurier Lazaridis</p>
                  <Image
                    src="/Keerthi_Bomidi.jpeg"
                    alt="Keerthi Bomidi"
                    width={200}
                    height={200}
                    className="mx-auto rounded-full mt-4"
                  />
                </div>
                <div className="p-4 border rounded-lg shadow bg-white">
                  <h4 className="text-xl font-bold text-[#396d93]">Leo Bai</h4>
                  <p className="text-[#829cb0]">Western Ivey Business School</p>
                </div>
              </div>

              {/* Isabella Ruan */}
              <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                <Image
                  src="/Isabella_Ruan.png"
                  alt="Isabella Ruan"
                  width={200}
                  height={200}
                  className="rounded-full"
                />
                <div className="text-center md:text-left">
                  <h5 className="text-xl font-bold text-[#396d93]">Isabella Ruan</h5>
                  <p className="text-[#829cb0] mb-2">
                    <a
                      href="https://www.etsy.com/ca/shop/DaisyStems"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#396d93] underline hover:text-[#2d5472] transition"
                    >
                      Visit Daisy Stems on Etsy
                    </a>
                  </p>
                  <p className="text-[#829cb0] text-sm leading-relaxed">
                    From sculpting Play-Doh figurines in kindergarten to reaching over two
                    thousand sales in her own ceramics shop as a high school student,
                    Isabella Ruan’s entrepreneurship journey is truly inspiring.
                  </p>
                </div>
              </div>

              <Image
                src="/Schedule.png"
                alt="Event Schedule"
                width={700}
                height={700}
                className="mx-auto w-full max-w-4xl rounded-lg shadow-lg"
              />
            </div>
          </div>
        )}
      </main>

      <Analytics />
      <SpeedInsights />
      <MailingList />
    </div>
  );
};

export default EventPage;

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
  const [selectedSpeaker, setSelectedSpeaker] = useState<null | string>(null);

  const speakers = [
    {
      name: "Daisy Bains",
      image: "/Daisy_Bains.png",
      description: `Daisy is the president of a racial equity collective at her school, organizing countless community events, fundraisers, and anti-racism workshops. She is the senior coach and founder of a traditional dance team at her school and the vice-president of an investing program. She was named a 25’ Loran Award Recipient in March 2025.`,
    },
    {
      name: "Sanay Sood",
      image: "/Sanay_Sood.png",
      description: `Sanay is the editor-in-chief of his school newspaper and chapter president of a club promoting careers in health sciences through conferences and competitions. He is the vice-chair of a regional committee that raises funds for humanitarian causes through events for high school students. He works part time as a lifeguard and aquatic instructor with his city, and volunteers at a local food bank. Sanay is passionate about bagpiping, both as a soloist and with a regional police pipe band.`,
    },
    {
      name: "Judy Fiebig",
      image: "/Judy_Fiebig.png",
      description: `Judy Fiebig is a successful scholarship consultant who works with young people across Canada. Her unique and effective leadership program trains students to develop their passions and skills and to ultimately achieve their goals in winning scholarships. On average, Judy's clients win $10,000 in scholarships, bursaries and grants.`,
    },
  ];

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

        {/* Speakers Grid */}
        <div className="mt-20 max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-[#396d93] mb-6">Meet Our Guests</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {speakers.map((speaker) => (
              <div
                key={speaker.name}
                className="cursor-pointer p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
                onClick={() => setSelectedSpeaker(speaker.name)}
              >
                <Image
                  src={speaker.image}
                  alt={speaker.name}
                  width={250}
                  height={250}
                  className="rounded-xl object-cover w-[250px] h-[250px] mx-auto mb-4"
                />
                <h4 className="text-xl font-semibold text-[#396d93]">{speaker.name}</h4>
              </div>
            ))}
          </div>
        </div>
        <br></br>
        <br></br>
            <a
          href="https://docs.google.com/forms/d/1U91eAF4JI7qG5MbWBkCS7wM3RjqyyqV0u7iVJuyxIyc/preview?pli=1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[#396d93] hover:bg-[#2d5472] text-white font-semibold py-3 px-6 rounded-xl transition duration-200"
        >
          Register Now
        </a>

        <div className="mt-12 max-w-3xl mx-auto text-left">
  <h3 className="text-3xl font-bold text-[#396d93] mb-6 text-center">
    Timeline
  </h3>
  <ul className="space-y-4 text-[#829cb0] text-lg text-center">
    <li>
      <span className="font-semibold text-[#396d93]">Scholarship Introduction:</span> 4:00 pm – 4:15 pm
    </li>
    <li>
      <span className="font-semibold text-[#396d93]">Workshop Speaker: Judy Fiebig</span> 4:15 pm – 4:40 pm
    </li>
    <li>
      <span className="font-semibold text-[#396d93]">Loran Panel + Q&amp;A:</span> 4:40 pm – 5:00 pm
    </li>
    <li>
      <span className="font-semibold text-[#396d93]">Mock Interview:</span> 5:00 pm – 5:20 pm
    </li>
    <li>
      <span className="font-semibold text-[#396d93]">Closing:</span> 5:20 pm – 5:30 pm
    </li>
  </ul>
</div>
        {/* Modal for speaker details */}
        {selectedSpeaker && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative">
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl font-bold"
              >
                &times;
              </button>
              {speakers
                .filter((s) => s.name === selectedSpeaker)
                .map((speaker) => (
                  <div key={speaker.name}>
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      width={200}
                      height={200}
                      className="rounded-xl object-cover w-[250px] h-[250px] mx-auto mb-4"
                    />
                    <h3 className="text-2xl font-bold text-[#396d93] mb-2 text-center">
                      {speaker.name}
                    </h3>
                    <p className="text-[#829cb0] text-center">{speaker.description}</p>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Past Events Section */}
        <hr className="border-t border-gray-300 my-20 w-3/4 mx-auto" />
        <div className="bg-[#E5E5E5] py-12 px-4 md:px-10 mt-20 rounded-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-[#396d93] text-center mb-10">
            Past Events
          </h2>
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
                {/* Existing speaker cards */}
              </div>

              {/* Isabella Ruan Section */}
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

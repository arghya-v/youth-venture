import React, { useState } from "react";
import { FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { IoClose } from "react-icons/io5";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700", "500"],
});

// Define a type for the team member
type TeamMemberType = {
  id: number;
  name: string;
  role: string;
  image: string;
  description: string[];
  linkedin: string;
  email: string;
};

const directors: TeamMemberType[] = [
  {
    id: 3,
    name: 'Chantal',
    role: 'Founder',
    image: '/team/chantal.jpg',
    description: [
      'Chantal is the co-founder of Youth Venture International, an organization dedicated to help students gain experience in the business and entrepreneurship world through workshops, events, competitions and more. Some of her hobbies include travelling, trying new foods/drinks and snowboarding!', 
      
    ],
    linkedin: 'https://www.linkedin.com/in/chantal-li-907b43244/',
    email: 'chantal248611@gmail.com',
  },
  {
    id: 4,
    name: 'Vicky',
    role: 'Founder',
    image: '/team/vicky.jpg',
    description: [
      'Vicky is a co-founder of Youth Venture and she is excited to share her passion for business and provide youth with hands-on experiences in the business world. You can find Vicky completing new arts and crafts projects, trying new desserts and browsing deals on Amazon in her free time!',
      
    ],
    linkedin: 'https://linkedin.com',
    email: 'youthventureint@gmail.com',
  },
  {
    id: 5,
    name: "Evelyn Tang",
    role: "Director of Logistics",
    image: "/team/Evelyn Tang.jpg",
    description: [
      "Evelyn, the Director of Logistics, dedicates her time to brainstorming innovative ideas for Youth Venture. In her free time, she plays competitive basketball, creates captivating videography pieces, and explores new ways to make a positive impact on the world. She is looking forward to working with her new team and can’t wait to see what the future holds for Youth Venture!",
    ],
    linkedin: "https://www.linkedin.com/in/evelyn-tang-08ab28320/",
    email: "levtktang@gmail.com",
  },
  {
    id: 6,
    name: "Gautam Goyal",
    role: "Director of Outreach",
    image: "/team/Gautam Goyal.jpg",
    description: [
      "Gautam is the Director of Outreach at Youth Venture this year, aiming to make business accessible to high school students worldwide through workshops, competitions and guest speaker panels. Gautam aspires to lead positive change in his community by actively engaging himself in organizations nationwide. As someone obsessed with finance, he serves as the Director of Academia for Target Alpha Canada, preparing educational materials centered around financial literacy for thousands of students. He is also heavily involved in his school community, currently serving as the Vice President for the Imaginons le Français Conference, Head of Finance for the Math and Computing Club and the SOAR Conference. In his free time, you can find Gautam playing badminton, catching up on finance news or sleeping!",
    ],
    linkedin: "https://www.linkedin.com/in/gautamgoyal9/",
    email: "cagautamgoel@gmail.com",
  },
  {
    id: 7,
    name: "Arghya Vyas",
    role: "Director of IT",
    image: "/team/arghya.jpg",
    description: [
      "Arghya helps to keep the website up to date. In his free time, he likes to play video games, basketball, and more! Arghya is very passionate about STEM and business, taking a part in creating his own food business and t-shirt business in middle school He also enjoys working with robotics, and has taken part in the First Robotics and Vex Robotics competitions.",
    ],
    linkedin: "https://www.linkedin.com/in/arghya-vyas-2a40a72b1/",
    email: "arghyavyas775@gmail.com",
  },
  {
    id: 8,
    name: "Isabella K",
    role: "Director of Logistics",
    image: "/team/Isabella K.jpg",
    description: [
      "Isabella, the other Director of Logistics, dedicates her time to brainstorming innovative ideas for Youth Venture alongside Evelyn.",
    ],
    linkedin: "https://www.linkedin.com/in/isabella-k-02545a325/",
    email: "horse3243323@gmail.com",
  },
  {
    id: 9,
    name: "Stephanie Cao",
    role: "Director of Marketing",
    image: "/team/Stephanie Cao.jpeg",
    description: [
      "Stephanie is the Director of Marketing at Youth Venture this year, she is responsible for crafting and executing strategic marketing initiatives that amplify Youth Venture’s mission and engage the audiences. Stephanie focuses on building cohesive and recognizable brands while leveraging analytics and creative approaches to expand Youth Venutre’s reach and inspire action.In Stephanie’s free time, she enjoys exploring the world of fashion and finding creative ways to merge my interests in business and branding. She loves staying updated on marketing trends and discovering how businesses create connections with their audiences.",
    ],
    linkedin: "https://www.linkedin.com",
    email: "scao2008@gmail.com",
  },
  {
    id: 10,
    name: "Olivia Zhen",
    role: "Director of Design",
    image: "/team/Olivia (1).jpg",
    description: [
      "Olivia designs Instagram posts and she helps manage Youth Venture’s social media account. When she’s not on the assignment grind, she likes reading, collecting stickers, and drinking (insanely overpriced) matcha lattes.",
    ],
    linkedin: "https://www.linkedin.com/in/olivia-zhen-24495a293/",
    email: "contactoliviazhen@gmail.com",
  },
  {
    id: 11,
    name: "Aanya",
    role: "Director of Conference",
    image: "/youthlogo.png",
    description: [
      "Aanya is the Director of Conference at Youth Venture, she is in charge of organizing and directing events for Youth Venture and ensuring everything runs smoothly. In her free time she loves to go on walks",
    ],
    linkedin: "https://www.linkedin.com",
    email: "youthventureint@gmail.com",
  },
];

const Members = () => {
  const [selectedMember, setSelectedMember] = useState<TeamMemberType | null>(null);

  return (
    <section className="bg-[#f2f2f2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-[#396d93] mb-10">
          Meet Our Team!
        </h2>

        {/* Grid Layout for Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {directors.map((member) => (
            <TeamMember key={member.id} member={member} onClick={() => setSelectedMember(member)} />
          ))}
        </div>

        {/* Modal for description */}
        {selectedMember && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-left relative">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-black"
                onClick={() => setSelectedMember(null)}
              >
                <IoClose size={24} />
              </button>
              <h3 className="text-xl font-bold">{selectedMember.name}</h3>
              <p className="text-gray-600 font-semibold">{selectedMember.role}</p>
              <div className="mt-3 text-gray-800 text-sm leading-relaxed">
                {selectedMember.description.map((line, index) => (
                  <p key={index} className="mb-2">{line}</p>
                ))}
              </div>
              {/* Social Icons */}
              <div className="flex space-x-4 mt-4">
                <a href={selectedMember.linkedin} className="text-blue-600 hover:text-blue-800">
                  <FaLinkedin size={24} />
                </a>
                <a href={`mailto:${selectedMember.email}`} className="text-gray-600 hover:text-gray-800">
                  <FaEnvelope size={24} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const TeamMember: React.FC<{ member: TeamMemberType; onClick: () => void }> = ({ member, onClick }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:scale-105 p-4 cursor-pointer text-center max-w-xs mx-auto ${poppins.className}`}
      onClick={onClick}
    >
      <Image
        src={member.image}
        alt={`${member.name} - ${member.role}`}
        width={300}
        height={375}
        className="w-full aspect-[4/5] object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold text-gray-800 mt-2">{member.name}</h3>
      <p className="text-xs text-gray-600">{member.role}</p>
    </div>
  );
};

export default Members;

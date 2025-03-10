import React from 'react';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Poppins } from 'next/font/google';
import Image from 'next/image';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '500'],
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
    id: 5,
    name: 'Evelyn Tang',
    role: 'Director of Logistics',
    image: '/team/Evelyn Tang.jpg',
    description: [
      'Evelyn, the Director of Logistics, dedicates her time to brainstorming innovative ideas for Youth Venture.', 
      'In her free time, she plays competitive basketball, creates captivating videography pieces, ', 
      'and explores new ways to make a positive impact on the world. She is looking forward to working with',
      'her new team and can’t wait to see what the future holds for Youth Venture!',
    ],
    linkedin: 'https://www.linkedin.com/in/chantal-li-907b43244/',
    email: 'mike@example.com',
  },
  {
    id: 6,
    name: 'Gautam Goyal',
    role: 'Director of Outreach',
    image: '/team/Gautam Goyal.jpg',
    description: [
      'Gautam is the Director of Outreach at Youth Venture this year, aiming to make business accessible to high school students worldwide through workshops, ',
        'competitions and guest speaker panels. Gautam aspires to lead positive change in his community by actively engaging',
      'himself in organizations nationwide. As someone obsessed with finance, he serves as the Director of Academia for Target Alpha Canada, preparing educational materials centered around',
      'financial literacy for thousands of students. He is also heavily involved in his school community, currently serving as the Vice President for the Imaginons le Français Conference, Head of ',
      'Finance for the Math and Computing Club and the SOAR Conference. In his free time, you can find Gautam playing badminton, catching up on finance news or sleeping!',
    ],
    linkedin: 'https://linkedin.com',
    email: 'sarah@example.com',
  },
];

// Update the prop type
const TeamMember: React.FC<{ member: TeamMemberType }> = ({ member }) => {
  return (
    <div
      className={`bg-[#f2f2f2] rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500 justify-center ${poppins.className}`}
    >
      <div className="flex flex-col items-center">
        <Image
          src={member.image}
          alt={`${member.name} - ${member.role}`}
          width={400}
          height={450}
          className="w-full h-[425px] object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
        <p className="text-sm text-gray-600 mb-4">{member.role}</p>
        {/* Render description with an array */}
        <div className="text-gray-700 mb-4 text-sm space-y-2">
          {member.description.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
        <div className="flex justify-center space-x-4">
          <a
            href={member.linkedin}
            className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
            aria-label={`${member.name}'s LinkedIn profile`}
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href={`mailto:${member.email}`}
            className="text-gray-600 hover:text-gray-800 transition-colors duration-300"
            aria-label={`Email ${member.name}`}
          >
            <FaEnvelope size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

const members = () => {
  return (
    <section
      className="bg-[#f2f2f2] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center"
      aria-labelledby="team-heading"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2
          id="team-heading"
          className="text-3xl font-extrabold text-[#396d93] mb-12"
        >
          Meet Our Founders!
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {directors.map((member) => (
            <TeamMember key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default members;

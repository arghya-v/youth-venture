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

const teamMembers: TeamMemberType[] = [
  {
    id: 3,
    name: 'Chantal',
    role: 'Founder',
    image: '/team/chantal.jpg',
    description: [
      'Chantal is the co-founder of Youth Venture International', 
      'an organization dedicated to helping students gain experience in the business', 
      'and entrepreneurship world through workshops, events, competitions, and more.',
      'Some of her hobbies include traveling, trying new foods/drinks, and snowboarding!',
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
      'Vicky is a co-founder of Youth Venture, and she is excited to share her passion',
       'for business and provide youth with hands-on experiences in the business world.',
      'You can find Vicky completing new arts and crafts projects, trying new desserts',
      'and browsing deals on Amazon in her free time.',
    ],
    linkedin: 'https://linkedin.com',
    email: 'youthventureint@gmail.com',
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

const Founders = () => {
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
          {teamMembers.map((member) => (
            <TeamMember key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Founders;

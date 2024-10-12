import Navbar from '../components/navbar';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700', '500', '600'],
});

const Home = () => {
  return (
    <div className={`${poppins.className} relative`}>
      <Navbar />
      <main className="p-10 pt-32 text-center"> {/* Add pt-32 for padding-top */}
        <h1 className="text-8xl font-semibold mt-20">
          We are <br />
          <span className="text-[#5474a5] font-bold">Youth Venture</span>
        </h1>
        <p className='text-[#828282] font-medium text-3xl p-3'>A student-led non profit organization <br />dedicated to fostering passion for business.</p>
      </main>
    </div>
  );
};

export default Home;

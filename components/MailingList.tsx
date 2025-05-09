import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const MailingList = () => {
  const [mail, setMail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const subscribe = async () => {
    if (!mail) return toast.error('Please enter a valid email.');
    setLoading(true);
    try {
      const result = await axios.put('/api/mailingList', { mail });
      if (result.status === 200) {
        toast.success(result.data.message);
        setMail('');
      }
    } catch (err) {
      console.error(err);
      toast.error(
        'There was a problem with your subscription. Please try again or contact us.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${poppins.className} py-20 px-6 md:px-20 bg-[#f2f2f2] text-center`}>
      <h2 className="text-4xl md:text-5xl font-bold text-[#396d93] mb-4">
        Stay Tuned!
      </h2>
      <p className="text-lg md:text-xl max-w-2xl mx-auto text-[#34546b] mb-8 leading-relaxed">
        Want to be the first to know when Youth Venture brings more exciting stuff? Sign up for the newsletter!
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
  <input
    value={mail}
    onChange={(e) => setMail(e.target.value)}
    type="email"
    placeholder="Enter your email"
    className="w-full max-w-xs px-5 py-3 rounded-full border border-[#396d93] focus:outline-none focus:ring-2 focus:ring-[#396d93] transition duration-200"
  />
  <button
    onClick={subscribe}
    className={`px-6 py-3 rounded-full font-semibold text-white transition duration-200 ${
      loading
        ? 'bg-[#396d93] opacity-70 cursor-not-allowed'
        : 'bg-[#396d93] hover:bg-[#34546b]'
    }`}
    disabled={loading}
  >
    I'm in!
  </button>
</div>

    </div>
  );
};

export default MailingList;

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa"; // LinkedIn icon
import { SiReact, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiGooglemaps } from "react-icons/si"; // Icons for technologies
import { RiPaypalFill } from "react-icons/ri"; // Razorpay icon (using PayPal as a placeholder)
import { GiArtificialIntelligence } from "react-icons/gi"; // Gemini icon (using AI as a placeholder)


const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
};

const cards = [
  {
    title: "Smart Cities",
    description: "Innovative urban planning for a sustainable future.",
    image: "https://via.placeholder.com/300",
  },
  {
    title: "Renewable Energy",
    description: "Harnessing clean energy for a greener tomorrow.",
    image: "https://via.placeholder.com/300",
  },
  {
    title: "Eco-Friendly Transport",
    description: "Sustainable mobility solutions for urban areas.",
    image: "https://via.placeholder.com/300",
  },
  {
    title: "Green Buildings",
    description: "Energy-efficient and environmentally friendly structures.",
    image: "https://via.placeholder.com/300",
  },
  {
    title: "Waste Management",
    description: "Effective waste disposal and recycling systems.",
    image: "https://via.placeholder.com/300",
  },
];

const AppleCardsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  // Duplicate cards to create a seamless loop
  const duplicatedCards = [...cards, ...cards, ...cards];

  const handleScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      const maxScroll = scrollWidth - clientWidth;

      // Reset scroll position to create a seamless loop
      if (scrollLeft >= maxScroll / 2) {
        carouselRef.current.scrollLeft = scrollLeft - maxScroll / 2;
      } else if (scrollLeft === 0) {
        carouselRef.current.scrollLeft = maxScroll / 2;
      }

      // Update current index based on scroll position
      const cardWidth = carouselRef.current.scrollWidth / duplicatedCards.length;
      setCurrentIndex(Math.round(carouselRef.current.scrollLeft / cardWidth) % cards.length);
    }
  };

  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto overflow-hidden p-4"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div
        className="flex overflow-x-scroll snap-x snap-mandatory scroll-smooth"
        ref={carouselRef}
        onScroll={handleScroll}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar
      >
        {duplicatedCards.map((card, index) => (
          <motion.div
            key={index}
            className="min-w-[300px] bg-white shadow-lg rounded-xl p-4 flex flex-col items-center mx-2 snap-start"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={card.image} alt={card.title} className="w-32 h-32 rounded-full mb-4" />
            <h3 className="text-lg font-bold text-emerald-700">{card.title}</h3>
            <p className="text-gray-600">{card.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const techElements = [
  { icon: <SiReact size={40} />, name: "React" },
  { icon: <SiTailwindcss size={40} />, name: "Tailwind CSS" },
  { icon: <SiNodedotjs size={40} />, name: "Node.js" },
  { icon: <SiExpress size={40} />, name: "Express.js" },
  { icon: <SiMongodb size={40} />, name: "MongoDB" },
 
  { icon: <GiArtificialIntelligence size={40} />, name: "Gemini" },
  { icon: <RiPaypalFill size={40} />, name: "Razorpay" },
  { icon: <SiGooglemaps size={40} />, name: "Google Maps" },
];

function Home() {
  const [tagline, setTagline] = useState("");
  const fullTagline = "Building Better Cities, Shaping Brighter Futures";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < fullTagline.length) {
        setTagline(fullTagline.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust typing speed here (100ms per letter)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-emerald-50">
      <div className="flex items-center justify-between w-full h-screen bg-emerald-50 p-10">
        <motion.div className="text-emerald-700 space-y-4 w-1/2 ml-16 font-sans" variants={slideInLeft} initial="hidden" animate="visible">
          <h1 className="text-6xl font-extrabold">CivicSphere</h1>
          <p className="text-xl" style={{ whiteSpace: "pre-wrap" }}>
            {tagline}
          </p>
          <div className="space-x-4">
            <motion.button whileHover={{ scale: 1.1 }} className="bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-2 rounded-md transition duration-300">
              Get Started
            </motion.button>
            <motion.button whileHover={{ scale: 1.1 }} className="bg-emerald-600 text-white hover:bg-emerald-700 px-4 py-2 rounded-md transition duration-300">
              Explore
            </motion.button>
          </div>
        </motion.div>
        <motion.div className="w-1/2" variants={slideInRight} initial="hidden" animate="visible">
          <motion.img src={''} alt="Sustainable Development" className="w-full h-full object-cover rounded-full" whileHover={{ scale: 1.05 }} />
        </motion.div>
      </div>

      {/* Author Section */}
      <div className="flex items-center justify-between w-full p-10 mt-16">
        <motion.div className="w-1/2 flex justify-center items-center" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="relative w-96 h-96 bg-emerald-600 rounded-t-full shadow-lg overflow-hidden">
            <motion.img src={''} alt="Coach or Author" className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} />
          </div>
        </motion.div>
        <motion.div className="w-1/2 ml-4 space-y-4" variants={slideInRight} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-4xl font-extrabold text-emerald-700">A Coach’s Vision on Sustainable Development</h2>
          <p className="text-lg text-emerald-700">
            "The future of our cities relies on sustainable development. We must build smarter, greener cities to foster harmony between people, nature, and technology."
          </p>
        </motion.div>
      </div>

      <AppleCardsCarousel />

      {/* Goals Section with Divider */}
      <div className="flex w-full p-10 mt-16">
        {/* Left Side */}
        <motion.div className="w-1/2 pr-8 space-y-8" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3 className="text-2xl font-extrabold text-emerald-700">Goal 1: No Poverty</h3>
          <p className="text-lg text-emerald-700">"End poverty in all its forms everywhere."</p>
          <h3 className="text-2xl font-extrabold text-emerald-700">Goal 2: Zero Hunger</h3>
          <p className="text-lg text-emerald-700">"End hunger, achieve food security and improve nutrition."</p>
        </motion.div>

        {/* Divider */}
        <div className="w-px bg-emerald-700 mx-8"></div>

        {/* Right Side */}
        <motion.div className="w-1/2 pl-8 space-y-8" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h3 className="text-2xl font-extrabold text-emerald-700">Goal 3: Good Health and Well-Being</h3>
          <p className="text-lg text-emerald-700">"Ensure healthy lives and promote well-being for all at all ages."</p>
          <h3 className="text-2xl font-extrabold text-emerald-700">Goal 4: Quality Education</h3>
          <p className="text-lg text-emerald-700">"Ensure inclusive and equitable quality education and lifelong learning."</p>
        </motion.div>
      </div>

      {/* Tech Elements Section */}
      <motion.div className="w-full p-10 mt-16 bg-white" initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1 } }} viewport={{ once: true }}>
        <div className="flex justify-center space-x-8">
          {techElements.map((tech, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-emerald-700">{tech.icon}</div>
              <p className="text-sm text-emerald-700 mt-2">{tech.name}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.footer className="bg-emerald-700 text-white py-8 mt-16" initial={{ opacity: 0 }} whileInView={{ opacity: 1, transition: { duration: 1 } }} viewport={{ once: true }}>
        <div className="container mx-auto px-6 text-center">
          <div className="space-x-6 mb-6 flex justify-center items-center">
            <a href="https://www.linkedin.com/in/siripuramakash/" target="_blank" rel="noopener noreferrer" className="text-lg hover:underline flex items-center">
              <FaLinkedin className="mr-2" /> Akash Siripuram
            </a>
            <a href="https://www.linkedin.com/in/akashgarine/" target="_blank" rel="noopener noreferrer" className="text-lg hover:underline flex items-center">
              <FaLinkedin className="mr-2" /> Akash Garine
            </a>
            <a href="https://www.linkedin.com/in/siridevoju/" target="_blank" rel="noopener noreferrer" className="text-lg hover:underline flex items-center">
              <FaLinkedin className="mr-2" /> Siri Devoju
            </a>
            <a href="https://www.linkedin.com/in/sneha-muthyala-78594a280/" target="_blank" rel="noopener noreferrer" className="text-lg hover:underline flex items-center">
              <FaLinkedin className="mr-2" /> Sneha Muthyala
            </a>
          </div>
          <p className="text-sm">© 2025 CivicSphere. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
}

export default Home;
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa"; // LinkedIn icon
import { SiReact, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiGooglemaps } from "react-icons/si"; // Icons for technologies
import { RiPaypalFill } from "react-icons/ri"; // Razorpay icon (using PayPal as a placeholder)
import { GiArtificialIntelligence } from "react-icons/gi"; // Gemini icon (using AI as a placeholder)
import React from "react";

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
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSwz25vEGTqtU6uvqzOFA-rPUjkh-eo1z47_0FWk8U2uY_xJ0pBKtGxHw3N8ekRQOJesE&usqp=CAU",
  },
  {
    title: "Renewable Energy",
    description: "Harnessing clean energy for a greener tomorrow.",
    image: "https://static.vecteezy.com/system/resources/thumbnails/029/597/231/small/smconnect-smart-digital-city-ai-generated-photo.jpg",
  },
  {
    title: "Eco-Friendly Transport",
    description: "Sustainable mobility solutions for urban areas.",
    image: "https://media.istockphoto.com/id/1430212440/vector/green-industry-and-alternative-renewable-energy-green-eco-friendly-cityscape-background.jpg?s=612x612&w=0&k=20&c=8TgK7Wy2UwJ9rtYLSob4dFFfKq7gPCv7xTbwknEaRc0=",
  },
  {
    title: "Green Buildings",
    description: "Energy-efficient and environmentally friendly structures.",
    image: "https://media.istockphoto.com/id/1319911927/vector/green-energy-and-eco-city-background-ecology-and-environment-conservation-resource.jpg?s=612x612&w=0&k=20&c=NBxISKVw4zh-g7BZbGWhIc83XT3ivWzUISzBuBJWbUs=",
  },
  {
    title: "Waste Management",
    description: "Effective waste disposal and recycling systems.",
    image: "https://media.istockphoto.com/id/1318747527/vector/green-eco-city-background-ecology-and-environment-conservation-resource-sustainable-concept.jpg?s=612x612&w=0&k=20&c=IzAR7Dp_QMxv0DCFWZkO_BpF0g-2LBAUZxZCcMLIOKc=",
  },
];

const AppleCardsCarousel = () => {
  const carouselRef = useRef(null);

  // Duplicate cards to create a seamless loop
  const duplicatedCards = [...cards, ...cards, ...cards];

  useEffect(() => {
    const carousel = carouselRef.current;
    let animationFrameId;

    const scrollCarousel = () => {
      if (carousel) {
        carousel.scrollLeft += 1; // Move 1px per frame (approx 1cm per second at 60fps)
        if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
          carousel.scrollLeft = 0; // Reset to create a seamless loop
        }
      }
      animationFrameId = requestAnimationFrame(scrollCarousel);
    };

    scrollCarousel();

    return () => {
      cancelAnimationFrame(animationFrameId); // Cleanup animation frame
    };
  }, []);

  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto overflow-hidden p-4"
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div
        className="flex overflow-x-hidden"
        ref={carouselRef}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }} // Hide scrollbar
      >
        {duplicatedCards.map((card, index) => (
          <motion.div
            key={index}
            className="min-w-[300px] bg-white shadow-lg rounded-xl p-4 flex flex-col items-center mx-2"
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
          <motion.img src={'./2.png'} alt="Sustainable Development" className="w-full h-full object-cover rounded-full" whileHover={{ scale: 1.05 }} />
        </motion.div>
      </div>

      {/* Author Section */}
      <div className="flex items-center justify-between w-full p-10 mt-16">
        <motion.div className="w-1/2 flex justify-center items-center" variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="relative w-96 h-96 bg-emerald-600 rounded-t-full shadow-lg overflow-hidden">
            <motion.img src={'./1.jpg'} alt="Coach or Author" className="w-full h-full object-cover" whileHover={{ scale: 1.05 }} />
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

      {/*Goals Section with Subtle Green Background and Classy Motion*/}
      <div className="flex flex-col items-center w-full p-10 mt-16">
        {/* Title */}
        <motion.h2
          className="text-4xl font-extrabold text-emerald-700 mb-8"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          SDG 11 Goals
        </motion.h2>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-3 gap-8 w-full max-w-6xl mb-8"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Card 1: Projects */}
          <motion.div
            className="relative rounded-xl p-6 flex flex-col items-center text-center overflow-hidden"
            whileHover={{ rotateY: 10, rotateX: 10, scale: 1.05, transition: { duration: 0.5 } }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Subtle Green Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-emerald-100 opacity-80"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
                zIndex: -1,
              }}
            />
            <h3 className="text-2xl font-extrabold text-emerald-700 mb-4">Projects</h3>
            <motion.p
              className="text-lg text-emerald-700"
              animate={{
                y: [0, -5, 0],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              "Develop sustainable urban projects to improve infrastructure, housing, and public spaces."
            </motion.p>
          </motion.div>

          {/* Card 2: Resources */}
          <motion.div
            className="relative rounded-xl p-6 flex flex-col items-center text-center overflow-hidden"
            whileHover={{ rotateY: 10, rotateX: 10, scale: 1.05, transition: { duration: 0.5 } }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Subtle Green Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-emerald-100 opacity-80"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
                zIndex: -1,
              }}
            />
            <h3 className="text-2xl font-extrabold text-emerald-700 mb-4">Resources</h3>
            <motion.p
              className="text-lg text-emerald-700"
              animate={{
                y: [0, -5, 0],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              "Optimize resource allocation to ensure equitable access to water, energy, and sanitation."
            </motion.p>
          </motion.div>

          {/* Card 3: Issues */}
          <motion.div
            className="relative rounded-xl p-6 flex flex-col items-center text-center overflow-hidden"
            whileHover={{ rotateY: 10, rotateX: 10, scale: 1.05, transition: { duration: 0.5 } }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Subtle Green Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-emerald-100 opacity-80"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
                zIndex: -1,
              }}
            />
            <h3 className="text-2xl font-extrabold text-emerald-700 mb-4">Issues</h3>
            <motion.p
              className="text-lg text-emerald-700"
              animate={{
                y: [0, -5, 0],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              "Address urban challenges like pollution, congestion, and inadequate housing."
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Second Row */}
        <motion.div
          className="grid grid-cols-2 gap-8 w-full max-w-4xl"
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Card 4: Emergencies */}
          <motion.div
            className="relative rounded-xl p-6 flex flex-col items-center text-center overflow-hidden"
            whileHover={{ rotateY: 10, rotateX: 10, scale: 1.05, transition: { duration: 0.5 } }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Subtle Green Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-emerald-100 opacity-80"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
                zIndex: -1,
              }}
            />
            <h3 className="text-2xl font-extrabold text-emerald-700 mb-4">Emergencies</h3>
            <motion.p
              className="text-lg text-emerald-700"
              animate={{
                y: [0, -5, 0],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              "Enhance disaster preparedness and resilience to protect urban populations."
            </motion.p>
          </motion.div>

          {/* Card 5: Regional Development */}
          <motion.div
            className="relative rounded-xl p-6 flex flex-col items-center text-center overflow-hidden"
            whileHover={{ rotateY: 10, rotateX: 10, scale: 1.05, transition: { duration: 0.5 } }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Subtle Green Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-emerald-50 to-emerald-100 opacity-80"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                backgroundSize: "200% 200%",
                zIndex: -1,
              }}
            />
            <h3 className="text-2xl font-extrabold text-emerald-700 mb-4">Regional Development</h3>
            <motion.p
              className="text-lg text-emerald-700"
              animate={{
                y: [0, -5, 0],
                opacity: [0.9, 1, 0.9],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              "Promote balanced regional development to reduce inequalities between urban and rural areas."
            </motion.p>
          </motion.div>
        </motion.div>
      </div>

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
            <a href="https://www.linkedin.com/in/kruthin-reddy/" target="_blank" rel="noopener noreferrer" className="text-lg hover:underline flex items-center">
              <FaLinkedin className="mr-2" /> Kruthin Reddy
            </a>
          </div>
          <p className="text-sm">© 2025 CivicSphere. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
}

export default Home;

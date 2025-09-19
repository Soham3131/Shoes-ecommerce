


// import React from "react";
// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import b1 from "../assets/b1.jpg";
// import b2 from "../assets/b2.jpg";
// import b3 from "../assets/b3.jpg";
// import b4 from "../assets/b4.jpg";
// import b5 from "../assets/b5.jpg";
// import b6 from "../assets/b6.jpg";
// import b7 from "../assets/b7.jpg";

// const sections = [
//   {
//     id: "b1",
//     img: b1,
//     title: "The Art of Distinction",
//     text: "Experience the legacy of handcrafted excellence. Our formal leather shoes are a testament to timeless tradition and modern sophistication, meticulously crafted for the discerning gentleman.",
//   },
//   {
//     id: "b2",
//     img: b2,
//     title: "Elegance, Defined",
//     text: "For the modern icon who commands attention, our women's collection blends exquisite luxury with unparalleled grace. Designed for confident strides and unforgettable moments.",
//   },
//   {
//     id: "b3",
//     img: b3,
//     title: "Legacy in Every Stitch",
//     text: "Each pair is a masterpiece, painstakingly brought to life by master artisans. We use only the finest leathers and precise stitching, embodying a pursuit of perfection that is truly unrivaled.",
//   },
//   {
//     id: "b4",
//     img: b4,
//     title: "A Statement of Self",
//     text: "More than just footwear, our collection is an extension of your identity. From the boardroom to the grand ballroom, let every step you take narrate your story and define your legacy.",
//   },
//   {
//     id: "b5",
//     img: b5,
//     title: "Walk the Path of Authority",
//     text: "Engineered for leaders and visionaries, our shoes provide not just comfort, but a foundation of confidence. Leave a lasting impression wherever your ambition takes you.",
//   },
//   {
//     id: "b6",
//     img: b6,
//     title: "Crafted for Modern Living",
//     text: "Redefine everyday luxury with our premium sneakers and casuals for both men and women. They are meticulously designed to match your pace, style, and pursuit of comfort.",
//   },
//   {
//     id: "b7",
//     img: b7,
//     title: "The Pursuit of Perfection",
//     text: "From the rich texture of polished leather to the subtle elegance of every detail, Rohtak Shoe Company is dedicated to crafting a flawless experience, one pair at a time.",
//   },
// ];

// const PremiumShowcase = () => {
//   return (
//     <div className="bg-gradient-to-b from-[#f8f8f8] to-[#e8e8e8] text-[#2c3e50] font-serif overflow-hidden">
//       {/* Hero Section */}
//       <motion.section
//         className="h-screen flex flex-col justify-center items-center text-center px-6"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.5 }}
//       >
//         <motion.h1
//           className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tighter"
//           initial={{ y: -50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1, delay: 0.5 }}
//         >
//           Rohtak Shoe Company
//         </motion.h1>
//         <motion.p
//           className="text-lg md:text-2xl font-light max-w-3xl mx-auto italic"
//           initial={{ y: 50, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ duration: 1, delay: 0.8 }}
//         >
//           Where Heritage Meets High Fashion.
//         </motion.p>
//       </motion.section>

//       {/* Showcase Sections */}
//       {sections.map((section, index) => (
//         <section
//           key={section.id}
//           className={`grid grid-cols-1 md:grid-cols-2 min-h-screen items-center px-6 lg:px-20 py-20 gap-16 ${
//             index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#f0f0f0]"
//           }`} // Alternating background colors
//         >
//           {/* Text Content */}
//           <motion.div
//             className={`p-6 md:p-12 flex flex-col justify-center text-center md:text-left 
//                        ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`} // Text on left for even, right for odd
//             initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true, amount: 0.4 }}
//             transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
//           >
//             <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
//               {section.title}
//             </h2>
//             <p className="text-lg md:text-xl leading-relaxed mb-8 font-light text-[#576b7e]">
//               {section.text}
//             </p>
//             <motion.div
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.98 }}
//               className={
//                 index % 2 === 0 ? "md:self-start" : "md:self-end text-right"
//               } // Align button with text
//             >
//               <Link
//                 to="/products"
//                 className="inline-block px-12 py-5 bg-[#2c3e50] text-white rounded-full shadow-lg hover:bg-[#34495e] transition-colors duration-300 text-lg font-semibold tracking-wide"
//               >
//                 Explore Collection
//               </Link>
//             </motion.div>
//           </motion.div>

//           {/* Image */}
//           <motion.div
//             className={`flex justify-center items-center 
//                        ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`} // Image on right for even, left for odd
//             initial={{
//               opacity: 0,
//               scale: 0.9,
//               x: index % 2 === 0 ? 100 : -100,
//             }}
//             whileInView={{ opacity: 1, scale: 1, x: 0 }}
//             viewport={{ once: true, amount: 0.4 }}
//             transition={{ duration: 1.2, ease: "easeOut" }}
//           >
//             <motion.img
//               src={section.img}
//               alt={section.title}
//               className="w-full h-full object-cover rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105"
//               whileHover={{ scale: 1.05, rotate: -2 }}
//               transition={{ duration: 0.5 }}
//             />
//           </motion.div>
//         </section>
//       ))}
//     </div>
//   );
// };

// export default PremiumShowcase;

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import b1 from "../assets/b1.jpg";
import b2 from "../assets/b2.jpg";
import b3 from "../assets/b3.jpg";
import b4 from "../assets/b4.jpg";
import b5 from "../assets/b5.jpg";
import b6 from "../assets/b6.jpg";
import b7 from "../assets/b7.jpg";

const sections = [
  {
    id: "b1",
    img: b1,
    title: "The Art of Distinction",
    text: "Experience the legacy of handcrafted excellence. Our formal leather shoes are a testament to timeless tradition and modern sophistication, meticulously crafted for the discerning gentleman.",
  },
  {
    id: "b2",
    img: b2,
    title: "Elegance, Defined",
    text: "For the modern icon who commands attention, our women's collection blends exquisite luxury with unparalleled grace. Designed for confident strides and unforgettable moments.",
  },
  {
    id: "b3",
    img: b3,
    title: "Legacy in Every Stitch",
    text: "Each pair is a masterpiece, painstakingly brought to life by master artisans. We use only the finest leathers and precise stitching, embodying a pursuit of perfection that is truly unrivaled.",
  },
  {
    id: "b4",
    img: b4,
    title: "A Statement of Self",
    text: "More than just footwear, our collection is an extension of your identity. From the boardroom to the grand ballroom, let every step you take narrate your story and define your legacy.",
  },
  {
    id: "b5",
    img: b5,
    title: "Walk the Path of Authority",
    text: "Engineered for leaders and visionaries, our shoes provide not just comfort, but a foundation of confidence. Leave a lasting impression wherever your ambition takes you.",
  },
  {
    id: "b6",
    img: b6,
    title: "Crafted for Modern Living",
    text: "Redefine everyday luxury with our premium sneakers and casuals for both men and women. They are meticulously designed to match your pace, style, and pursuit of comfort.",
  },
  {
    id: "b7",
    img: b7,
    title: "The Pursuit of Perfection",
    text: "From the rich texture of polished leather to the subtle elegance of every detail, Rohtak Shoe Company is dedicated to crafting a flawless experience, one pair at a time.",
  },
];

const PremiumShowcase = () => {
  return (
    <div className="bg-gradient-to-b from-[#f8f8f8] to-[#e8e8e8] text-[#2c3e50] overflow-hidden">
      {/* Hero Section */}
      <motion.section
        className="h-screen flex flex-col justify-center items-center text-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tighter"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Rohtak Shoe Company
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl font-light max-w-3xl mx-auto italic"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          Where Heritage Meets High Fashion.
        </motion.p>
      </motion.section>

      {/* Showcase Sections */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          className={`grid grid-cols-1 md:grid-cols-2 min-h-screen items-center px-6 lg:px-20 py-20 gap-16 ${
            index % 2 === 0 ? "bg-[#ffffff]" : "bg-[#f0f0f0]"
          } ${index === sections.length - 1 ? "pb-40" : ""}`} // Added pb-40 for the last section
        >
          {/* Text Content */}
          <motion.div
            className={`p-6 md:p-12 flex flex-col justify-center text-center md:text-left 
                       ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}
            initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
              {section.title}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed mb-8 font-light text-[#576b7e]">
              {section.text}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className={
                index % 2 === 0 ? "md:self-start" : "md:self-end text-right"
              }
            >
              <Link
                to="/products"
                className="inline-block px-12 py-5 bg-[#2c3e50] text-white rounded-full shadow-lg hover:bg-[#34495e] transition-colors duration-300 text-lg font-semibold tracking-wide"
              >
                Explore Collection
              </Link>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            className={`flex justify-center items-center 
                       ${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}
            initial={{
              opacity: 0,
              scale: 0.9,
              x: index % 2 === 0 ? 100 : -100,
            }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <motion.img
              src={section.img}
              alt={section.title}
              className="w-full h-full object-cover rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105"
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        </section>
      ))}
    </div>
  );
};

export default PremiumShowcase;
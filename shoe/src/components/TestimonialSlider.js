// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import { IoStarSharp } from 'react-icons/io5';

// // Import assets
// import person1 from '../assets/person1.jpg';
// import person2 from '../assets/person2.jpg';
// import person3 from '../assets/person3.jpg';
// import person4 from '../assets/person4.jpg';
// import person5 from '../assets/person5.jpg';

// import product1 from '../assets/product1.jpg';
// import product2 from '../assets/product2.jpg';
// import product3 from '../assets/product3.jpg';
// import product4 from '../assets/product4.jpg';
// import product5 from '../assets/product5.jpg';

// const testimonials = [
//   {
//     id: 1,
//     name: 'Rohit Kumar',
//     review: 'This is my first purchase from this brand, and I am incredibly impressed. The fit is perfect, and they are incredibly comfortable.',
//     rating: 5,
//     ratingsCount: 128,
//     userImage: person1,
//     productImage: product1, // Re-added product image
//     productName: 'Classic Leather Loafers',
//     tagline: 'Elegance Meets Comfort',
//     desc: 'Premium handcrafted leather loafers with cushioned insoles. Perfect blend of sophistication and comfort for formal and smart-casual looks.'
//   },
//   {
//     id: 2,
//     name: 'Anjali Sharma',
//     review: 'Outstanding quality and sleek design. They are so versatile, I can wear them for a casual day out or a workout session.',
//     rating: 5,
//     ratingsCount: 96,
//     userImage: person2,
//     productImage: product2, // Re-added product image
//     productName: 'Dynamic Running Edge',
//     tagline: 'Run Freely, Live Boldly',
//     desc: 'High-performance sneakers with breathable mesh and ultra-light soles. Perfect for workouts and everyday adventures.'
//   },
//   {
//     id: 3,
//     name: 'Vivek Singh',
//     review: 'Truly a game-changer! I have never owned a pair of shoes this light and breathable. Highly recommend!',
//     rating: 5,
//     ratingsCount: 142,
//     userImage: person3,
//     productImage: product3, // Re-added product image
//     productName: 'Urban Glide',
//     tagline: 'Effortless City Movement',
//     desc: 'Feather-light sneakers with sleek matte finish. Built for city life and modern comfort.'
//   },
//   {
//     id: 4,
//     name: 'Priya Patel',
//     review: 'Stylish, comfortable, and durable. These shoes are everything I was looking for. Will definitely be a returning customer.',
//     rating: 5,
//     ratingsCount: 178,
//     userImage: person4,
//     productImage: product4, // Re-added product image
//     productName: 'Summit Walker',
//     tagline: 'Conquer Every Trail',
//     desc: 'Rugged outdoor shoes with strong grip soles. Designed for adventure seekers and daily explorers.'
//   },
//   {
//     id: 5,
//     name: 'Suresh Yadav',
//     review: 'I bought a pair for my son, and he loves them. They are perfect for his daily activities. The quality is exceptional.',
//     rating: 5,
//     ratingsCount: 210,
//     userImage: person5,
//     productImage: product5, // Re-added product image
//     productName: 'Classic Court Trainers',
//     tagline: 'Retro Style, Modern Comfort',
//     desc: 'White leather trainers with timeless blue stripes. Cushioned for all-day comfort with a retro vibe.'
//   },
// ];

// const TestimonialSlider = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [direction, setDirection] = useState(1);
//   const totalSlides = testimonials.length;

//   const handleNext = () => {
//     setDirection(1);
//     setCurrentSlide((prev) => (prev + 1) % totalSlides);
//   };

//   const handlePrev = () => {
//     setDirection(-1);
//     setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
//   };

//   // Auto-slide functionality
//   useEffect(() => {
//     const interval = setInterval(handleNext, 6000);
//     return () => clearInterval(interval);
//   }, []);

//   // Framer Motion variants
//   const slideVariants = {
//     initial: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
//     animate: { x: 0, opacity: 1, transition: { x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } } },
//     exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0, transition: { x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } } }),
//   };

//   const currentTestimonial = testimonials[currentSlide];

//   return (
//     <section className="relative py-16 overflow-hidden bg-white">
//       <div className="container mx-auto px-4 md:px-8 relative z-10">
//         <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center min-h-[500px]">
//           <AnimatePresence initial={false} custom={direction}>
//             <motion.div
//               key={currentSlide}
//               custom={direction}
//               variants={slideVariants}
//               initial="initial"
//               animate="animate"
//               exit="exit"
//               className="absolute w-full flex-shrink-0"
//             >
//               <div className="flex flex-col md:flex-row items-stretch justify-center bg-white rounded-2xl shadow-xl w-full overflow-hidden">
//                 {/* User Image Section (Left) */}
//                 <div className="md:w-1/2 w-full h-96 md:h-[500px] overflow-hidden flex-shrink-0 relative rounded-l-2xl">
//                   <img
//                     src={currentTestimonial.userImage}
//                     alt={currentTestimonial.name}
//                     className="w-full h-full object-cover rounded-l-2xl"
//                   />
//                 </div>

//                 {/* Content Section (Right) */}
//                 <div className="md:w-1/2 flex flex-col justify-between p-6 md:p-10">
//                   {/* Review Section */}
//                   <div className="flex flex-col items-start text-left mb-8 md:mb-0">
//                     <div className="text-5xl md:text-6xl text-gray-300 mb-4 leading-none font-serif">
//                       “
//                     </div>
//                     <blockquote className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug tracking-tight">
//                       {currentTestimonial.review}
//                     </blockquote>
//                     <p className="text-base font-medium text-gray-600 mt-4 max-w-lg">
//                       {currentTestimonial.desc}
//                     </p>
//                     <cite className="text-base font-bold text-gray-900 mt-6">- {currentTestimonial.name}</cite>
//                   </div>

//                   {/* Featured Product Banner (Bottom Right) */}
//                   <div className="bg-gray-50 rounded-xl p-4 flex items-center border border-gray-200 shadow-sm mt-8">
//                     <img
//                       src={currentTestimonial.productImage}
//                       alt={currentTestimonial.productName}
//                       className="w-20 h-20 object-contain mr-4 rounded-md"
//                     />
//                     <div className="flex-1">
//                       <p className="text-xs font-semibold uppercase text-gray-500 mb-1">
//                         Featured Product
//                       </p>
//                       <h4 className="text-lg font-bold text-gray-900">
//                         {currentTestimonial.productName}
//                       </h4>
//                       <div className="flex items-center space-x-1 mt-1">
//                         {Array.from({ length: 5 }).map((_, i) => (
//                           <IoStarSharp
//                             key={i}
//                             className={`w-4 h-4 ${i < currentTestimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
//                           />
//                         ))}
//                         <span className="text-sm text-gray-500 ml-2">
//                           Based on {currentTestimonial.ratingsCount}+ Reviews
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>
//           </AnimatePresence>

//           {/* Navigation Arrows */}
//           <button
//             onClick={handlePrev}
//             className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 z-20"
//           >
//             <FaChevronLeft className="w-4 h-4 text-gray-700" />
//           </button>
//           <button
//             onClick={handleNext}
//             className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 z-20"
//           >
//             <FaChevronRight className="w-4 h-4 text-gray-700" />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TestimonialSlider;

// MOBILE-FRIENDLY TESTIMONIAL SLIDER
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IoStarSharp } from 'react-icons/io5';

// Assets
import person1 from '../assets/person1.jpg';
import person2 from '../assets/person2.jpg';
import person3 from '../assets/person3.jpg';
import person4 from '../assets/person4.jpg';
import person5 from '../assets/person5.jpg';

import product1 from '../assets/product1.jpg';
import product2 from '../assets/product2.jpg';
import product3 from '../assets/product3.jpg';
import product4 from '../assets/product4.jpg';
import product5 from '../assets/product5.jpg';

const testimonials = [
  {
    id: 1,
    name: 'Rohit Kumar',
    review:
      'This is my first purchase from this brand, and I am incredibly impressed. The fit is perfect, and they are incredibly comfortable.',
    rating: 5,
    ratingsCount: 128,
    userImage: person1,
    productImage: product1,
    productName: 'Classic Leather Loafers',
    tagline: 'Elegance Meets Comfort',
    desc: 'Premium handcrafted leather loafers with cushioned insoles. Perfect blend of sophistication and comfort for formal and smart-casual looks.',
  },
  {
    id: 2,
    name: 'Anjali Sharma',
    review:
      'Outstanding quality and sleek design. They are so versatile, I can wear them for a casual day out or a workout session.',
    rating: 5,
    ratingsCount: 96,
    userImage: person2,
    productImage: product2,
    productName: 'Dynamic Running Edge',
    tagline: 'Run Freely, Live Boldly',
    desc: 'High-performance sneakers with breathable mesh and ultra-light soles. Perfect for workouts and everyday adventures.',
  },
  {
    id: 3,
    name: 'Vivek Singh',
    review:
      'Truly a game-changer! I have never owned a pair of shoes this light and breathable. Highly recommend!',
    rating: 5,
    ratingsCount: 142,
    userImage: person3,
    productImage: product3,
    productName: 'Urban Glide',
    tagline: 'Effortless City Movement',
    desc: 'Feather-light sneakers with sleek matte finish. Built for city life and modern comfort.',
  },
  {
    id: 4,
    name: 'Priya Patel',
    review:
      'Stylish, comfortable, and durable. These shoes are everything I was looking for. Will definitely be a returning customer.',
    rating: 5,
    ratingsCount: 178,
    userImage: person4,
    productImage: product4,
    productName: 'Summit Walker',
    tagline: 'Conquer Every Trail',
    desc: 'Rugged outdoor shoes with strong grip soles. Designed for adventure seekers and daily explorers.',
  },
  {
    id: 5,
    name: 'Suresh Yadav',
    review:
      'I bought a pair for my son, and he loves them. They are perfect for his daily activities. The quality is exceptional.',
    rating: 5,
    ratingsCount: 210,
    userImage: person5,
    productImage: product5,
    productName: 'Classic Court Trainers',
    tagline: 'Retro Style, Modern Comfort',
    desc: 'White leather trainers with timeless blue stripes. Cushioned for all-day comfort with a retro vibe.',
  },
];

const TestimonialSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);
  const totalSlides = testimonials.length;

  const handleNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(handleNext, 6000);
    return () => clearInterval(interval);
  }, []);

  // Animation
  const slideVariants = {
    initial: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  const currentTestimonial = testimonials[currentSlide];

  return (
    <section id='testimonials' className="relative py-16 overflow-hidden bg-gradient-to-br from-[#fffdf7] to-[#fefaf3]">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center min-h-[500px]">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute w-full flex-shrink-0"
            >
              <div className="flex flex-col md:flex-row items-stretch justify-center bg-white rounded-2xl shadow-xl w-full overflow-hidden">
                {/* User Image */}
                <div className="md:w-1/2 w-full h-80 md:h-[500px] overflow-hidden flex-shrink-0 relative">
                  <img
                    src={currentTestimonial.userImage}
                    alt={currentTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="md:w-1/2 flex flex-col justify-between p-6 md:p-10">
                  <div className="flex flex-col items-start text-left">
                    <div className="text-5xl md:text-6xl text-gray-300 mb-4 leading-none font-serif">
                      “
                    </div>
                    <blockquote className="text-xl md:text-3xl font-semibold text-gray-900 leading-snug tracking-tight">
                      {currentTestimonial.review}
                    </blockquote>

                    {/* Hide desc on mobile */}
                    <p className="hidden md:block text-base font-medium text-gray-600 mt-4 max-w-lg">
                      {currentTestimonial.desc}
                    </p>

                    <cite className="text-base font-bold text-gray-900 mt-6">
                      - {currentTestimonial.name}
                    </cite>
                  </div>

                  {/* Product Banner */}
                  <div className="bg-gray-50 rounded-xl p-4 flex items-center border border-gray-200 shadow-sm mt-6 md:mt-10">
                    <img
                      src={currentTestimonial.productImage}
                      alt={currentTestimonial.productName}
                      className="w-16 h-16 md:w-20 md:h-20 object-contain mr-4 rounded-md"
                    />
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase text-gray-500 mb-1">
                        Featured Product
                      </p>
                      <h4 className="text-sm md:text-lg font-bold text-gray-900">
                        {currentTestimonial.productName}
                      </h4>
                      <div className="flex items-center space-x-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <IoStarSharp
                            key={i}
                            className={`w-3 h-3 md:w-4 md:h-4 ${
                              i < currentTestimonial.rating
                                ? 'text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-xs md:text-sm text-gray-500 ml-2">
                          {currentTestimonial.ratingsCount}+ Reviews
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 z-20"
          >
            <FaChevronLeft className="w-4 h-4 text-gray-700" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 z-20"
          >
            <FaChevronRight className="w-4 h-4 text-gray-700" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;



// import React, { useState, useEffect, useRef } from "react";
// import { Link } from "react-router-dom";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { motion, useScroll, useTransform } from "framer-motion";
// import LoadingSpinner from "../components/LoadingSpinner";

// const CategorySlider = () => {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const sliderRef = useRef(null);

//   const { scrollY } = useScroll();
//   const y1 = useTransform(scrollY, [0, 300], [0, -40]); // Parallax top-left (ROHTAK)
//   const y2 = useTransform(scrollY, [0, 300], [0, 40]); // Parallax bottom-right (SHOES)

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch("/categories");
//         if (!response.ok) throw new Error("Failed to fetch categories");
//         const data = await response.json();
//         setCategories(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const scrollLeft = () => {
//     sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" });
//   };

//   const scrollRight = () => {
//     sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });
//   };

//   if (loading) return <LoadingSpinner />;
//   if (error) return <div className="text-center py-12 text-red-500">Error: {error}</div>;

//   return (
//     <section className="relative py-20 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-white">
//       {/* Decorative Parallax Text ROHTAK - Top Left */}
//       <motion.h1
//         style={{ y: y1 }}
//         className="absolute top-10 left-6 text-6xl md:text-9xl font-extrabold text-gray-200 select-none pointer-events-none opacity-50"
//       >
//         ROHTAK
//       </motion.h1>
//       {/* Decorative Parallax Text SHOES - Bottom Right */}
//       <motion.h1
//         style={{ y: y2 }}
//         className="absolute bottom-6 right-6 text-6xl md:text-9xl font-extrabold text-gray-200 select-none pointer-events-none opacity-50"
//       >
//         SHOES
//       </motion.h1>

//       <div className="container mx-auto px-4 relative z-10">
//         <motion.h2
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12"
//         >
//           Featured Categories
//         </motion.h2>

//         {/* Slider */}
//         <div className="relative group">
//           <div
//             ref={sliderRef}
//             className="flex space-x-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 py-2 custom-scrollbar-hidden"
//           >
//             {categories.map((category, idx) => (
//               <motion.div
//                 key={category._id}
//                 initial={{ opacity: 0, y: 40, scale: 0.95 }}
//                 whileInView={{ opacity: 1, y: 0, scale: 1 }}
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.5, delay: idx * 0.1 }}
//                 viewport={{ once: true }}
//                 className="flex-shrink-0 snap-center"
//               >
//                 <Link
//                   to={`/categories/${category._id}`}
//                   className="block w-[80vw] sm:w-64 md:w-72 lg:w-80 relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-transparent hover:border-purple-600"
//                 >
//                   <motion.div
//                     className="relative"
//                     whileHover={{ scale: 1.1 }}
//                     transition={{ duration: 0.6 }}
//                   >
//                     <img
//                       src={category.image}
//                       alt={category.name}
//                       className="w-full h-52 object-cover"
//                     />
//                     {/* Subtle gradient overlay to make text pop */}
//                     <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
//                   </motion.div>
//                   <div className="absolute bottom-0 inset-x-0 p-4 text-center">
//                     <h3 className="text-lg font-semibold text-white group-hover:text-black transition-colors drop-shadow-md">
//                       {category.name}
//                     </h3>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>

//           {/* Arrows */}
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={scrollLeft}
//             className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 z-20 focus:outline-none"
//           >
//             <FaChevronLeft className="w-5 h-5 text-gray-700" />
//           </motion.button>
//           <motion.button
//             whileTap={{ scale: 0.9 }}
//             onClick={scrollRight}
//             className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-lg hover:bg-white transition-all duration-300 z-20 focus:outline-none"
//           >
//             <FaChevronRight className="w-5 h-5 text-gray-700" />
//           </motion.button>
//         </div>
//       </div>
      
//       {/* Add the custom CSS for scrollbar hiding directly in the component for a quick fix */}
//       <style jsx>{`
//         .custom-scrollbar-hidden::-webkit-scrollbar {
//           display: none;
//         }
//         .custom-scrollbar-hidden {
//           -ms-overflow-style: none; /* IE and Edge */
//           scrollbar-width: none; /* Firefox */
//         }
//       `}</style>
//     </section>
//   );
// };

// export default CategorySlider;

import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import apiClient from "../services/apiClient";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sliderRef = useRef(null);

useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await apiClient.get("/categories");
      setCategories(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchCategories();
}, []);


  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="text-center py-12 text-red-500">Error: {error}</div>
    );

  return (
    <section className="relative py-20 overflow-hidden bg-white">
      {/* Decorative Text */}
      <h1 className="absolute top-10 left-6 text-6xl md:text-9xl font-extrabold text-gray-100 select-none pointer-events-none">
        ROHTAK
      </h1>
      <h1 className="absolute bottom-6 right-6 text-6xl md:text-9xl font-extrabold text-gray-100 select-none pointer-events-none">
        SHOES
      </h1>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-12">
          Featured Categories
        </h2>

        {/* Slider */}
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex space-x-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 py-2 custom-scrollbar-hidden"
          >
            {categories.map((category) => (
              <div
                key={category._id}
                className="flex-shrink-0 snap-center"
              >
                <Link
                  to={`/categories/${category._id}`}
                  className="block w-[80vw] sm:w-64 md:w-72 lg:w-80 relative overflow-hidden rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow duration-300 border"
                >
                  <div className="relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-52 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 p-4 text-center">
                    <h3 className="text-lg font-semibold text-white drop-shadow">
                      {category.name}
                    </h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition z-20"
          >
            <FaChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-gray-100 transition z-20"
          >
            <FaChevronRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .custom-scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default CategorySlider;

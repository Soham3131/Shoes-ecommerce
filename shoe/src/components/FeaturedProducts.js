// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import ProductCard from './ProductCard'; // Assuming you have a ProductCard component
// import { BsArrowRight } from 'react-icons/bs';
// import LoadingSpinner from './LoadingSpinner';
// import { motion } from 'framer-motion';

// const FeaturedProducts = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchFeaturedProducts = async () => {
//             try {
//                 // Fetch products with the subCategory "featured"
//                 const response = await fetch('/products/subcategory/featured');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch featured products');
//                 }
//                 const data = await response.json();
//                 setProducts(data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchFeaturedProducts();
//     }, []);

//     if (loading) {
//         return <LoadingSpinner />;
//     }

//     if (error) {
//         return <div className="text-center py-12 text-red-500">Error: {error}</div>;
//     }
    
//     if (products.length === 0) {
//         return null; // Or a message like "No featured products available"
//     }

//     // Framer Motion variants for staggered animations
//     const containerVariants = {
//         hidden: { opacity: 0 },
//         visible: {
//             opacity: 1,
//             transition: {
//                 staggerChildren: 0.2, // Delay between each child's animation
//             },
//         },
//     };

//     const itemVariants = {
//         hidden: { y: 20, opacity: 0 },
//         visible: {
//             y: 0,
//             opacity: 1,
//             transition: {
//                 type: 'spring', // A more bouncy, premium animation style
//                 stiffness: 100,
//             },
//         },
//     };

//     return (
//         <section className="py-20 bg-gradient-to-br from-purple-800 to-indigo-900 text-white">
//             <div className="container mx-auto px-4">
//                 <div className="flex justify-between items-center mb-12">
//                     <motion.h2
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ duration: 0.6 }}
//                         viewport={{ once: true }}
//                         className="text-4xl md:text-5xl font-extrabold text-white"
//                     >
//                         Featured Products
//                     </motion.h2>
//                     <Link 
//                         to="/products/subcategory/featured"
//                         className="relative inline-flex items-center space-x-2 px-6 py-3 rounded-full overflow-hidden
//                                    bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-lg
//                                    shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1
//                                    group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                     >
//                         <span className="relative z-10">View All</span>
//                         <BsArrowRight className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-1" />
//                         {/* Shimmer effect on hover */}
//                         <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-shimmer"></span>
//                     </Link>
//                 </div>

//                 <motion.div
//                     className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12"
//                     variants={containerVariants}
//                     initial="hidden"
//                     whileInView="visible"
//                     viewport={{ once: true, amount: 0.3 }}
//                 >
//                     {products.map((product) => (
//                         <motion.div
//                             key={product._id}
//                             variants={itemVariants}
//                         >
//                             <ProductCard product={product} />
//                         </motion.div>
//                     ))}
//                 </motion.div>
//             </div>
//         </section>
//     );
// };

// export default FeaturedProducts;

// src/components/FeaturedProducts.jsx// src/components/FeaturedProducts.jsx

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import ProductCard from "./ProductCard";
// import { BsArrowRight } from "react-icons/bs";
// import LoadingSpinner from "./LoadingSpinner";

// const FeaturedProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchFeaturedProducts = async () => {
//       try {
//         const response = await fetch(
//           "/products/subcategory/featured"
//         );
//         if (!response.ok) {
//           throw new Error("Failed to fetch featured products");
//         }
//         const data = await response.json();
//         setProducts(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchFeaturedProducts();
//   }, []);

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return (
//       <div className="text-center py-12 text-red-500">Error: {error}</div>
//     );
//   }

//   if (products.length === 0) {
//     return null;
//   }

//   return (
//     <section
//       className="py-20 text-white relative"
//       style={{
//         background: "linear-gradient(135deg, #6a11cb, #2575fc)",
//         backgroundImage:
//           "url('https://www.transparenttextures.com/patterns/diamond-upholstery.png')",
//         backgroundBlendMode: "overlay",
//         backgroundAttachment: "fixed",
//       }}
//     >
//       <div className="container mx-auto px-4 relative z-10">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
//           <h2 className="text-3xl md:text-5xl font-extrabold text-white text-center sm:text-left">
//             Featured Products
//           </h2>

//           <Link
//             to="/products/subcategory/featured"
//             className="relative inline-flex items-center space-x-2 px-6 py-3 rounded-full overflow-hidden
//                        bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold text-lg
//                        shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1
//                        group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
//           >
//             <span className="relative z-10">View All</span>
//             <BsArrowRight className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-1" />
//             <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
//           </Link>
//         </div>

//         {/* Product Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
//           {products.map((product) => (
//             <div key={product._id}>
//               <ProductCard product={product} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedProducts;

// src/components/FeaturedProducts.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import apiClient from "../services/apiClient";
import { BsArrowRight } from "react-icons/bs";
import LoadingSpinner from "./LoadingSpinner";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchFeaturedProducts = async () => {
    try {
      const response = await apiClient.get("/products/subcategory/featured");
      setProducts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  fetchFeaturedProducts();
}, []);


  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="text-center py-12 text-red-500">Error: {error}</div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section
      className="py-20 text-white relative"
      style={{
        background: "linear-gradient(135deg, #1f1c2c, #928dab)", // richer gradient
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')", // darker texture
        backgroundBlendMode: "overlay",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-black text-center mb-10 drop-shadow-lg">
          Featured Products
        </h2>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
          {products.map((product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <Link
            to="/products/subcategory/featured"
            className="relative inline-flex items-center space-x-2 px-8 py-4 rounded-full overflow-hidden
                       bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold text-lg
                       shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1
                       group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            <span className="relative z-10">View All</span>
            <BsArrowRight className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-1" />
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;

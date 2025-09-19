// // src/pages/HomePage.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//     const [products, setProducts] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/api/products');
                
//                 const sortedProducts = response.data.sort((a, b) => {
//                     const aIsOutOfStock = a.variants.every(v => v.countInStock <= 0);
//                     const bIsOutOfStock = b.variants.every(v => v.countInStock <= 0);
//                     if (aIsOutOfStock && !bIsOutOfStock) return 1;
//                     if (!aIsOutOfStock && bIsOutOfStock) return -1;
//                     return 0;
//                 });
                
//                 setProducts(sortedProducts);
//             } catch (err) {
//                 setError('Failed to fetch products.');
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchProducts();
//     }, []);

//     if (loading) return <div className="text-center mt-10">Loading products...</div>;
//     if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold text-center mb-8">Latest Products</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {products.map(product => {
//                     const isOutOfStock = product.variants.every(v => v.countInStock <= 0);
//                     const mainPrice = product.variants.length > 0 ? product.variants[0].price : 'N/A';
//                     return (
//                         <div key={product._id} className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 ${isOutOfStock ? 'opacity-60' : 'hover:scale-105'}`}>
//                             <Link to={`/product/${product._id}`} className="block">
//                                 <img src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
//                             </Link>
//                             <div className="p-4">
//                                 <h3 className={`text-lg font-semibold text-gray-800 ${isOutOfStock ? 'line-through' : ''}`}>{product.name}</h3>
//                                 <p className="mt-1 text-sm text-gray-600">{product.brand}</p>
//                                 <div className="flex justify-between items-center mt-4">
//                                     <span className={`text-xl font-bold text-blue-600 ${isOutOfStock ? 'line-through' : ''}`}>₹{mainPrice}</span>
//                                     {isOutOfStock ? (
//                                         <span className="text-sm font-bold text-red-600">Out of Stock</span>
//                                     ) : (
//                                         <Link to={`/product/${product._id}`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
//                                             View Details
//                                         </Link>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default HomePage;

import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from "../components/FeaturedProducts"
import CategorySlider from '../components/CategorySlider';
import ShopByGender from '../components/ShopByGender'; 
import RecentProducts from '../components/RecentProducts';
import VisitInStoreSection from "../components/VisitInStoreSection"
import TestimonialSlider from '../components/TestimonialSlider';



const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CategorySlider/>
      <FeaturedProducts/>
      <ShopByGender/>
      <RecentProducts/>
     
      <TestimonialSlider/>
       <VisitInStoreSection/>
      {/* You can add other components for products, categories, etc. below the hero section */}
      {/* <section className="p-8">
      
        
      </section> */}
    </div>
  );
};

export default HomePage;


// import React, { useState, useEffect, Suspense } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
// import { motion } from "framer-motion";
// import ShoeModel from "./ShoeModel";
// import LoadingSpinner from "./LoadingSpinner";

// import { HiOutlineSearch } from "react-icons/hi";
// import { FaShoppingCart, FaFire } from "react-icons/fa";
// import { HiOutlineUser } from "react-icons/hi";


// import product5 from "../assets/demo1.jpg"
// import product4 from "../assets/demo2.jpg"
// import product3 from "../assets/demo3.jpg"
// import product2 from "../assets/demo4.jpg"
// import product1 from "../assets/de5.jpg"


// const shoeData = [


//     { path: "/shoes.glb", title: "IN MOTION WE FIND FREEDOM AND JOY", quote: "Rohtak Shoe Co. is the ultimate destination for athletes, fitness enthusiasts, and anyone seeking the perfect blend of style and performance.", productName: "Running Edge", productPrice: "₹3499", productImage: product1 },

//     { path: "/skate_shoes.glb", title: "MASTER THE STREETS, DEFY GRAVITY", quote: "Built for durability and unparalleled board feel with a design that keeps you moving.", productName: "Urban Glide", productPrice: "$120", productImage: product2 },

//   { path: "/merrell_well-worn_hiking_shoe.glb", title: "ADVENTURE AWAITS, CONQUER THE WILD", quote: "Your trusted companion for every rugged trail.", productName: "Running Edge", productPrice: "$165", productImage: product3 },





//   { path: "/arnt_shoes_-_ulv_whussuphaterz.glb", title: "ADVENTURE AWAITS, CONQUER THE WILD", quote: "Your trusted companion for every rugged trail.", productName: "Summit Walker", productPrice: "$180", productImage: product4},


//   { path: "/used_canguro_shoes_free.glb", title: "VINTAGE SOUL, MODERN PERFORMANCE", quote: "A timeless classic reborn with advanced comfort.", productName: "Running Edge", productPrice: "$165", productImage: product5 },
// ];

// shoeData.forEach((item) => useGLTF.preload(item.path));

// const HeroSection = () => {
//   const [currentShoeIndex, setCurrentShoeIndex] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isSearchVisible, setIsSearchVisible] = useState(false);

//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentShoeIndex((prev) => (prev + 1) % shoeData.length);
//     }, 8000);
//     return () => clearInterval(interval);
//   }, []);

//   const currentContent = shoeData[currentShoeIndex];

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?q=${searchQuery.trim()}`);
//       setSearchQuery("");
//       setIsSearchVisible(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   const navLinks = [
//     { name: "New Release", path: "/products/recent" },
//     { name: "Best Seller", path: "/products/subcategory/featured" },
//     { name: "Shop", path: "/products" },
//     { name: "Blog", path: "/blog" },
//     //  { name: "Testimonials", path: "/testimonials" },
//     { name: "Contact", path: "/contact" },
//   ];

//   // 👇 Camera adjusts based on screen size
//   const isMobile = window.innerWidth < 768;
//   const cameraPosition = isMobile ? [0, 0, 5] : [0, 0, 3.5];

//   return (
//     <div className="relative min-h-screen flex flex-col text-white overflow-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-black">
//       {/* Promo bar */}
//       <div className="bg-black/70 text-center py-2 text-sm">
//         SHOP NOW TO GET FREE SHIPPING AND DISCOUNT 30% ON ALL ORDERS TODAY!
//       </div>

//       {/* Navbar */}
//       <nav className="relative z-30 w-full flex items-center justify-between px-6 py-4">
//         <div className="text-2xl font-extrabold tracking-wide">Rohtak Shoe Co.</div>
//         <div className="hidden md:flex space-x-8 text-sm font-medium">
//           {navLinks.map((link) => (
//             <Link key={link.name} to={link.path} className="hover:text-gray-300 transition-colors">
//               {link.name}
//             </Link>
//           ))}
//         </div>
//         <div className="hidden md:flex items-center space-x-6">
//           <form onSubmit={handleSearch} className="flex items-center bg-white/10 px-3 py-1 rounded-full backdrop-blur-md">
//             <HiOutlineSearch className="text-gray-300 mr-2" />
//             <input
//               type="text"
//               placeholder="Search your style"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="bg-transparent text-sm outline-none placeholder-gray-400 w-40 text-white"
//             />
//           </form>
//           {user ? (
//             <>s
//               <Link to={user.role === "admin" ? "/admin" : user.role === "delivery" ? "/delivery" : "/myorders"}>
//                 <HiOutlineUser size={18} />
//               </Link>
//               <button onClick={handleLogout} className="hover:text-gray-300 text-sm">Logout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="hover:text-gray-300 text-sm">Login</Link>
//               <Link to="/signup" className="hover:text-gray-300 text-sm">Signup</Link>
//             </>
//           )}
//           <Link to="/cart"><FaShoppingCart size={18} /></Link>
//         </div>
//         <div className="md:hidden flex items-center space-x-5">
//           <button onClick={() => setIsSearchVisible((p) => !p)}><HiOutlineSearch className="w-6 h-6" /></button>
//           <Link to="/cart"><FaShoppingCart className="w-5 h-5" /></Link>
//           {user ? (
//             <Link to={user.role === "admin" ? "/admin" : user.role === "delivery" ? "/delivery" : "/myorders"}>
//               <HiOutlineUser className="w-5 h-5" />
//             </Link>
//           ) : (
//             <Link to="/login"><HiOutlineUser className="w-5 h-5" /></Link>
//           )}
//         </div>
//       </nav>

//       {isSearchVisible && (
//         <div className="md:hidden px-6 py-3 bg-white text-gray-800">
//           <form onSubmit={handleSearch} className="flex items-center bg-gray-100 rounded-full px-3 py-2">
//             <HiOutlineSearch className="text-gray-500 mr-2" />
//             <input type="text" placeholder="Search your style" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent outline-none w-full" />
//           </form>
//         </div>
//       )}

//       {/* Hero Section */}
//       <div className="flex flex-col md:flex-row flex-1 items-center justify-between px-8 md:px-20 relative">
//         <motion.div key={currentContent.title} initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-xl text-center md:text-left">
//           <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">{currentContent.title}</h1>
//           <p className="text-gray-300 text-lg">{currentContent.quote}</p>
//         </motion.div>

//         {/* 3D Shoe */}
//         <div className="w-full md:w-[550px] flex-1 flex items-center justify-center mt-8 md:mt-0">
//           <div className="w-full h-[350px] md:h-[550px] flex items-center justify-center">
//             <Suspense fallback={<LoadingSpinner />}>
//               <Canvas camera={{ position: cameraPosition, fov: 45 }} className="w-full h-full">
//                 <ambientLight intensity={1.2} />
//                 <directionalLight position={[5, 5, 5]} intensity={1} />
//                 <ShoeModel path={currentContent.path} />
//                 <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
//                 <Environment preset="studio" />
//               </Canvas>
//             </Suspense>
//           </div>
//         </div>
//       </div>

//       {/* Hot Search */}
//       <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-lg w-[95%] md:w-3/4 rounded-t-2xl p-4 flex items-center justify-between space-x-4 overflow-x-auto">
//         <div className="flex items-center space-x-2 text-red-500 font-bold flex-shrink-0">
//           <FaFire /> <span>HOT SEARCH</span>
//         </div>
//         <div className="flex space-x-8 text-sm">
//           {shoeData.map((item, idx) => (
//             <div key={idx} className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition">
//               <img src={item.productImage} alt={item.productName} className="w-[80px] h-[80px] object-contain" />
//               {/* <img  src={item.productImage} alt={item.productName} className="w-10 h-15 object-contain" /> */}
//               <div>
//                 <p>{item.productName}</p>
//                 <p className="text-gray-800">{item.productPrice}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroSection;

import React, { useState, useEffect, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import { motion } from "framer-motion";
import ShoeModel from "./ShoeModel";
import LoadingSpinner from "./LoadingSpinner";

import { HiOutlineSearch } from "react-icons/hi";
import { FaShoppingCart, FaFire } from "react-icons/fa";
import { HiOutlineUser } from "react-icons/hi";

import product5 from "../assets/demo1.jpg";
import product4 from "../assets/demo2.jpg";
import product3 from "../assets/demo3.jpg";
import product2 from "../assets/demo4.jpg";
import product1 from "../assets/de5.jpg";

const shoeData = [
  {
    path: "/shoes.glb",
    title: "IN MOTION WE FIND FREEDOM AND JOY",
    quote:
      "Rohtak Shoe Co. is the ultimate destination for athletes, fitness enthusiasts, and anyone seeking the perfect blend of style and performance.",
    productName: "Running Edge",
    productPrice: "₹3499",
    productImage: product1,
  },
  {
    path: "/skate_shoes.glb",
    title: "MASTER THE STREETS, DEFY GRAVITY",
    quote:
      "Built for durability and unparalleled board feel with a design that keeps you moving.",
    productName: "Urban Glide",
    productPrice: "₹2199",
    productImage: product2,
  },
  {
    path: "/merrell_well-worn_hiking_shoe.glb",
    title: "ADVENTURE AWAITS, CONQUER THE WILD",
    quote: "Your trusted companion for every rugged trail.",
    // productName: "Running Edge",
    // productPrice: "₹2499",
    // productImage: product3,
  },
  {
    path: "/arnt_shoes_-_ulv_whussuphaterz.glb",
    title: "ADVENTURE AWAITS, CONQUER THE WILD",
    quote: "Your trusted companion for every rugged trail.",
    productName: "Summit Walker",
    productPrice: "$180",
    productImage: product4,
  },
  {
    path: "/used_canguro_shoes_free.glb",
    title: "VINTAGE SOUL, MODERN PERFORMANCE",
    quote: "A timeless classic reborn with advanced comfort.",
    productName: "Running Edge",
    productPrice: "₹2899",
    productImage: product5,
  },
];

shoeData.forEach((item) => useGLTF.preload(item.path));

const HeroSection = () => {
  const [currentShoeIndex, setCurrentShoeIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShoeIndex((prev) => (prev + 1) % shoeData.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const currentContent = shoeData[currentShoeIndex];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery.trim()}`);
      setSearchQuery("");
      setIsSearchVisible(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const navLinks = [
    { name: "New Release", path: "/products/recent" },
    { name: "Best Seller", path: "/products/subcategory/featured" },
    { name: "Shop", path: "/products" },
    { name: "Blog", path: "/blog" },
    { name: "Contact", path: "/contact" },
  ];

  // 👇 Camera adjusts based on screen size
  const isMobile = window.innerWidth < 768;
  const cameraPosition = isMobile ? [0, 0, 5] : [0, 0, 3.5];

  return (
    <div className="relative min-h-screen flex flex-col text-white overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5a1a7e] via-[#3b0a60] to-[#f5f5f5]" />

      {/* Promo bar */}
      <div className="bg-black/70 text-center py-2 text-sm relative z-20">
        SHOP NOW TO GET FREE SHIPPING AND DISCOUNT 30% ON ALL ORDERS TODAY!
      </div>

      {/* Navbar */}
      <nav className="relative z-30 w-full flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-extrabold tracking-wide">
          Rohtak Shoe Co.
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-gray-300 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white/10 px-3 py-1 rounded-full backdrop-blur-md"
          >
            <HiOutlineSearch className="text-gray-300 mr-2" />
            <input
              type="text"
              placeholder="Search your style"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm outline-none placeholder-gray-400 w-40 text-white"
            />
          </form>
          {user ? (
            <>
              <Link
                to={
                  user.role === "admin"
                    ? "/admin"
                    : user.role === "delivery"
                    ? "/delivery"
                    : "/myorders"
                }
              >
                <HiOutlineUser size={18} />
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-gray-300 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-300 text-sm">
                Login
              </Link>
              {/* <Link to="/signup" className="hover:text-gray-300 text-sm">
                Signup
              </Link> */}
            </>
          )}
          <Link to="/cart">
            <FaShoppingCart size={18} />
          </Link>
        </div>
        <div className="md:hidden flex items-center space-x-5">
          <button onClick={() => setIsSearchVisible((p) => !p)}>
            <HiOutlineSearch className="w-6 h-6" />
          </button>
          <Link to="/cart">
            <FaShoppingCart className="w-5 h-5" />
          </Link>
          {user ? (
            <Link
              to={
                user.role === "admin"
                  ? "/admin"
                  : user.role === "delivery"
                  ? "/delivery"
                  : "/myorders"
              }
            >
              <HiOutlineUser className="w-5 h-5" />
            </Link>
          ) : (
            <Link to="/login">
              <HiOutlineUser className="w-5 h-5" />
            </Link>
          )}
        </div>
      </nav>

      {isSearchVisible && (
        <div className="md:hidden px-6 py-3 bg-white text-gray-800">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-gray-100 rounded-full px-3 py-2"
          >
            <HiOutlineSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search your style"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full"
            />
          </form>
        </div>
      )}

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row flex-1 items-center justify-between px-8 md:px-20 relative z-10">
        <motion.div
          key={currentContent.title}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl text-center md:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            {currentContent.title}
          </h1>
          <p className="text-gray-200 text-lg">{currentContent.quote}</p>
        </motion.div>

        {/* 3D Shoe */}
        <div className="w-full md:w-[550px] flex-1 flex items-center justify-center mt-8 md:mt-0">
          <div className="w-full h-[350px] md:h-[550px] flex items-center justify-center">
            <Suspense fallback={<LoadingSpinner />}>
              <Canvas
                camera={{ position: cameraPosition, fov: 45 }}
                className="w-full h-full"
              >
                <ambientLight intensity={1.2} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <ShoeModel path={currentContent.path} />
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
                <Environment preset="studio" />
              </Canvas>
            </Suspense>
          </div>
        </div>
      </div>

      {/* Hot Search */}
      
     
<div className="absolute bottom-0 left-1/2 -translate-x-1/2 
  bg-gradient-to-r from-purple-900/90 via-purple-700/85 to-pink-600/80 
  backdrop-blur-xl w-[95%] md:w-3/4 rounded-t-2xl 
  p-3 md:p-4 flex items-center justify-between space-x-4 
  overflow-x-auto z-20 shadow-xl">
  
  {/* Hot Search Label with Animation */}
  <div className="flex items-center space-x-2 flex-shrink-0">
    <FaFire className="text-orange-400 animate-pulseHot" />
    <span className="font-bold tracking-wide text-orange-300 ">
      HOT SEARCH
    </span>
  </div>

  {/* Product Items */}
  <div className="flex space-x-4 md:space-x-6 text-sm text-white overflow-x-auto scrollbar-hide">
    {shoeData.map((item, idx) => {
      if (!item.productImage || !item.productName || !item.productPrice) return null;

      return (
        <div
          key={idx}
          className="flex items-center space-x-2 min-w-[130px] max-w-[140px] 
          bg-white/15 border border-white/10 rounded-xl px-3 py-2 shadow-md 
          hover:bg-white/25 transition"
        >
          <img
            src={item.productImage}
            alt={item.productName}
            className="w-[40px] h-[40px] object-contain drop-shadow-md flex-shrink-0"
          />
          <div className="overflow-hidden">
            <p className="font-medium truncate max-w-[90px]" title={item.productName}>
              {item.productName}
            </p>
            <p className="text-gray-200">{item.productPrice}</p>
          </div>
        </div>
      );
    })}
  </div>
</div>



    </div>
  );
};

export default HeroSection;


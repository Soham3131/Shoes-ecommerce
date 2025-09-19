
import React, { useState, useEffect, useRef } from "react";
import apiClient from "../services/apiClient";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { FaHeart, FaShareAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
const axios = require("axios");import { motion, AnimatePresence } from "framer-motion";

const ProductCard = ({ product }) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [heartAnimation, setHeartAnimation] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  const intervalRef = useRef(null);

  const { user, wishlist, fetchWishlist } = useAuth();

  const isWishlisted = wishlist.some((item) => item._id === product._id);

  // Auto image cycle
  useEffect(() => {
    if (isVisible) {
      intervalRef.current = setInterval(() => {
        setActiveImageIndex(
          (prevIndex) => (prevIndex + 1) % product.images.length
        );
      }, 2000);
    }
    return () => clearInterval(intervalRef.current);
  }, [product.images, isVisible]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setActiveImageIndex(0);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  const isVideo = (url) => {
    const videoExtensions = [".mp4", ".mov", ".webm", ".ogg"];
    return videoExtensions.some((ext) => url.endsWith(ext));
  };

  const isOutOfStock = product.variants.every((v) => v.countInStock <= 0);

  // Toggle wishlist with auth header fix
  const toggleWishlist = async () => {
    if (!user) {
      alert("Please login to add to wishlist");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (isWishlisted) {
        await (
          `/wishlist/${product._id}`,
          config
        );
      } else {
        await apiClient.post(
          `/wishlist/${product._id}`,
          {},
          config
        );
        setHeartAnimation(true);
        setTimeout(() => setHeartAnimation(false), 800);
      }

      await fetchWishlist();
    } catch (err) {
      console.error("Wishlist error", err);
      alert("Something went wrong with wishlist.");
    }
  };

  return (
    <div
      ref={cardRef}
      className="relative group rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      {/* ❤️ Wishlist + Share */}
      <div className="absolute top-4 right-4 z-20 flex space-x-3">
        <button onClick={toggleWishlist} className="relative">
          <FaHeart
            className={`text-2xl ${
              isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-400"
            } transition-colors`}
          />
          <AnimatePresence>
            {heartAnimation && (
              <motion.div
                initial={{ opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 0, y: -30, scale: 1.3 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 text-red-500"
              >
                <FaHeart />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
        <button
          onClick={() =>
            navigator.clipboard
              .writeText(`${window.location.origin}/product/${product._id}`)
              .then(() => alert("Product link copied!"))
          }
        >
          <FaShareAlt className="text-2xl text-gray-400 hover:text-indigo-500 transition-colors" />
        </button>
      </div>

      {/* Product Image */}
      <Link to={`/product/${product._id}`} className="block">
        <div className="relative w-full h-72">
          {isOutOfStock && (
            <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
              Out of Stock
            </div>
          )}
          {product.images.map((url, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                index === activeImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              {isVideo(url) && isVisible ? (
                <video
                  src={url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-6 relative z-10">
        <h3 className="text-xl font-bold text-gray-900 truncate">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-gray-900">
            ₹{product.variants.length > 0 ? product.variants[0].price : "N/A"}
          </span>
          <Link
            to={`/product/${product._id}`}
            className="relative inline-flex items-center space-x-2 px-4 py-2 rounded-full
                         bg-white border-2 border-transparent transition-all duration-300
                         group-hover:border-purple-500/80 group-hover:bg-gradient-to-r from-purple-500/20 to-indigo-500/20"
          >
            <span className="relative z-10 text-gray-800 font-semibold text-sm transition-colors duration-300 group-hover:text-purple-600">
              View
            </span>
            <BsArrowRight className="relative z-10 text-gray-800 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-purple-600" />
            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-shimmer"></span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

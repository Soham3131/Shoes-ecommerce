

// import React, { createContext, useState, useEffect, useContext } from "react";
// import axios from "axios";
// import apiClient from './apiClient';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [wishlist, setWishlist] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [wishlistLoading, setWishlistLoading] = useState(false);

//   // Restore login + wishlist from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");

//     if (storedUser && storedToken) {
//       const parsedUser = JSON.parse(storedUser);
//       setUser(parsedUser);
//       axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
//       fetchWishlist(); // ✅ fetch wishlist immediately
//     }

//     setLoading(false);
//   }, []);

//   const login = async (userData) => {
//     localStorage.setItem("user", JSON.stringify(userData.user));
//     localStorage.setItem("token", userData.token);
//     setUser(userData.user);

//     axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;

//     await fetchWishlist(); // ✅ ensure wishlist loads right after login
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//     setUser(null);
//     setWishlist([]);
//     delete axios.defaults.headers.common["Authorization"];
//   };

//   const fetchWishlist = async () => {
//     setWishlistLoading(true);
//     try {
//       const { data } = await axios.get("http://localhost:5000/api/wishlist");
//       setWishlist(data || []);
//     } catch (err) {
//       console.error("Error fetching wishlist", err);
//       setWishlist([]);
//     } finally {
//       setWishlistLoading(false);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         logout,
//         loading,
//         wishlist,
//         fetchWishlist,
//         wishlistLoading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// src/contexts/AuthContext.js

import React, { createContext, useState, useEffect, useContext } from "react";
import apiClient from '../services/apiClient'; // ⚠️ Import the new apiClient

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // Restore login + wishlist from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      // ⚠️ No need to set the header manually; apiClient handles it.
      fetchWishlist();
    }
    setLoading(false);
  }, []);

  const login = async (userData) => {
    localStorage.setItem("user", JSON.stringify(userData.user));
    localStorage.setItem("token", userData.token);
    setUser(userData.user);
    // ⚠️ No need to set the header manually; apiClient handles it.
    await fetchWishlist();
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setWishlist([]);
    // ⚠️ No need to delete the header; apiClient's logic will stop sending it
    // once the token is removed from localStorage.
  };

  const fetchWishlist = async () => {
    setWishlistLoading(true);
    try {
      // ⚠️ Use apiClient instead of axios for all API calls
      const { data } = await apiClient.get("/wishlist");
      setWishlist(data || []);
    } catch (err) {
      console.error("Error fetching wishlist", err);
      // If the wishlist fetch fails due to a 401, the apiClient interceptor
      // will handle the token refresh and retry the request.
      setWishlist([]);
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        wishlist,
        fetchWishlist,
        wishlistLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
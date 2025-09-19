// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import ProductPage from './pages/ProductPage';
// import CartPage from './pages/CartPage';
// import LoginPage from './pages/LoginPage';
// import SignupPage from './pages/SignupPage';
// import AdminDashboard from './pages/AdminDashboard';
// import DeliveryDashboard from './pages/DeliveryDashboard';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import MyOrdersPage from './pages/MyOrdersPage';
// import CategoryProductsPage from "./pages/CategoryProductsPage"
// import AllFeaturedProductsPage from './pages/AllFeaturedProductsPage';
// import GenderProductsPage from './pages/GenderProductsPage'
// import AllRecentProductsPage from "./pages/AllRecentProductsPage"
// import ContactPage from "./pages/ContactPage"
// import AllProductsPage from "./pages/AllProductsPage"
// import SearchResultsPage from "./pages/SearchResultsPage"

// function App() {
//   return (
//     <Router>
//       <div className="flex flex-col min-h-screen">
//         <Header />
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//              <Route path="/products" element={<AllProductsPage />} />
//             <Route path="/product/:id" element={<ProductPage />} />
//             <Route path="/cart" element={<CartPage />} />
//             <Route path="/login" element={<LoginPage />} />
//             <Route path="/signup" element={<SignupPage />} />
//             <Route path="/admin" element={<AdminDashboard />} />
//             <Route path="/myorders" element={<MyOrdersPage />} />
//             <Route path="/delivery" element={<DeliveryDashboard />} />
//              <Route path="/categories/:categoryId" element={<CategoryProductsPage />} />
//               <Route path="/products/subcategory/:subCategory" element={<AllFeaturedProductsPage />} /> 
//               <Route path="/gender/:gender" element={<GenderProductsPage />} /> {/* New route */}{/* New route */}
//               <Route path="/products/recent" element={<AllRecentProductsPage />} /> {/* New route */}
//               <Route path="/contact" element={<ContactPage />} />
//                <Route path="/search" element={<SearchResultsPage />} /> 
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AdminDashboard from './pages/AdminDashboard';
import DeliveryDashboard from './pages/DeliveryDashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import MyOrdersPage from './pages/MyOrdersPage';
import CategoryProductsPage from "./pages/CategoryProductsPage";
import AllFeaturedProductsPage from './pages/AllFeaturedProductsPage';
import GenderProductsPage from './pages/GenderProductsPage';
import AllRecentProductsPage from "./pages/AllRecentProductsPage";
import ContactPage from "./pages/ContactPage";
import AllProductsPage from "./pages/AllProductsPage";
import SearchResultsPage from "./pages/SearchResultsPage";
import WishlistPage from "./pages/WishlistPage"
import LoginRegisterPage from "./pages/LoginRegisterPage";
import PremiumShowcase from "./pages/PremiumShowcase"

function AppLayout() {
  const location = useLocation();

  // Hide header only on homepage
  const hideHeader = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeader && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          {/* <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} /> */}
          <Route path="/login" element={<LoginRegisterPage />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/myorders" element={<MyOrdersPage />} />
          <Route path="/delivery" element={<DeliveryDashboard />} />
          <Route path="/categories/:categoryId" element={<CategoryProductsPage />} />
          <Route path="/products/subcategory/:subCategory" element={<AllFeaturedProductsPage />} />
          <Route path="/gender/:gender" element={<GenderProductsPage />} />
          <Route path="/products/recent" element={<AllRecentProductsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
           <Route path="/wishlist" element={<WishlistPage />} />
           <Route path="/blog" element={<PremiumShowcase />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;

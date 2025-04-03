import React from "react";
import Navbar from "../seller/SellerNavbar";
import HeroSection from "../seller/HeroSection";
import BenefitsSection from "../seller/BenefitsSection";
import SellerSuccessStories from "../seller/SellerSuccessStories";

const SellerPage = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <BenefitsSection />
      <SellerSuccessStories />
    </div>
  );
};

export default SellerPage;

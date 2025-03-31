import React from "react";
import { Link } from "react-router-dom";


const offers = [
  { 
    id: 1, 
    Image:"https://d1csarkz8obe9u.cloudfront.net/posterpreviews/smart-watch-banner-design-template-4e762c49ed10b6ff4dcbddb915f6d6a9_screen.jpg?ts=1655974438",
    title: "50% OFF on Smartwatches", 
    description: "Limited-time offer on premium smartwatches!", 
  },
  { 
    id: 2, 
    Image: "https://storage.googleapis.com/shy-pub/208075/SKU-6406_0-1712212689566.jpg",
    title: "Buy 1 Get 1 Free on Headphones", 
    description: "Double your music experience!", 
  },
  { 
    id: 3, 
    Image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/new-collection-fashion-sale-banner-design-template-b43c28c068dc8d5fe310269d516c548e_screen.jpg?ts=1597768054",
    title: "50% OFF on Women's Clothing", 
    description: "Trendy fashion at half the price!",
  },
  {
    id: 4,
    Image: "https://www.shutterstock.com/shutterstock/photos/2169212715/display_1500/stock-vector-flash-sale-sticker-get-extra-percent-off-discount-offer-limited-time-sale-promotion-extra-2169212715.jpg",
    title: "25% OFF on Whole Series Books",
    description: "Now read whole story without any brack",
  },
];

const Hero = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-6">

      {/* Offers Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {offers.map((offer) => (
          <div key={offer.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold">{offer.title}</h2>
            <p className="text-gray-400">{offer.description}</p>
            <img src={offer.Image} alt={offer.title} className="w-full h-64 object-cover mt-2" />
            <Link
              to={`/offer/${offer.id}`} // Navigate to OfferDetail page
              className="mt-2 inline-block bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition cursor-pointer"
            >
              See More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;
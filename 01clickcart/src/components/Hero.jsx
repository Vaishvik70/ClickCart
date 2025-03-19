import React from "react";
import { Link } from "react-router-dom";


const offers = [
  { 
    id: 1, 
    Image:"https://files.oaiusercontent.com/file-4B7z4LKnpto5NVPtGhkRJs?se=2025-03-13T09%3A09%3A37Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Da9f0fce8-b240-4566-ab10-057fa6662eb6.webp&sig=xphUpKsftym7bvuZM%2B9UHCaNWhCyQVWi9NnTzHMzEvg%3D",
    title: "50% OFF on Smartwatches", 
    description: "Limited-time offer on premium smartwatches!", 
  },
  { 
    id: 2, 
    Image: "https://files.oaiusercontent.com/file-W7XRVjECDPndu1sDkxKPdg?se=2025-03-13T09%3A11%3A56Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D9ada5669-ac93-4ec7-acaa-c7f40044db2d.webp&sig=1rcBUvqlcDQ703h5qamW2gCspAdHOLmufGNoQE554/8%3D",
    title: "Buy 1 Get 1 Free on Headphones", 
    description: "Double your music experience!", 
  },
  { 
    id: 3, 
    Image: "https://files.oaiusercontent.com/file-2MHEd9i9uiKfNhD5a2sr89?se=2025-03-13T09%3A08%3A01Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D79321143-4b58-4f6f-9a65-86ba6d52e25b.webp&sig=lnOa5Kur4zBN2apEKrwT8FnkThDviL4PsJpPeNQ4Y58%3D",
    title: "50% OFF on Women's Clothing", 
    description: "Trendy fashion at half the price!",
  },
  {
    id: 4,
    Image: "https://files.oaiusercontent.com/file-RS3fydkpP1sUn5TGxhq6Ps?se=2025-03-18T12%3A23%3A01Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D9d6f6ccf-7666-4f42-9ced-5076f9bbd2c2.webp&sig=D8tDGijjWgYWs7/qz0KN9j/7aQZxJsT4UAAIfP7JujI%3D",
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
import React from "react";

const About = () => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center px-6">
      <h1 className="text-4xl font-bold mb-4">About Click Cart</h1>
      <p className="text-lg text-gray-300 max-w-3xl text-center">
        Welcome to <span className="text-blue-400 font-semibold">Click Cart</span> – your one-stop destination for the best deals online! 
        We are committed to bringing you high-quality products at unbeatable prices, ensuring a seamless shopping experience.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl">
        {/* Mission Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-400">🚀 Our Mission</h2>
          <p className="text-gray-300 mt-2">
            Our mission is to make online shopping easy, affordable, and reliable. We bring you top-quality products, exciting discounts, and secure payment options.
          </p>
        </div>

        {/* Vision Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-400">🌍 Our Vision</h2>
          <p className="text-gray-300 mt-2">
            We aim to be the leading eCommerce platform that provides customers with a convenient and enjoyable shopping experience.
          </p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <h2 className="text-2xl font-bold text-blue-400">💡 Why Choose Us?</h2>
        <ul className="text-gray-300 mt-4 space-y-2">
          <li>✔️ High-quality products at affordable prices</li>
          <li>✔️ Secure and seamless checkout process</li>
          <li>✔️ Fast and reliable delivery</li>
          <li>✔️ 24/7 customer support</li>
        </ul>
      </div>
    </div>
  );
};

export default About;

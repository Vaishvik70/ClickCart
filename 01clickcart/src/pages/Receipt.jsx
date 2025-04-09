import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";

export default function Receipt() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, product, cart, totalPriceAfterDiscount } = location.state || {};
  const receiptRef = useRef();

  // Download PDF handler
  const handleDownloadPDF = () => {
    const element = receiptRef.current;
    const options = {
      margin: 0.5,
      filename: "receipt.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf().set(options).from(element).save();
  };

  // Share handler
  const handleShare = async () => {
    const details = `
🧾 *Click Cart Payment Receipt*

👤 *Name:* ${formData?.name}
🏠 *Address:* ${formData?.address}
📞 *Phone:* ${formData?.phone}
💳 *Payment:* ${formData?.paymentMethod}

🛍️ *Products:*
${product ? `${product.name} - ₹${product.price}` :
      cart?.map(item => `${item.name} x ${item.quantity} - ₹${item.price}`).join("\n")}

💰 *Total:* ₹${Math.round(totalPriceAfterDiscount).toLocaleString("en-IN")}
    `;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Click Cart - Payment Receipt",
          text: details,
        });
      } else {
        alert("Sharing is not supported on this browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto border rounded-lg shadow-lg bg-white">
      <div ref={receiptRef}>
        <h1 className="text-2xl font-bold text-center mb-4">Payment Receipt</h1>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Customer Details</h2>
          <p><strong>Name:</strong> {formData?.name}</p>
          <p><strong>Address:</strong> {formData?.address}</p>
          <p><strong>Phone:</strong> {formData?.phone}</p>
          <p><strong>Payment Method:</strong> {formData?.paymentMethod}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">Products Purchased</h2>
          {product ? (
            <div className="border p-2 rounded mb-2">
              <p><strong>{product.name}</strong> - ₹{Math.round(product.price).toLocaleString("en-IN")}</p>
            </div>
          ) : cart ? (
            cart.map((item) => (
              <div key={item.id || item.$id} className="border p-2 rounded mb-2">
                <p><strong>{item.name}</strong> - ₹{Math.round(item.price).toLocaleString("en-IN")} x {item.quantity}</p>
              </div>
            ))
          ) : (
            <p>No products available.</p>
          )}
        </div>

        <h2 className="text-xl font-bold">
          Total Price: ₹{Math.round(totalPriceAfterDiscount).toLocaleString("en-IN")}
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-6">
        <button
          onClick={handleDownloadPDF}
          className="bg-green-600 text-white py-2 px-4 rounded w-full hover:bg-green-800"
        >
          Download PDF
        </button>

        <button
          onClick={handleShare}
          className="bg-yellow-500 text-white py-2 px-4 rounded w-full hover:bg-yellow-700"
        >
          Share Receipt
        </button>
      </div>

      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white py-2 px-4 rounded w-full mt-4"
      >
        Go to Home
      </button>
    </div>
  );
}

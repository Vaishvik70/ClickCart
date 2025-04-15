import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";

const Receipt = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const receiptRef = useRef();

  const formData = state?.formData || {
    name: state?.fullName || "",
    address: state?.address || "",
    phone: state?.phoneNumber || "",
    paymentMethod: state?.paymentId || "",
  };

  const product = state?.product;
  const cart = state?.cart || [];
  const totalPrice = state?.totalPriceAfterDiscount || 0;

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

  const handleShare = async () => {
    const details = `
🧾 *Click Cart Payment Receipt*

👤 *Name:* ${formData.name}
🏠 *Address:* ${formData.address}
📞 *Phone:* ${formData.phone}
💳 *Payment:* ${formData.paymentMethod}

🛍️ *Products:*
${product
        ? `${product.name} - ₹${product.price}`
        : cart.map((item) => `${item.name} x ${item.quantity} - ₹${item.price}`).join("\n")}

💰 *Total:* ₹${Math.round(totalPrice).toLocaleString("en-IN")}
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
    <div className="p-6 max-w-4xl mx-auto border rounded-lg shadow-lg bg-white">
      <div ref={receiptRef}>
        <h1 className="text-3xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <span role="img" aria-label="receipt">🧾</span> Payment Receipt
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Customer Details</h2>
            <p><strong>Name:</strong> {formData.name}</p>
            <p><strong>Address:</strong> {formData.address}</p>
            <p><strong>Phone:</strong> {formData.phone}</p>
            <p><strong>Payment Method:</strong> {formData.paymentMethod}</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Products Purchased</h2>
          {product || cart.length > 0 ? (
            <table className="w-full text-left border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Image</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Qty</th>
                  <th className="p-2 border">Price</th>
                </tr>
              </thead>
              <tbody>
                {product ? (
                  <tr>
                    <td className="p-2 border">
                      <img src={product.image} alt={product.name} className="h-16 object-contain" />
                    </td>
                    <td className="p-2 border">{product.name || "Unnamed Product"}</td>
                    <td className="p-2 border">1</td>
                    <td className="p-2 border">₹{Math.round(product.price)}</td>
                  </tr>
                ) : (
                  cart.map((item, index) => (
                    <tr key={item.id || item.$id || index}>
                      <td className="p-2 border">
                        <img src={item.image} alt={item.name} className="h-16 object-contain" />
                      </td>
                      <td className="p-2 border">{item.name || "Unnamed Item"}</td>
                      <td className="p-2 border">{item.quantity}</td>
                      <td className="p-2 border">₹{Math.round(item.price)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          ) : (
            <p>No products available.</p>
          )}
        </div>

        <h2 className="text-2xl font-bold mt-6 text-right">
          Total Price: ₹{Math.round(totalPrice).toLocaleString("en-IN")}
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
};

export default Receipt;
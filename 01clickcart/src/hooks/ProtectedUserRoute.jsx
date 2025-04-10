import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { account, databases } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";

const ProtectedUserRoute = ({ children }) => {
  const [isAllowed, setIsAllowed] = useState(null);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const user = await account.get();

        // Check if this user is a seller
        const sellerDocs = await databases.listDocuments(
          "67cad7e600027ac7e8c0", // Database ID
          "67ea22e3000a9c49cd04", // Seller Collection ID
          [Query.equal("userId", user.$id)]
        );

        if (sellerDocs.total > 0) {
          // Seller → redirect to seller dashboard
          setIsAllowed(false);
        } else {
          // Regular user → allow
          setIsAllowed(true);
        }
      } catch (error) {
        // Not logged in → allow public access
        setIsAllowed(true);
      }
    };

    checkAccess();
  }, []);

  if (isAllowed === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-semibold animate-pulse">Checking access...</p>
      </div>
    );
  }

  if (!isAllowed) {
    return <Navigate to="/seller-dashboard" replace />;
  }

  return children;
};

export default ProtectedUserRoute;

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

        const sellerDoc = await databases.listDocuments(
          "67cad7e600027ac7e8c0", // DB ID
          "67ea22e3000a9c49cd04", // Seller Collection ID
          [Query.equal("userId", user.$id)]
        );

        if (sellerDoc.total > 0) {
          // ✅ This user is a seller → block access
          setIsAllowed(false);
        } else {
          // ✅ Not a seller → allow
          setIsAllowed(true);
        }
      } catch (error) {
        // Not logged in → block
        setIsAllowed(false);
      }
    };

    checkAccess();
  }, []);

  if (isAllowed === null) return <div className="text-center mt-10">Checking access...</div>;

  if (!isAllowed) {
    return <Navigate to="/seller-dashboard" replace />;
  }

  return children;
};

export default ProtectedUserRoute;

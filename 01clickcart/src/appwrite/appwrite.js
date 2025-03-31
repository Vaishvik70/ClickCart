import { Client, Account, Databases, ID } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Correct Appwrite endpoint
  .setProject("67cad786002fe394c8a8"); // Your actual Project ID

export const account = new Account(client);
export const databases = new Databases(client);
export { ID };

// 🚀 Fix: Seller Database & Collection IDs
const DATABASE_ID = "67cad7e...";  // Replace with your actual Database ID
const SELLER_COLLECTION_ID = "67ea22e...";  // Replace with your actual Collection ID

/**
 * ✅ Register a new seller
 */
export const register = async (name, email, password) => {
  try {
    const newUser = await account.create(ID.unique(), email, password, name);
    console.log("✅ User Registered:", newUser);

    // 🔹 Store Seller Info in the Database
    await databases.createDocument(
      DATABASE_ID,
      SELLER_COLLECTION_ID,
      ID.unique(),
      {
        businessName: name,
        email: email,
        userId: newUser.$id, // Store the registered user ID
      }
    );

    return newUser;
  } catch (error) {
    console.error("❌ Registration Error:", error);
    return null;
  }
};

/**
 * ✅ Login a seller
 */
export const login = async (email, password) => {
  try {
    // 🔹 Fix: Log out any existing session before logging in
    try {
      await account.deleteSession("current");
      console.log("✅ Removed existing session");
    } catch (err) {
      console.warn("⚠️ No active session to remove");
    }

    const session = await account.createEmailPasswordSession(email, password);
    console.log("✅ Login Successful:", session);
    return session;
  } catch (error) {
    console.error("❌ Login Error:", error);
    return null;
  }
};

/**
 * ✅ Logout user
 */
export const logout = async () => {
  try {
    await account.deleteSession("current");
    console.log("✅ Logout Successful");
  } catch (error) {
    console.error("❌ Logout Error:", error.message);
  }
};

/**
 * ✅ Fetch products from Appwrite Database
 */
export const getProducts = async () => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, "YOUR_COLLECTION_ID");
    console.log("✅ Products Fetched:", response.documents);
    return response.documents;
  } catch (error) {
    console.error("❌ Fetch Products Error:", error);
    return null;
  }
};

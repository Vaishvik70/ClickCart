import { Client, Account, Databases, ID } from "appwrite";

const client = new Client();
client.setEndpoint("https://cloud.appwrite.io/v1") // Correct API endpoint
      .setProject("67cad786002fe394c8a8"); // Your actual Project ID

export const account = new Account(client);
export const databases = new Databases(client);

/**
 * Register a new user
 */
export const register = async (name, email, password) => {
  try {
    const newUser = await account.create(ID.unique(), email, password, name);
    console.log("✅ User Registered:", newUser);
    
    return newUser; // No auto-login, just return the user
  } catch (error) {
    console.error("❌ Registration Error:", error);
    return null;
  }
};

/**
 * Login a user
 */
export const login = async (email, password) => {
  try {
    // ✅ Fix: Correct function name for login
    const session = await account.createEmailPasswordSession(email, password);
    console.log("✅ Login Successful:", session);
    return session;
  } catch (error) {
    console.error("❌ Login Error:", error);
    return null;
  }
};

/**
 * Logout user
 */
export const logout = async () => {
  try {
    const session = await account.getSession("current"); // Check if a session exists
    if (session) {
      await account.deleteSession("current"); // Log out only if a session exists
      console.log("✅ Logout Successful");
    }
  } catch (error) {
    console.error("❌ Logout Error:", error.message);
  }
};


/**
 * Fetch products from Appwrite Database
 */
export const getProducts = async () => {
  try {
    const response = await databases.listDocuments("YOUR_DATABASE_ID", "YOUR_COLLECTION_ID");
    console.log("✅ Products Fetched:", response.documents);
    return response.documents;
  } catch (error) {
    console.error("❌ Fetch Products Error:", error);
    return null;
  }
};

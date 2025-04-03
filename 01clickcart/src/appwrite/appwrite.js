import { Client, Account, Databases, Storage, ID, Query } from "appwrite";

// 🔹 Initialize Appwrite Client
const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite API endpoint
  .setProject("67cad786002fe394c8a8"); // Your actual Project ID

// 🔹 Initialize Appwrite Services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID, Query };

// 🔹 Your Appwrite Configurations (Replace with actual IDs)
const DATABASE_ID = "67cad7e600027ac7e8c0"; // Your Database ID
const SELLER_COLLECTION_ID = "67ea22e3000a9c49cd04"; // Your Seller Collection ID
const PRODUCT_COLLECTION_ID = "67ea560f00044ac3e66b"; // Your Product Collection ID
const STORAGE_BUCKET_ID = "67cad81f00268d3093c5"; // Your Storage Bucket ID

/**
 * ✅ Register a new seller
 */
export const register = async (name, email, password) => {
  try {
    // Create a new user in Appwrite Authentication
    const newUser = await account.create(ID.unique(), email, password, name);
    console.log("✅ User Registered:", newUser);

    // Store Seller Info in the Database
    await databases.createDocument(
      DATABASE_ID,
      SELLER_COLLECTION_ID,
      ID.unique(),
      {
        name: name, // Ensure "name" exists in Appwrite schema
        email: email,
        userId: newUser.$id, // Store the Appwrite user ID
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
    // Ensure no existing session before logging in
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
    const response = await databases.listDocuments(DATABASE_ID, PRODUCT_COLLECTION_ID);
    console.log("✅ Products Fetched:", response.documents);
    return response.documents;
  } catch (error) {
    console.error("❌ Fetch Products Error:", error);
    return null;
  }
};

/**
 * ✅ Add Product to Database
 */
export const addProduct = async (product) => {
  try {
    let imageId = "";

    // Upload Image if Provided
    if (product.image) {
      const file = await storage.createFile(STORAGE_BUCKET_ID, ID.unique(), product.image);
      imageId = file.$id;
    }

    // Store Product in Database
    const newProduct = await databases.createDocument(
      DATABASE_ID,
      PRODUCT_COLLECTION_ID,
      ID.unique(),
      {
        name: product.name,
        price: parseFloat(product.price),
        category: product.category, // Ensure this field exists in Appwrite DB
        description: product.description,
        image: imageId,
      }
    );

    console.log("✅ Product Added Successfully:", newProduct);
    return newProduct;
  } catch (error) {
    console.error("❌ Error Adding Product:", error);
    return null;
  }
};

import { Client, Account, Databases, Storage, ID, Query, Permission, Role } from "appwrite";

const client = new Client();
client
  .setEndpoint("https://cloud.appwrite.io/v1") // Appwrite API endpoint
  .setProject("67cad786002fe394c8a8"); //  actual Project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export { ID, Query };

const DATABASE_ID = "67cad7e600027ac7e8c0"; // Database ID
const SELLER_COLLECTION_ID = "67ea22e3000a9c49cd04"; // Seller Collection ID
const USER_COLLECTION_ID = "67f75de1003cacd68d8c"; // User Collection ID
const PRODUCT_COLLECTION_ID = "67ea560f00044ac3e66b"; // Product Collection ID
const STORAGE_BUCKET_ID = "67cad81f00268d3093c5"; // Storage Bucket ID


// ----------------------------- SELLER FUNCTIONS -----------------------------


 // ✅ Register a new seller

export const register = async (name, email, password) => {
  try {
    const newUser = await account.create(ID.unique(), email, password, name);
    console.log("✅ Seller Registered:", newUser);

    await databases.createDocument(
      DATABASE_ID,
      SELLER_COLLECTION_ID,
      ID.unique(),
      {
        name,
        email,
        userId: newUser.$id,
      }
    );

    return newUser;
  } catch (error) {
    console.error("❌ Seller Registration Error:", error);
    return null;
  }
};


//  ✅ Login seller
 
export const login = async (email, password) => {
  try {
    try {
      await account.deleteSession("current");
      console.log("✅ Removed existing session");
    } catch (err) {
      console.warn("⚠️ No active session to remove");
    }

    const session = await account.createEmailPasswordSession(email, password);
    console.log("✅ Seller Login Successful:", session);
    return session;
  } catch (error) {
    console.error("❌ Seller Login Error:", error);
    return null;
  }
};


// ----------------------------- USER FUNCTIONS -----------------------------


 // ✅ Register a new user 
 
export const userRegister = async (name, email, password) => {
  try {
    const newUser = await account.create(ID.unique(), email, password, name);
    await account.createEmailPasswordSession(email, password); // ✅ Required for permissions to work

    await databases.createDocument(
      DATABASE_ID,
      USER_COLLECTION_ID,
      ID.unique(),
      {
        name: name,
        email: email,
        userId: newUser.$id,
      },
      [
        Permission.read(Role.user(newUser.$id)),
        Permission.update(Role.user(newUser.$id)),
        Permission.delete(Role.user(newUser.$id)),
      ]
    );

    return newUser;
  } catch (error) {
    console.error("❌ User Registration Error:", error);
    return null;
  }
};


 // ✅ Login user 
 
export const userLogin = async (email, password) => {
  try {
    try {
      await account.deleteSession("current");
      console.log("✅ Removed existing session");
    } catch (err) {
      console.warn("⚠️ No active session to remove");
    }

    const session = await account.createEmailPasswordSession(email, password);
    console.log("✅ User Login Successful:", session);
    return session;
  } catch (error) {
    console.error("❌ User Login Error:", error);
    return null;
  }
};


// ----------------------------- COMMON FUNCTIONS -----------------------------


 // ✅ Logout 
export const logout = async () => {
  try {
    await account.deleteSession("current");
    console.log("✅ Logout Successful");
  } catch (error) {
    console.error("❌ Logout Error:", error.message);
  }
};


 // ✅ Get current logged-in user
 
export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    console.warn("⚠️ No user logged in");
    return null;
  }
};


// ----------------------------- PRODUCT FUNCTIONS -----------------------------


// ✅ Fetch products from Appwrite Database
 
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


 // ✅ Add Product to Database
 
export const addProduct = async (product) => {
  try {
    const user = await getCurrentUser(); // get logged-in seller
    let imageId = "";
    let imageUrl = "";

    if (product.image) {
      const file = await storage.createFile(STORAGE_BUCKET_ID, ID.unique(), product.image);
      imageId = file.$id;
      imageUrl = storage.getFilePreview(STORAGE_BUCKET_ID, imageId).href;
    }

    const newProduct = await databases.createDocument(
      DATABASE_ID,
      PRODUCT_COLLECTION_ID,
      ID.unique(),
      {
        name: product.name,
        price: parseFloat(product.price),
        category: product.category,
        description: product.description,
        image: imageUrl,
        sellerId: user?.$id || null,
      }
    );

    console.log("✅ Product Added Successfully:", newProduct);
    return newProduct;
  } catch (error) {
    console.error("❌ Error Adding Product:", error);
    return null;
  }
};

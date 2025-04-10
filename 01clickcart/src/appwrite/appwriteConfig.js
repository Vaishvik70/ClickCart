import { Client, Databases, Account, ID, Storage } from "appwrite"; 

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") 
  .setProject("67cad786002fe394c8a8"); 

export const databases = new Databases(client);
export const SELLER_COLLECTION_ID = "67ea22e3000a9c49cd04"; // Seller Collection ID
export const PRODUCT_COLLECTION_ID = "67ea560f00044ac3e66b"; // Product Collection ID
export const DATABASE_ID = "67cad7e600027ac7e8c0"; // Database ID

export const account = new Account(client);  
export const storage = new Storage(client); 
export { ID }; 

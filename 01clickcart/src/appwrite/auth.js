import { Client, Databases } from 'appwrite';

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('YOUR_PROJECT_ID'); // Your project ID

const databases = new Databases(client);

const fetchProducts = async () => {
    try {
        const response = await databases.listDocuments('YOUR_DATABASE_ID', 'YOUR_COLLECTION_ID');
        console.log(response);
    } catch (error) {
        console.error('Fetch Products Error:', error);
    }
};

fetchProducts();
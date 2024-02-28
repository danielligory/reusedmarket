import axios from 'axios';

const searchProducts = async (query, serverBaseUrl) => {
  try {
    const response = await axios.get(`${serverBaseUrl}/products?search=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

export default searchProducts;

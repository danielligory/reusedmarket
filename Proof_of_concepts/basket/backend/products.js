const { getDB } = require('./db');

const getProducts = async () => {
    const db = getDB();
    try {
        const products = await db.collection('products').find({}).toArray();
        return products;
    } catch (error) {
        console.error('Error fetching products', error);
        throw error;
    }
};

module.exports = { getProducts };
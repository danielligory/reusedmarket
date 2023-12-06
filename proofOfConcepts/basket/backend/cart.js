const { getDB } = require('./db');


const addToCart = async (userId, productId) => {
  const db = getDB();
  try {
    // Add product to user's cart array
    const result = await db.collection('users').updateOne(
      { _id: userId },
      { $addToSet: { cart: productId } }
    );

    if (result.modifiedCount === 1) {
      return `Added product ${productId} to the cart`;
    } else {
      return `Product ${productId} is already in your cart`;
    }
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

const removeFromCart = async (userId, productId) => {
  const db = getDB();
  try {
    // Remove product from user's cart array
    const result = await db.collection('users').updateOne(
      { _id: userId },
      { $pull: { cart:productId } }
    );

    if (result.modifiedCount === 1) {
      return `Remove product ${productId} from cart`
    } else {
      return `Product ${productId} was not found in the cart`;
    }
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

module.exports = { addToCart, removeFromCart };


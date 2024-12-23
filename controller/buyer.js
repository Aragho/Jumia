import Cart from "./models/Cart.js";
import CartItem from "./models/CartItem.js";

export const addToCart = async (buyerId, productId, quantity) => {
  // Find or create the cart for the buyer
  const [cart] = await Cart.findOrCreate({
    where: { buyerId },
  });

  // Check if the product is already in the cart
  const cartItem = await CartItem.findOne({
    where: { cartId: cart.id, productId },
  });

  if (cartItem) {
    // If the product is already in the cart, update the quantity
    cartItem.quantity += quantity;
    await cartItem.save();
    console.log("Cart item updated:", cartItem);
  } else {
    // If the product is not in the cart, add it
    const newCartItem = await CartItem.create({
      cartId: cart.id,
      productId,
      quantity,
    });
    console.log("New cart item added:", newCartItem);
  }
};


export const viewCart = async (buyerId) => {
    const cart = await Cart.findOne({
      where: { buyerId },
      include: {
        model: CartItem,
        as: "items",
        include: ["product"], // Include product details if linked
      },
    });
  
    if (!cart) {
      console.log("Cart is empty.");
      return;
    }
  
    console.log("Cart details:", cart);
};


export const removeFromCart = async (buyerId, productId) => {
    const cart = await Cart.findOne({ where: { buyerId } });
  
    if (!cart) {
      console.log("Cart not found.");
      return;
    }
  
    const cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });
  
    if (cartItem) {
      await cartItem.destroy();
      console.log("Product removed from cart.");
    } else {
      console.log("Product not found in cart.");
    }
};


export const clearCart = async (buyerId) => {
    const cart = await Cart.findOne({ where: { buyerId } });
  
    if (!cart) {
      console.log("Cart not found.");
      return;
    }
  
    await CartItem.destroy({ where: { cartId: cart.id } });
    console.log("Cart cleared.");
};
  
  
  

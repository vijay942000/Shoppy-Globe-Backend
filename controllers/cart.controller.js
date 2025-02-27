import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

//  Add a product to the cart (POST /cart)
export async function addToCart(req, res) {
    try {
        const { productId, quantity } = req.body;

        // Validate request before adding to cart
        if (!productId || !quantity) {
            return res.status(400).json({ message: "Product ID and quantity are required" });
        }

        // Check if product exists
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Add to cart
        const cartItem = new Cart({ productId, quantity });
        await cartItem.save();

        res.status(201).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Update quantity of a product in the cart 
export async function updateCart(req, res) {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity < 1) {
            return res.status(400).json({ message: "Quantity must be at least 1" });
        }

        const cartItem = await Cart.findByIdAndUpdate(id, { quantity }, { new: true });

        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Remove a product from the cart
export async function deleteFromCart(req, res) {
    try {
        const { id } = req.params;

        const cartItem = await Cart.findByIdAndDelete(id);
        if (!cartItem) {
            return res.status(404).json({ message: "Cart item not found" });
        }

        res.status(200).json({ message: "Product removed from cart" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Fetch all cart items
export async function getCart(req, res) {
    try {
        //populate("productId") tells Mongoose:Find the productId in the Product collection.Replace the ObjectId with the full product document


        const cartItems = await Cart.find().populate("productId");

        if (cartItems.length === 0) {
            return res.status(200).json({ message: "Cart is empty" });
        }

        res.status(200).json(cartItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

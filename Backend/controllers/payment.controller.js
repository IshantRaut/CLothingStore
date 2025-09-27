import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Empty cart" });
    }

    let totalAmount = products.reduce((acc, p) => acc + p.price * p.quantity, 0);

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
      if (coupon) totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
    }

    const amountInPaise = totalAmount * 100;

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: "order_" + Math.random().toString(36).substring(2, 10),
    });

    res.status(200).json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating payment", error: error.message });
  }
};

// Verify payment and create order
export const checkoutSuccess = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, products, couponCode } = req.body;

    // Validate signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    // Mark coupon as used
    if (couponCode) {
      await Coupon.findOneAndUpdate(
        { code: couponCode, userId: req.user._id },
        { isActive: false }
      );
    }

    const totalAmount = products.reduce((acc, p) => acc + p.price * p.quantity, 0);

    const newOrder = new Order({
      user: req.user._id,
      products: products.map((p) => ({
        product: p._id,
        quantity: p.quantity,
        price: p.price,
      })),
      totalAmount,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    await newOrder.save();

    res.status(200).json({
      success: true,
      message: "Payment successful and order created",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error processing payment", error: error.message });
  }
};

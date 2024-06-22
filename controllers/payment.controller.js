const stripe = require("stripe")(process.env.STRIPE_KEY);

class PaymentController {
  constructor(paymentRepository) {
    this.paymentRepository = paymentRepository;
  }

  async payWithStripe(req, userId) {
    try {
      const cart = await this.paymentRepository.payWithStripe(userId);
      const itemsIds = cart.itemsIds;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: itemsIds.map((item) => ({
          price_data: {
            currency: "usd",
            unit_amount: item.quantity * item.productId.price * 100,
            product_data: {
              name: item.productId.title,
              description: item.productId.description,
            },
          },
          quantity: 1,
        })),
        mode: "payment",
        success_url: `http://localhost:5173/paymentSuccess`,
        cancel_url: `http://localhost:5173/cart`,
        customer_email: "shimaaabd@gmnail.com", // Replace with actual customer email
      });

      return session;
    } catch (error) {
      console.error("Error processing payment:", error);
      throw error; // Rethrow the error for the caller to handle
    }
  }
}

module.exports = PaymentController;

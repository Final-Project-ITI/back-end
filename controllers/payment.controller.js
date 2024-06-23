const { BadRequestError } = require("../error/error");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

class PaymentController {
  constructor(cartRepository, authRepository) {
    this.cartRepository = cartRepository;
    this.authRepository = authRepository;
  }

  async payWithStripe(userId) {
    try {
      const cart = await this.cartRepository.getUserCart(userId);
      const itemsIds = cart.itemsIds;

      console.log("Cart:", cart);

      const user = await this.authRepository.getUser(userId);
      const customerEmail = user.email;

      const lineItems = itemsIds.map((item) => {
        const unitAmount = Math.round(item.productId.price * 100);

        if (isNaN(unitAmount) || unitAmount <= 0) {
          throw new Error(
            `Invalid unit amount: ${unitAmount} for item ${item.productId.title}`
          );
        }

        return {
          price_data: {
            currency: "usd",
            unit_amount: unitAmount,
            product_data: {
              name: item.productId.title,
              description: item.productId.description,
            },
          },
          quantity: item.quantity,
        };
      });

      const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: `http://localhost:5173/paymentSuccess`,
        cancel_url: `http://localhost:5173/cart`,
        customer_email: customerEmail,
      });

      return session;
    } catch (error) {
      console.error("Error in payWithStripe:", error.message);
      throw new BadRequestError(error.message);
    }
  }
}

module.exports = PaymentController;

const { BadRequestError } = require("../error/error");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

class PaymentController {
  constructor(
    cartRepository,
    authRepository,
    phoneRepository,
    orderRepository,
    itemRepository
  ) {
    this.cartRepository = cartRepository;
    this.authRepository = authRepository;
    this.phoneRepository = phoneRepository;
    this.orderRepository = orderRepository;
    this.itemRepository = itemRepository;
  }

  async payWithStripe({ phoneId, addressId }, userId) {
    try {
      const cart = await this.cartRepository.getUserCart(userId);
      const itemsIds = cart.itemsIds;


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
      ///////////////////////////////////////

      const phone = await this.phoneRepository.getUserPhoneNumberById(
        userId,
        phoneId
      );

      if (!phone) {
        throw new Errors.NotFoundError("can't find phone number");
      }

      const orderInfo = {
        phoneId,
        paymentMethodId: "667ae95124daa8cfea1cb7fa",
        paymentStatusId: "667ae98424daa8cfea1cb7fc",
        statusId: "6646747dd96fa5f4ee9cacd8",
        userId,
        addressId,
      };

      const order = await this.orderRepository.createNewOrder(orderInfo);

      cart.itemsIds.forEach(async (item) => {
        await this.itemRepository.updateUserItemById(
          { _id: item._id },
          { orderId: order._id }
        );
      });

      await this.cartRepository.deleteUserCart(userId);

      return session;
    } catch (error) {
      console.error("Error in payWithStripe:", error.message);
      throw new BadRequestError(error.message);
    }
  }
}

module.exports = PaymentController;

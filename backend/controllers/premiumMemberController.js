const Razorpay = require("razorpay");
const Order = require("../model/orders");

exports.purchasepremium = (req, res, next) => {
  try {
    var rzp = new Razorpay({
      key_id: "rzp_test_LbuGhJwSwmqPeJ",
      key_secret: "OqvYJgksErPAsLNDIYxod2Wx",
    });
    const amount = 2500;
    rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
      if (err) {
        throw new Error(JSON.stringify(err));
      }
      req.user
        .createOrder({ orderid: order.id, status: "PENDING" })
        .then(() => {
          return res.status(201).json({ order, key_id: rzp.key_id });
        })
        .catch((err) => {
          throw new Error(err);
        });
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({ message: "something went wrong", error: err });
  }
};

exports.updatetransactionstatus = async (req, res) => {
  try {
    const { payment_id, order_id } = req.body;
    const order = await Order.findOne({ where: { orderid: order_id } });
    const promise1 = order.update({ paymentid: payment_id, status: "success" });
    const promise2 = req.user.update({ ispremiumuser: true });

    await Promise.all([promise1, promise2]);
    return res
      .status(202)
      .json({ success: true, message: "transaction successful" });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "transaction unsuccessful" });
  }
};

import  Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: "rzp_test_pyPfJle0eNHKZJ",
  key_secret: "z2nimkq4wqBCRaM5h8WiVAfo",
});

export const createOrder = async (req, res) => {
  const options = {
    amount: req.body.amount,
    currency: req.body.currency,
    receipt: "receipt#1",
    payment_capture: 1,
  };

  //console.log("Options:", options);

  try {
    const response = await razorpay.orders.create(options);
    console.log("Response:", response);
    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error.response ? error.response.data : error);
    res.status(500).send("Internal server error");
  }
};

export const getPaymentDetails = async (req, res) => {
  const { paymentId } = req.params;

  try {
    const payment = await razorpay.payments.fetch(paymentId);

    if (!payment) {
      return res.status(500).json("Error at Razorpay loading");
    }

    res.json({
      status: payment.status,
      method: payment.method,
      amount: payment.amount,
      currency: payment.currency,
    });
  } catch (error) {
    res.status(500).json("Failed to fetch payment");
  }
};



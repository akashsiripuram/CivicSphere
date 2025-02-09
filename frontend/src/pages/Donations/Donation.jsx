import React, { useState } from "react";
import axios from "axios";

const Donation = () => {
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState("");

  const createRazorpayOrder = (amount) => {
    let data = JSON.stringify({ amount: amount * 100, currency: "INR" });

    let config = {
      method: "post",
      url: "http://localhost:8000/api/payments",
      headers: { "Content-Type": "application/json" },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        handleRazorpayScreen(response.data.amount);
      })
      .catch((error) => {
        console.log("error at", error);
      });
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Error loading Razorpay");
      return;
    }

    const options = {
      key: "rzp_test_pyPfJle0eNHKZJ",
      amount: amount,
      currency: "INR",
      name: "Sustainable Communities",
      description: "Donation Payment",
      image: "https://example.com/logo.png",
      handler: function (response) {
        console.log(response);
        alert("Payment Successful: " + response.razorpay_payment_id);
      },
    //   prefill: { name, email },
      theme: { color: "#F4C430" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createRazorpayOrder(amount);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Donate to Our Cause</h2>
        <input
          type="number"
          placeholder="Donation Amount (INR)"
          className="w-full p-2 border rounded mb-3"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <textarea
          placeholder="Message (Optional)"
          className="w-full p-2 border rounded mb-3"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
          onClick={handleSubmit}
        >
          Donate Now
        </button>
      </form>
    </div>
  );
};

export default Donation;

import { useState } from "react";
import { CreditCard, Wallet, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

export default function PaymentInterfaceDemo() {
  const [paymentType, setPaymentType] = useState("upi");
  const [message, setMessage] = useState("");

  const pay = () => {
    if (paymentType === "upi") {
      setMessage("UPI payment completed.");
    }

    if (paymentType === "card") {
      setMessage("Credit Card payment completed.");
    }

    if (paymentType === "wallet") {
      setMessage("Wallet payment completed.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Interface as Communication
      </h1>

      {/* Java Code */}
      <div className="bg-gray-900 text-green-400 font-mono p-5 rounded-xl mb-8">
{`interface Payment {
    void pay();
}

class UPI implements Payment {
    public void pay() {
        System.out.println("UPI Payment");
    }
}

class Card implements Payment {
    public void pay() {
        System.out.println("Card Payment");
    }
}

Payment payment;

payment.pay();`}
      </div>

      {/* Application */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Checkout Page
        </h2>

        <p className="mb-4">
          The checkout page only knows:
        </p>

        <div className="bg-blue-100 p-4 rounded-xl font-mono">
          payment.pay()
        </div>

      </div>

      {/* Interface */}
      <motion.div
        animate={{ scale: 1.05 }}
        className="bg-yellow-100 border-4 border-yellow-400 rounded-2xl p-6 mb-8 text-center"
      >
        <h2 className="text-3xl font-bold">
          Payment Interface
        </h2>

        <div className="mt-4 bg-white p-3 rounded">
          pay()
        </div>
      </motion.div>

      {/* Implementations */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <button
          onClick={() => setPaymentType("upi")}
          className={`p-6 rounded-xl ${
            paymentType === "upi"
              ? "bg-green-200 ring-4 ring-green-400"
              : "bg-white"
          }`}
        >
          <Smartphone size={50} />
          <div className="mt-3">
            UPI
          </div>
        </button>

        <button
          onClick={() => setPaymentType("card")}
          className={`p-6 rounded-xl ${
            paymentType === "card"
              ? "bg-blue-200 ring-4 ring-blue-400"
              : "bg-white"
          }`}
        >
          <CreditCard size={50} />
          <div className="mt-3">
            Credit Card
          </div>
        </button>

        <button
          onClick={() => setPaymentType("wallet")}
          className={`p-6 rounded-xl ${
            paymentType === "wallet"
              ? "bg-purple-200 ring-4 ring-purple-400"
              : "bg-white"
          }`}
        >
          <Wallet size={50} />
          <div className="mt-3">
            Wallet
          </div>
        </button>

      </div>

      {/* Communication */}
      <button
        onClick={pay}
        className="w-full bg-green-600 text-white p-5 rounded-xl text-2xl"
      >
        payment.pay()
      </button>

      {/* Output */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-yellow-100 border-l-8 border-yellow-500 p-5 rounded-xl"
        >
          {message}
        </motion.div>
      )}

      {/* Explanation */}
      <div className="mt-8 bg-green-100 border-l-8 border-green-500 p-6 rounded-xl">

        <h2 className="text-2xl font-bold mb-4">
          Why Interfaces Exist
        </h2>

        <p>
          The checkout page communicates with the
          Payment interface.
        </p>

        <p>
          It doesn't care whether the implementation
          is UPI, Card, or Wallet.
        </p>

        <div className="bg-white p-4 rounded mt-4 font-mono">
{`Checkout Page
      ↓
Payment Interface
      ↓
UPI / Card / Wallet`}
        </div>

      </div>

    </div>
  );
}
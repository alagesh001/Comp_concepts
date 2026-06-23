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

  {/* UPI */}
  <button
    onClick={() => setPaymentType("upi")}
    className={`
      relative overflow-hidden rounded-3xl p-6 text-left
      transition-all duration-300 transform
      hover:scale-105 hover:shadow-2xl
      ${
        paymentType === "upi"
          ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white ring-4 ring-green-300 scale-105"
          : "bg-white shadow-lg"
      }
    `}
  >
    {paymentType === "upi" && (
      <div className="absolute top-3 right-3 text-2xl">
        ✓
      </div>
    )}

    <Smartphone size={48} />

    <h3 className="text-2xl font-bold mt-4">
      UPI
    </h3>

    <p className="mt-2 opacity-80 text-sm">
      Google Pay, PhonePe, BHIM
    </p>

    <div className="mt-6 text-sm font-medium">
      Implements pay()
    </div>
  </button>

  {/* Card */}
  <button
    onClick={() => setPaymentType("card")}
    className={`
      relative overflow-hidden rounded-3xl p-6 text-left
      transition-all duration-300 transform
      hover:scale-105 hover:shadow-2xl
      ${
        paymentType === "card"
          ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white ring-4 ring-blue-300 scale-105"
          : "bg-white shadow-lg"
      }
    `}
  >
    {paymentType === "card" && (
      <div className="absolute top-3 right-3 text-2xl">
        ✓
      </div>
    )}

    <CreditCard size={48} />

    <h3 className="text-2xl font-bold mt-4">
      Card
    </h3>

    <p className="mt-2 opacity-80 text-sm">
      Visa, MasterCard
    </p>

    <div className="mt-6 text-sm font-medium">
      Implements pay()
    </div>
  </button>

  {/* Wallet */}
  <button
    onClick={() => setPaymentType("wallet")}
    className={`
      relative overflow-hidden rounded-3xl p-6 text-left
      transition-all duration-300 transform
      hover:scale-105 hover:shadow-2xl
      ${
        paymentType === "wallet"
          ? "bg-gradient-to-br from-purple-500 to-pink-600 text-white ring-4 ring-purple-300 scale-105"
          : "bg-white shadow-lg"
      }
    `}
  >
    {paymentType === "wallet" && (
      <div className="absolute top-3 right-3 text-2xl">
        ✓
      </div>
    )}

    <Wallet size={48} />

    <h3 className="text-2xl font-bold mt-4">
      Wallet
    </h3>

    <p className="mt-2 opacity-80 text-sm">
      Paytm, Amazon Pay
    </p>

    <div className="mt-6 text-sm font-medium">
      Implements pay()
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
import { useState } from "react";
import { Lock, Plus, Minus, Eye } from "lucide-react";
import { motion } from "framer-motion";

export default function EncapsulationDemo() {
  const [balance, setBalance] = useState(1000);
  const [returnedBalance, setReturnedBalance] = useState(null);
  const [message, setMessage] = useState(
    "Create an account object and call methods."
  );

const deposit = () => {
  setBalance((prev) => prev + 500);
  setReturnedBalance(null);
  setMessage("account.deposit(500)");
};

const withdraw = () => {
  if (balance >= 300) {
    setBalance((prev) => prev - 300);
    setReturnedBalance(null);
    setMessage("account.withdraw(300)");
  } else {
    setMessage("Insufficient balance");
  }
};

const getBalance = () => {
  setReturnedBalance(balance);
  setMessage("account.getBalance()");
};

  const directAccess = () => {
    setMessage(
      "❌ Cannot access private variable balance."
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <h1 className="text-4xl font-bold text-center mb-8">
        Encapsulation
      </h1>

      {/* Java Code */}
      <div className="bg-gray-900 text-green-400 font-mono p-5 rounded-xl mb-8 overflow-auto">
{`class BankAccount {

   private int balance = 1000;

   public void deposit(int amount) {
      balance += amount;
   }

   public void withdraw(int amount) {
      if(balance >= amount)
         balance -= amount;
   }

   public int getBalance() {
      return balance;
   }
}

BankAccount account = new BankAccount();

account.deposit(500);
account.withdraw(300);

System.out.println(
    account.getBalance()
);`}
      </div>

      {/* Object */}
      <div className="bg-white rounded-2xl shadow p-8 mb-8">

        <h2 className="text-3xl font-bold mb-6">
          account Object
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {/* Private Variable */}
          <div className="bg-red-100 p-6 rounded-xl border-2 border-red-300">

            <div className="flex items-center gap-3 mb-4">
              <Lock size={32} className="text-red-600" />
              <h3 className="text-xl font-bold">
                private balance
              </h3>
            </div>

            <motion.div
              key={balance}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-white p-5 rounded-xl text-center"
            >
              <div className="text-gray-500">
                Hidden Data
              </div>

              <div className="text-4xl font-bold text-green-600">
                ₹{balance}
              </div>
            </motion.div>

          </div>

          {/* Public Methods */}
          <div className="space-y-4">

            <div className="bg-green-100 p-4 rounded-xl">
              public deposit()
            </div>

            <div className="bg-blue-100 p-4 rounded-xl">
              public withdraw()
            </div>

            <div className="bg-yellow-100 p-4 rounded-xl">
              public getBalance()
            </div>

          </div>

        </div>

      </div>

      {/* Methods */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <button
          onClick={deposit}
          className="bg-green-600 text-white p-5 rounded-xl flex justify-center items-center gap-2 text-lg"
        >
          <Plus />
          deposit(500)
        </button>

        <button
          onClick={withdraw}
          className="bg-red-600 text-white p-5 rounded-xl flex justify-center items-center gap-2 text-lg"
        >
          <Minus />
          withdraw(300)
        </button>

        <button
          onClick={getBalance}
          className="bg-blue-600 text-white p-5 rounded-xl flex justify-center items-center gap-2 text-lg"
        >
          <Eye />
          getBalance()
        </button>

      </div>
{returnedBalance !== null && (
  <motion.div
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="bg-blue-100 border-2 border-blue-400 p-6 rounded-xl text-center mb-8"
  >
    <div className="text-gray-500">
      Returned Value
    </div>

    <div className="text-4xl font-bold text-blue-700">
      ₹{returnedBalance}
    </div>
  </motion.div>
)}
      {/* Direct Access */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">

        <h2 className="text-2xl font-bold mb-4">
          Outside Code
        </h2>

        <div className="bg-red-100 p-4 rounded mb-4 font-mono">
          account.balance = 50000;
        </div>

        <button
          onClick={directAccess}
          className="bg-gray-700 text-white px-6 py-3 rounded-xl"
        >
          Try Direct Access
        </button>

      </div>

      {/* Output */}
      <motion.div
        key={message}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-yellow-100 border-l-8 border-yellow-500 p-6 rounded-xl mb-8"
      >
        <h2 className="text-xl font-bold mb-2">
          Output
        </h2>

        <div className="text-lg">
          {message}
        </div>
      </motion.div>

      {/* Explanation */}
      <div className="bg-green-100 border-l-8 border-green-500 p-6 rounded-xl">

        <h2 className="text-2xl font-bold mb-4">
          What is Encapsulation?
        </h2>

        <p className="mb-2">
          The data (balance) is hidden inside the object.
        </p>

        <p className="mb-2">
          Outside code cannot directly change it.
        </p>

        <p className="mb-2">
          Public methods provide controlled access.
        </p>

        <div className="bg-white p-4 rounded-xl mt-4 font-mono">
{`account.deposit(500);     ✅

account.withdraw(300);   ✅

account.getBalance();    ✅

account.balance = 50000; ❌`}
        </div>

      </div>

    </div>
  );
}
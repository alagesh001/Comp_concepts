import { useState } from "react";
import {
  CreditCard,
  ArrowDown,
  XCircle,
  CheckCircle,
  RotateCcw,
  Plug,
} from "lucide-react";

export default function AdapterPaymentLab() {
  const [adapterAdded, setAdapterAdded] =
    useState(false);

  const [paymentStarted, setPaymentStarted] =
    useState(false);

  const [step, setStep] = useState(0);

  const makePayment = () => {
    setPaymentStarted(true);

    if (!adapterAdded) {
      setStep(1);
      return;
    }

    setStep(1);

    setTimeout(() => {
      setStep(2);
    }, 1000);

    setTimeout(() => {
      setStep(3);
    }, 2000);

    setTimeout(() => {
      setStep(4);
    }, 3000);
  };

  const reset = () => {
    setAdapterAdded(false);
    setPaymentStarted(false);
    setStep(0);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Title */}

      <h1 className="text-4xl font-bold text-center">
        Adapter Pattern
      </h1>

      <div className="bg-blue-100 p-6 rounded-2xl text-center">
        <p className="text-xl">
          Convert one interface into another
          interface that the client expects.
        </p>
      </div>

      {/* Controls */}

      <div className="flex flex-wrap justify-center gap-4">

        <button
          onClick={() =>
            setAdapterAdded(true)
          }
          disabled={adapterAdded}
          className="bg-green-600 text-white px-5 py-3 rounded-xl hover:scale-105 transition"
        >
          <Plug className="inline mr-2" />
          Add Adapter
        </button>

        <button
          onClick={makePayment}
          className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:scale-105 transition"
        >
          <CreditCard className="inline mr-2" />
          Pay ₹500
        </button>

        <button
          onClick={reset}
          className="bg-gray-600 text-white px-5 py-3 rounded-xl"
        >
          <RotateCcw className="inline mr-2" />
          Reset
        </button>
      </div>

      {/* Main Visualization */}

      <div className="grid md:grid-cols-3 gap-6">

        {/* Checkout */}

        <div
          className={`
            p-6 rounded-2xl text-center shadow transition-all duration-500
            ${
              step === 1
                ? "bg-blue-300 scale-110 ring-4 ring-blue-500"
                : "bg-blue-100"
            }
          `}
        >
          <h2 className="text-2xl font-bold">
            Checkout System
          </h2>

          <div className="mt-4 text-lg">
            pay(amount)
          </div>

          {step >= 1 && (
            <div className="mt-4 text-blue-700 font-bold animate-pulse">
              pay(500)
            </div>
          )}
        </div>

        {/* Adapter */}

        {adapterAdded ? (
          <div
            className={`
              p-6 rounded-2xl text-center shadow transition-all duration-500
              ${
                step === 2
                  ? "bg-yellow-300 scale-110 ring-4 ring-yellow-500"
                  : "bg-yellow-100"
              }
            `}
          >
            <h2 className="text-2xl font-bold">
              RazorpayAdapter
            </h2>

            <div className="mt-4">
              pay()
            </div>

            <div className="text-sm mt-2">
              ↓
            </div>

            <div>
              makePayment()
            </div>

            {step >= 2 && (
              <div className="mt-4 text-yellow-700 font-bold animate-pulse">
                Translating...
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-red-100 shadow text-center">
            <h2 className="text-2xl font-bold">
              No Adapter
            </h2>

            <div className="mt-5 text-red-600">
              Method mismatch
            </div>
          </div>
        )}

        {/* Razorpay */}

        <div
          className={`
            p-6 rounded-2xl text-center shadow transition-all duration-500
            ${
              step >= 3
                ? "bg-green-300 scale-110 ring-4 ring-green-500"
                : "bg-green-100"
            }
          `}
        >
          <h2 className="text-2xl font-bold">
            Razorpay
          </h2>

          <div className="mt-4">
            makePayment()
          </div>

          {step >= 3 && (
            <div className="mt-4 text-green-700 font-bold animate-pulse">
              makePayment(500)
            </div>
          )}
        </div>
      </div>

      {/* Arrows */}

      {adapterAdded && (
        <div className="flex justify-center gap-20 text-4xl">
          <div
            className={
              step >= 2
                ? "animate-bounce"
                : ""
            }
          >
            →
          </div>

          <div
            className={
              step >= 3
                ? "animate-bounce"
                : ""
            }
          >
            →
          </div>
        </div>
      )}

      {/* Result */}

      {paymentStarted && !adapterAdded && (
        <div className="bg-red-100 p-6 rounded-2xl text-center">

          <XCircle
            size={50}
            className="mx-auto text-red-600"
          />

          <div className="text-2xl font-bold text-red-700 mt-3">
            Checkout calls pay()

            <br />

            Razorpay only understands
            makePayment()

            <br />

            ❌ Failed
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="bg-green-100 p-6 rounded-2xl text-center animate-pulse">

          <CheckCircle
            size={50}
            className="mx-auto text-green-600"
          />

          <div className="text-2xl font-bold text-green-700 mt-3">
            Payment Successful
          </div>
        </div>
      )}

      {/* Flow */}

      <div className="bg-purple-100 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">
          Method Call Flow
        </h2>

        {!adapterAdded && (
          <pre>{`Checkout

pay(500)

    X

makePayment(500)

Razorpay`}</pre>
        )}

        {adapterAdded && (
          <pre>{`Checkout

pay(500)

     ↓

Adapter

pay(amount) {

    razorpay.makePayment(amount);

}

     ↓

Razorpay

makePayment(500)`}</pre>
        )}
      </div>

      {/* Memory */}

      <div className="bg-yellow-50 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">
          Object References
        </h2>

        {!adapterAdded && (
          <pre>{`checkout

    X

razorpay`}</pre>
        )}

        {adapterAdded && (
          <pre>{`checkout
    │
    ▼
adapter
    │
    ▼
razorpay`}</pre>
        )}
      </div>

      {/* Code */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-900 text-red-400 p-5 rounded-2xl">
          <h2 className="text-white text-xl mb-4">
            Without Adapter
          </h2>

          <pre>{`Checkout c =
    new Checkout();

Razorpay r =
    new Razorpay();

c.pay(r);

// ERROR`}</pre>
        </div>

        <div className="bg-gray-900 text-green-400 p-5 rounded-2xl">
          <h2 className="text-white text-xl mb-4">
            With Adapter
          </h2>

          <pre>{`PaymentGateway g =

    new RazorpayAdapter(
        new Razorpay()
    );

checkout.pay(g);`}</pre>
        </div>
      </div>

      {/* Java Adapter */}

      <div className="bg-gray-900 text-green-400 p-6 rounded-2xl">

        <h2 className="text-white text-2xl mb-5">
          Java Code
        </h2>

        <pre>{`interface PaymentGateway {
    void pay(int amount);
}

class Razorpay {

    void makePayment(int amount) {
    }
}

class RazorpayAdapter
implements PaymentGateway {

    private Razorpay razorpay;

    RazorpayAdapter(
        Razorpay razorpay
    ) {
        this.razorpay = razorpay;
    }

    public void pay(int amount) {
        razorpay.makePayment(amount);
    }
}`}</pre>
      </div>

    </div>
  );
}
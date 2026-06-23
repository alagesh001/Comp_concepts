import { useState } from "react";
import {
  Coffee,
  Plus,
  RotateCcw,
  CheckCircle,
} from "lucide-react";

export default function DecoratorLab() {
  const [milk, setMilk] =
    useState(false);

  const [sugar, setSugar] =
    useState(false);

  const [cream, setCream] =
    useState(false);

  const reset = () => {
    setMilk(false);
    setSugar(false);
    setCream(false);
  };

  let price = 100;

  if (milk) price += 20;
  if (sugar) price += 10;
  if (cream) price += 30;

  const layers = ["Coffee"];

  if (milk)
    layers.push("MilkDecorator");

  if (sugar)
    layers.push("SugarDecorator");

  if (cream)
    layers.push("CreamDecorator");

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Title */}

      <h1 className="text-4xl font-bold text-center">
        Decorator Pattern
      </h1>

      <div className="bg-blue-100 p-6 rounded-2xl text-center">
        <p className="text-xl">
          Add behavior dynamically by wrapping objects.
        </p>
      </div>

      {/* Problem */}

      <div className="bg-red-50 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">
          Without Decorator
        </h2>

        <div className="bg-gray-900 text-red-400 p-5 rounded-xl">
          <pre>{`MilkCoffee
SugarCoffee
CreamCoffee
MilkSugarCoffee
MilkCreamCoffee
SugarCreamCoffee
MilkSugarCreamCoffee`}</pre>
        </div>

        <div className="mt-4 text-red-700 font-bold">
          ❌ Too many classes.
        </div>
      </div>

      {/* Controls */}

      <div className="bg-green-50 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-5 text-center">
          Add Toppings
        </h2>

        <div className="flex flex-wrap justify-center gap-4">

          <button
            onClick={() =>
              setMilk(!milk)
            }
            className={`px-5 py-3 rounded-xl ${
              milk
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            🥛 Milk (+20)
          </button>

          <button
            onClick={() =>
              setSugar(!sugar)
            }
            className={`px-5 py-3 rounded-xl ${
              sugar
                ? "bg-yellow-500 text-white"
                : "bg-gray-200"
            }`}
          >
            🍬 Sugar (+10)
          </button>

          <button
            onClick={() =>
              setCream(!cream)
            }
            className={`px-5 py-3 rounded-xl ${
              cream
                ? "bg-purple-500 text-white"
                : "bg-gray-200"
            }`}
          >
            🍦 Cream (+30)
          </button>

          <button
            onClick={reset}
            className="bg-gray-700 text-white px-5 py-3 rounded-xl"
          >
            <RotateCcw />
          </button>
        </div>
      </div>

      {/* Wrapping Visualization */}

      <div className="bg-yellow-50 p-8 rounded-2xl">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Object Wrapping
        </h2>

        <div className="flex flex-col items-center gap-4">

          {[...layers].reverse().map(
            (layer, index) => (
              <div
                key={layer}
                className={`
                  px-10 py-6 rounded-2xl shadow-lg
                  animate-fade-in
                  ${
                    layer === "Coffee"
                      ? "bg-brown-200"
                      : "bg-blue-200"
                  }
                `}
                style={{
                  width:
                    350 - index * 30,
                }}
              >
                <div className="text-center text-xl font-bold">
                  {layer}
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Final Object */}

      <div className="bg-green-100 p-8 rounded-2xl text-center">

        <div className="text-6xl">
          ☕
        </div>

        <h2 className="text-3xl font-bold mt-4">
          Final Coffee
        </h2>

        <div className="text-xl mt-4">

          {layers.join(" → ")}

        </div>

        <div className="text-4xl font-bold text-green-700 mt-6">
          ₹{price}
        </div>
      </div>

      {/* Memory */}

      <div className="bg-purple-100 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">
          Memory References
        </h2>

        <pre>{layers
          .slice()
          .reverse()
          .join(
            "\n   ↓\n"
          )}</pre>
      </div>

      {/* Code */}

      <div className="bg-gray-900 text-green-400 p-6 rounded-2xl">

        <h2 className="text-white text-2xl mb-4">
          Java Example
        </h2>

        <pre>{`Coffee coffee =
    new BasicCoffee();

coffee =
    new MilkDecorator(
        coffee
    );

coffee =
    new SugarDecorator(
        coffee
    );

coffee =
    new CreamDecorator(
        coffee
    );

System.out.println(
    coffee.cost()
);`}</pre>
      </div>

      {/* Decorator Code */}

      <div className="bg-gray-900 text-green-400 p-6 rounded-2xl">

        <h2 className="text-white text-2xl mb-4">
          Decorator Class
        </h2>

        <pre>{`class MilkDecorator
implements Coffee {

    Coffee coffee;

    MilkDecorator(
        Coffee coffee
    ) {
        this.coffee = coffee;
    }

    public int cost() {
        return coffee.cost() + 20;
    }
}`}</pre>
      </div>

      {/* Heap */}

      <div className="bg-blue-100 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">
          Heap Objects
        </h2>

        <div className="text-center text-xl">

          BasicCoffee()

          {milk && (
            <>
              <div className="text-4xl">
                ↓
              </div>

              MilkDecorator
            </>
          )}

          {sugar && (
            <>
              <div className="text-4xl">
                ↓
              </div>

              SugarDecorator
            </>
          )}

          {cream && (
            <>
              <div className="text-4xl">
                ↓
              </div>

              CreamDecorator
            </>
          )}
        </div>
      </div>

      {/* Summary */}

      <div className="bg-green-200 p-6 rounded-2xl text-center">

        <CheckCircle
          size={40}
          className="mx-auto mb-3"
        />

        <div className="text-2xl font-bold">
          Behavior added without modifying
          the original object.
        </div>
      </div>

    </div>
  );
}
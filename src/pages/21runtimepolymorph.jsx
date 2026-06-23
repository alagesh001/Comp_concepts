import { useState } from "react";
import { Play } from "lucide-react";

export default function RuntimePolymorphism() {
  const animals = [
    {
      name: "Dog",
      emoji: "🐶",
      sound: "Woof Woof!",
      color: "bg-blue-200",
    },
    {
      name: "Cat",
      emoji: "🐱",
      sound: "Meow Meow!",
      color: "bg-pink-200",
    },
    {
      name: "Cow",
      emoji: "🐮",
      sound: "Moo Moo!",
      color: "bg-green-200",
    },
  ];

  const [animal, setAnimal] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-center">
        Runtime Polymorphism
      </h1>

      <div className="bg-purple-100 p-5 rounded-xl">
        <h2 className="font-bold text-xl mb-2">
          Method Overriding
        </h2>

        <p>
          Child classes override the same method.
        </p>
      </div>

      <div className="flex justify-center">
        <div className="bg-gray-200 px-8 py-4 rounded-xl">
          Animal
          <div className="mt-2 font-mono">
            speak()
          </div>
        </div>
      </div>

      <div className="text-center text-4xl">
        ↓
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {animals.map((a) => (
          <button
            key={a.name}
            onClick={() => setAnimal(a)}
            className={`${a.color} p-6 rounded-xl shadow hover:scale-105 transition`}
          >
            <div className="text-6xl">
              {a.emoji}
            </div>

            <h2 className="text-2xl font-bold mt-3">
              {a.name}
            </h2>

            <p>Overrides speak()</p>
          </button>
        ))}
      </div>

      <div className="bg-white shadow p-6 rounded-xl">
        <div className="text-center">
          <div className="font-mono text-2xl">
            Animal animal;
          </div>

          <div className="text-3xl my-4">
            ↓
          </div>

          <div className="font-mono text-2xl">
            animal.speak()
          </div>
        </div>

        {animal && (
          <div className="text-center mt-8">
            <div className="text-7xl">
              {animal.emoji}
            </div>

            {/* <button className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-lg flex gap-2 items-center mx-auto">
              <Play size={18} />
              Execute
            </button> */}

            <div className="mt-5 text-4xl font-bold text-green-700">
              {animal.sound}
            </div>
          </div>
        )}
      </div>

      <div className="bg-gray-900 text-green-400 p-5 rounded-xl">
        <pre>{`class Animal {
  speak() {
    console.log("Some sound");
  }
}

class Dog extends Animal {
  speak() {
    console.log("Woof");
  }
}

class Cat extends Animal {
  speak() {
    console.log("Meow");
  }
}

const animal = new Dog();
animal.speak(); // Woof
`}</pre>
      </div>

      <div className="bg-red-100 p-5 rounded-xl">
        <h2 className="font-bold mb-3">
          Why Runtime?
        </h2>

        <p>
          The actual object is determined while the
          program is running.
        </p>
      </div>
    </div>
  );
}
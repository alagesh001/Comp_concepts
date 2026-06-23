import { useState } from "react";
import {
  Bell,
  UserPlus,
  UserMinus,
  Send,
  RotateCcw,
} from "lucide-react";

export default function ObserverLab() {
  const [subscribers, setSubscribers] =
    useState([]);

  const [counter, setCounter] =
    useState(1);

  const [notified, setNotified] =
    useState([]);

  const subscribe = () => {
    const name =
      "User " + counter;

    setSubscribers([
      ...subscribers,
      {
        id: counter,
        name,
      },
    ]);

    setCounter(counter + 1);
  };

  const unsubscribe = (id) => {
    setSubscribers(
      subscribers.filter(
        (s) => s.id !== id
      )
    );
  };

  const notify = () => {
    setNotified([]);

    subscribers.forEach((sub, index) => {
      setTimeout(() => {
        setNotified((prev) => [
          ...prev,
          sub.id,
        ]);
      }, index * 700);
    });
  };

  const reset = () => {
    setSubscribers([]);
    setNotified([]);
    setCounter(1);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">

      {/* Title */}

      <h1 className="text-4xl font-bold text-center">
        Observer Pattern
      </h1>

      <div className="bg-blue-100 p-6 rounded-2xl text-center">
        <p className="text-xl">
          One object notifies many dependent
          objects automatically.
        </p>
      </div>

      {/* Controls */}

      <div className="flex flex-wrap justify-center gap-4">

        <button
          onClick={subscribe}
          className="bg-green-600 text-white px-5 py-3 rounded-xl flex gap-2"
        >
          <UserPlus />
          Subscribe
        </button>

        <button
          onClick={notify}
          disabled={
            subscribers.length === 0
          }
          className="bg-red-600 text-white px-5 py-3 rounded-xl flex gap-2"
        >
          <Bell />
          Upload Video
        </button>

        <button
          onClick={reset}
          className="bg-gray-600 text-white px-5 py-3 rounded-xl flex gap-2"
        >
          <RotateCcw />
          Reset
        </button>
      </div>

      {/* Subject */}

      <div className="flex justify-center">

        <div
          className="
            bg-red-200
            p-8
            rounded-2xl
            shadow-lg
            text-center
            w-80
          "
        >
          <div className="text-5xl">
            📺
          </div>

          <h2 className="text-2xl font-bold mt-4">
            YouTube Channel
          </h2>

          <div className="mt-3">
            Subject
          </div>
        </div>
      </div>

      {/* Arrows */}

      {subscribers.length > 0 && (
        <div className="text-center text-5xl">
          ↓
        </div>
      )}

      {/* Observers */}

      <div className="grid md:grid-cols-3 gap-5">

        {subscribers.map((sub) => (
          <div
            key={sub.id}
            className={`
              p-6 rounded-2xl shadow text-center
              transition-all duration-500
              ${
                notified.includes(
                  sub.id
                )
                  ? "bg-green-300 scale-110 animate-bounce ring-4 ring-green-500"
                  : "bg-blue-100"
              }
            `}
          >
            <div className="text-4xl">
              👤
            </div>

            <h2 className="text-xl font-bold mt-3">
              {sub.name}
            </h2>

            <div className="text-sm mt-2">
              Observer
            </div>

            {notified.includes(
              sub.id
            ) && (
              <div className="mt-4 text-green-700 font-bold animate-pulse">
                Notification Received
              </div>
            )}

            <button
              onClick={() =>
                unsubscribe(sub.id)
              }
              className="mt-4 text-red-600"
            >
              <UserMinus />
            </button>
          </div>
        ))}
      </div>

      {/* Notification Flow */}

      <div className="bg-yellow-50 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">
          Notification Flow
        </h2>

        <div className="text-center text-xl">

          Channel uploads video

          <div className="text-4xl py-2">
            ↓
          </div>

          notifyObservers()

          <div className="text-4xl py-2">
            ↓
          </div>

          Each subscriber gets update()
        </div>
      </div>

      {/* Memory */}

      <div className="bg-purple-50 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-4">
          References
        </h2>

        <pre>{`YouTubeChannel

subscribers[] ──────────────┐
                           │
                           ▼
                    User1 Observer

                           ▼
                    User2 Observer

                           ▼
                    User3 Observer`}</pre>
      </div>

      {/* Code */}

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-900 text-green-400 p-5 rounded-2xl">

          <h2 className="text-white text-xl mb-4">
            Subject
          </h2>

          <pre>{`class Channel {

    List<Subscriber>
        subscribers;

    subscribe();

    unsubscribe();

    notifyObservers();
}`}</pre>
        </div>

        <div className="bg-gray-900 text-green-400 p-5 rounded-2xl">

          <h2 className="text-white text-xl mb-4">
            Observer
          </h2>

          <pre>{`interface Subscriber {

    update();
}

class User
implements Subscriber {

    update() {
        System.out.println(
            "Notification"
        );
    }
}`}</pre>
        </div>
      </div>

      {/* Java Example */}

      <div className="bg-gray-900 text-green-400 p-6 rounded-2xl">

        <h2 className="text-white text-2xl mb-5">
          Java Example
        </h2>

        <pre>{`Channel channel =
    new Channel();

User u1 =
    new User();

User u2 =
    new User();

channel.subscribe(u1);

channel.subscribe(u2);

channel.uploadVideo();

// u1.update()
// u2.update()`}</pre>
      </div>

      {/* Real World */}

      <div className="bg-green-100 p-6 rounded-2xl">

        <h2 className="text-2xl font-bold mb-5">
          Real World Examples
        </h2>

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-white p-4 rounded-xl">
            📺 YouTube
          </div>

          <div className="bg-white p-4 rounded-xl">
            📈 Stock Market
          </div>

          <div className="bg-white p-4 rounded-xl">
            🌦 Weather App
          </div>

          <div className="bg-white p-4 rounded-xl">
            ⚛ React State
          </div>
        </div>
      </div>

      {/* Summary */}

      <div className="bg-blue-200 p-6 rounded-2xl text-center">

        <h2 className="text-2xl font-bold mb-4">
          Observer Pattern
        </h2>

        <div className="text-xl">

          Subject changes state

          <div className="text-4xl py-2">
            ↓
          </div>

          notifyObservers()

          <div className="text-4xl py-2">
            ↓
          </div>

          Observers automatically update
        </div>
      </div>

    </div>
  );
}
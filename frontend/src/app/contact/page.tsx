"use client";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-950 via-black to-green-950 text-white px-6 py-12">
      <div className="max-w-3xl mx-auto text-center mt-16">
        <h1 className="text-4xl font-extrabold mb-4 text-lime-400">Contact Us</h1>
        <p className="text-gray-300 mb-10">
          Got questions, feedback, or suggestions? Feel free to reach out directly through the following channels:
        </p>

        <div className="bg-green-900/20 border border-lime-600 p-6 rounded-xl shadow-lg text-left space-y-6 text-white text-lg">
          <div>
            <span className="font-semibold text-lime-400">📧 Email:</span>{" "}
            <a href="mailto:contactteamgeneva@gmail.com" className="underline hover:text-lime-300">
              contactteamgeneva@gmail.com
            </a>
          </div>

          <div>
            <span className="font-semibold text-lime-400">📍 Address:</span>{" "}
            Howrah, India, 711302
          </div>

          <div>
            <span className="font-semibold text-lime-400">📸 Instagram:</span>{" "}
            <a
              href="https://instagram.com/teamgeneva.india"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-lime-300"
            >
              @teamgeneva.india
            </a>
          </div>
        </div>

        <p className="mt-10 text-sm text-gray-400 italic">
          Just drop us a DM or an email — we're always listening.
        </p>
      </div>
    </main>
  );
}

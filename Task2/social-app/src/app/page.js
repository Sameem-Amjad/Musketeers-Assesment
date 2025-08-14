import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          Welcome to Social Connect
        </h1>
        <p className="text-gray-600 mb-6">
          Join our community, share your thoughts, and connect with people
          sharing similar interests.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/register"
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Register
          </Link>
          <Link
            href="/login"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </Link>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>It’s quick and free to get started 🚀</p>
        </div>
      </div>
    </div>
  );
}

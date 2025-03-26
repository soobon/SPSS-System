import { useNavigate } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function PaymentFailure() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center text-center">
        <XCircle className="text-red-600" size={64} />
        <h1 className="text-2xl font-semibold mt-4 text-red-600">Payment Failure!</h1>
        <p className="text-gray-500 mt-2">Your payment has been disrupted.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

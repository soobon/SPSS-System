import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center text-center">
        <CheckCircle className="text-gray-600" size={64} />
        <h1 className="text-2xl font-semibold mt-4">Payment Successful!</h1>
        <p className="text-gray-500 mt-2">Your payment has been completed.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg text-lg font-medium"
        >
          Finish
        </button>
      </div>
    </div>
  );
}

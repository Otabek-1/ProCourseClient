import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const correct = params.get("correct");
  const total = params.get("total");
  const unanswered = params.get("belgilanmaganlar");

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">Natija</h1>

        <p className="text-xl font-semibold text-green-600 mb-2">
          To‘g‘ri javoblar: {correct} / {total}
        </p>
        <p className="text-lg text-yellow-600 mb-4">
          Belgilanmagan savollar: {unanswered}
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/home")}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Bosh sahifaga qaytish
          </button>
          {/* <button
            onClick={() => navigate("/test")}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Testni qayta ishlash
          </button> */}
        </div>
      </div>
    </div>
  );
}

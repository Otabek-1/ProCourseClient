import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function TestInterface() {
  const navigate = useNavigate();
  const location = useLocation();

  // Backend'dan Dashboard'dan kelgan state
  // Backend response object edi, questions array ni olamiz
  const { tests: backendTests = [], duration = 60 } = location.state || {};
  const tests = backendTests || []; // endi tests array

  const [current, setCurrent] = useState(1);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(duration * 60);

  // Timer
  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }
    const interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleFinish = () => {
    let correct = 0;
    let unanswered = 0;

    tests.forEach((q) => {
      if (!answers[q.id]) {
        unanswered++;
      } else {
        const correctOption = q.options.find((o) => o.correct);
        if (answers[q.id].text === correctOption?.text) correct++;
      }
    });

    navigate(
      `/result?correct=${correct}&total=${tests.length}&belgilanmaganlar=${unanswered}`
    );
  };

  if (!tests || tests.length === 0) {
    return <div className="p-6 text-red-600">❌ Testlar topilmadi!</div>;
  }

  return (
    <div className="flex flex-col w-full h-screen bg-gray-50 text-gray-800">
      {/* Timer */}
      <div className="p-4 bg-indigo-600 text-white text-center font-bold text-lg">
        Vaqt: {formatTime(timeLeft)}
      </div>

      {/* Question navbar */}
      <div className="flex overflow-x-auto gap-2 p-3 bg-white shadow-sm">
        {tests.map((q, i) => (
          <button
            key={q.id || i}
            onClick={() => setCurrent(i + 1)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold 
              ${current === i + 1
                ? "bg-indigo-600 text-white"
                : answers[q.id]
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
              }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Question body */}
      <div className="flex-1 flex flex-col p-5 items-center justify-start">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
          {tests[current - 1]?.question}
        </h2>

        <div className="w-full max-w-xl flex flex-col gap-3">
          {tests[current - 1]?.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() =>
                setAnswers({ ...answers, [tests[current - 1].id]: opt })
              }
              className={`w-full p-4 rounded-xl border font-medium text-left transition 
                ${answers[tests[current - 1].id] === opt
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white hover:bg-gray-100 border-gray-300"
                }`}
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between p-4 bg-white border-t">
        <button
          disabled={current === 1}
          onClick={() => setCurrent((c) => c - 1)}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>

        {current === tests.length ? (
          <button
            onClick={handleFinish}
            className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
          >
            Finish
          </button>
        ) : (
          <button
            onClick={() => setCurrent((c) => c + 1)}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

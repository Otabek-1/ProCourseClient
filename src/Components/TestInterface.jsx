import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function TestInterface({ totalQuestions = 10, duration = 60 }) {
  const [current, setCurrent] = useState(1);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const navigate = useNavigate();

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

  // Mock savollar
  const questions = Array.from({ length: totalQuestions }, (_, i) => ({
    id: i + 1,
    text: `Savol ${i + 1}: Ingliz tilidan test savoli matni...`,
    options: ["A variant", "B variant", "C variant", "D variant"],
    correct: "A variant", // Mock uchun birinchi variant to‘g‘ri
  }));

  const handleFinish = () => {
    let correct = 0;
    let unanswered = 0;
    questions.forEach((q) => {
      if (!answers[q.id]) unanswered++;
      else if (answers[q.id] === q.correct) correct++;
    });

    navigate(
      `/result?correct=${correct}&total=${totalQuestions}&belgilanmaganlar=${unanswered}`
    );
  };

  return (
    <div className="flex flex-col w-full h-screen bg-gray-50 text-gray-800">
      {/* Timer */}
      <div className="p-4 bg-indigo-600 text-white text-center font-bold text-lg">
        Vaqt: {formatTime(timeLeft)}
      </div>

      {/* Question navbar */}
      <div className="flex overflow-x-auto gap-2 p-3 bg-white shadow-sm">
        {questions.map((q) => (
          <button
            key={q.id}
            onClick={() => setCurrent(q.id)}
            className={`px-3 py-2 rounded-lg text-sm font-semibold 
              ${current === q.id
                ? "bg-indigo-600 text-white"
                : answers[q.id]
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
              }`}
          >
            {q.id}
          </button>
        ))}
      </div>

      {/* Question body */}
      <div className="flex-1 flex flex-col p-5 items-center justify-start">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
          {questions[current - 1].text}
        </h2>

        <div className="w-full max-w-xl flex flex-col gap-3">
          {questions[current - 1].options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() =>
                setAnswers({ ...answers, [current]: opt })
              }
              className={`w-full p-4 rounded-xl border font-medium text-left transition 
                ${answers[current] === opt
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white hover:bg-gray-100 border-gray-300"
                }`}
            >
              {opt}
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

        {current === totalQuestions ? (
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

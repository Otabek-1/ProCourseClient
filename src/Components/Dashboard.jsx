import { Trophy, BarChart } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [openModal, setOpenModal] = useState(false);
    const [questions, setQuestions] = useState(10);
    const navigate = useNavigate();

    const startTest = async () => {
        try {
            const res = await axios.post("https://otabek.alwaysdata.net/tests", {
                limit: questions,
                category: "grammar",
            });

            // Dashboard.jsx ichida
            navigate("/test", { state: { tests: res.data.questions, duration: 60 } });

        } catch (err) {
            console.error("❌ Error fetching tests:", err);
        }
    };

    return (
        <div className="w-full gap-6">
            {/* Leaderboard (hozircha blur/lock qilib qo‘yamiz) */}
            <div className="bg-white p-6 rounded-xl shadow opacity-60 blur-sm cursor-not-allowed">
                <div className="flex items-center gap-3 mb-3">
                    <BarChart className="text-gray-400" size={24} />
                    <h3 className="font-semibold text-lg text-gray-500">Leaderboard</h3>
                </div>
                <p className="text-gray-500">Leaderboard available soon 🚀</p>
            </div>

            {/* Tests section */}
            <div className="tests flex flex-col gap-3 w-full rounded-lg shadow-xl mt-4 bg-white p-5 text-gray-800">
                <h3 className="text-2xl">Tests</h3>
                <div className="w-full h-full flex flex-wrap gap-3">
                    <div
                        onClick={() => setOpenModal(true)}
                        className="w-1/4 h-32 rounded-2xl shadow-xl 
            bg-gradient-to-r from-red-400 via-red-500 to-red-700
            p-6 text-white font-semibold cursor-pointer
            flex items-center justify-center text-xl
            hover:scale-105 hover:shadow-2xl hover:from-red-500 hover:to-red-800
            transition-all duration-300 ease-in-out"
                    >
                        Grammar
                    </div>
                </div>
            </div>

            {/* Modal */}
            {openModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6">
                        <h2 className="text-2xl font-bold mb-4">Grammar Test</h2>
                        <p className="text-gray-600 mb-3">
                            Ingliz tili grammatikasidan savollar to‘plami. <br />
                            Vaqt: <b>60 daqiqa</b>
                        </p>
                        <label className="block text-gray-700 mb-2 font-semibold">
                            Savollar soni:
                        </label>
                        <select
                            value={questions}
                            onChange={(e) => setQuestions(Number(e.target.value))}
                            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={25}>25</option>
                            <option value={30}>30</option>
                        </select>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="px-4 py-2 bg-gray-200 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={startTest}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                            >
                                Start
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

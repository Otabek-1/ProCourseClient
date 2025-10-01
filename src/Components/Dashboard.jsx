import { Trophy, BarChart, Swords } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
    const [openModal, setOpenModal] = useState(false);
    const [questions, setQuestions] = useState(10);

    return (
        <div className="w-full gap-6 md:grid-cols-4 lg:grid-cols-6">
            <div className="flex items-center w-full gap-2 justify-between">
                {/* Leaderboard card */}
                <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                    <div className="flex items-center gap-3 mb-3">
                        <BarChart className="text-indigo-600" size={24} />
                        <h3 className="font-semibold text-lg">Leaderboard</h3>
                    </div>
                    <p className="text-gray-600">
                        See where you stand among other learners and track your progress.
                    </p>
                    <b className="text-gray-700 pt-5">You are in 7th position in leaderboard.</b>
                </div>

                {/* Competitions card (disabled for now) */}
                <div className="bg-white p-6 rounded-xl shadow opacity-60 cursor-not-allowed">
                    <div className="flex items-center gap-3 mb-3">
                        <Trophy className="text-gray-400" size={24} />
                        <h3 className="font-semibold text-lg text-gray-500">Competitions</h3>
                    </div>
                    <p className="text-gray-500">
                        Competitions will be available soon. Stay tuned! 🚀
                    </p>
                </div>

                {/* Practice card */}
                {/* <div className="bg-white p-6 rounded-xl shadow">
                    <div className="flex items-center gap-3 mb-3">
                        <Swords className="text-orange-600" size={24} />
                        <h3 className="font-semibold text-lg text-black">Practice</h3>
                    </div>
                    <p className="text-gray-900">
                        Practice with test.
                    </p>
                    <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                        Show tests
                    </button>
                </div> */}
            </div>

            {/* Tests section */}
            <div className="tests flex flex-col gap-3 w-full min-h-100 h-max rounded-lg shadow-xl mt-4 bg-white p-5 text-gray-800">
                <h3 className="text-2xl">Tests</h3>

                <div className="w-full h-full flex flex-wrap gap-3">
                    {/* Grammar card */}
                    <div
                        onClick={() => setOpenModal(true)}
                        className="w-1/4 h-32 rounded-2xl shadow-xl 
                        bg-gradient-to-r from-red-400 via-red-500 to-red-700
                        p-6 text-white font-semibold 
                        backdrop-blur-md bg-opacity-90
                        hover:scale-105 hover:shadow-2xl hover:from-red-500 hover:to-red-800
                        transition-all duration-300 ease-in-out
                        flex items-center justify-center text-xl cursor-pointer"
                    >
                        Grammar
                    </div>
                </div>
            </div>

            {/* Modal */}
            {openModal && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-80 flex items-center justify-center z-50 
                    animate-fadeIn">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 relative 
                        transform transition-all duration-300 ease-out 
                        animate-scaleUp">
                        <h2 className="text-2xl font-bold mb-4">Grammar Test</h2>
                        <p className="text-gray-600 mb-3">
                            Ingliz tili grammatikasidan savollar to‘plami. <br />
                            Vaqt: <b>60 daqiqa</b>
                        </p>

                        {/* Select */}
                        <label className="block text-gray-700 mb-2 font-semibold">
                            Savollar soni:
                        </label>
                        <select
                            value={questions}
                            onChange={(e) => setQuestions(Number(e.target.value))}
                            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={25}>25</option>
                            <option value={30}>30</option>
                        </select>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    alert(`Boshlanmoqda... Savollar: ${questions}`);
                                    setOpenModal(false);
                                }}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
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

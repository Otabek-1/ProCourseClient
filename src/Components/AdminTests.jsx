import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function AdminTests() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [addMode, setAddMode] = useState(false);

  // Test qo‘shish form state
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([{ text: "", correct: false }]);

  const categories = [
    { id: 1, name: "Grammar", tests: 12, color: "from-red-400 via-red-500 to-red-700" },
    // { id: 2, name: "Vocabulary", tests: 8, color: "from-green-400 via-green-500 to-green-700" },
    // { id: 3, name: "Reading", tests: 5, color: "from-blue-400 via-blue-500 to-blue-700" },
    // { id: 4, name: "Listening", tests: 10, color: "from-purple-400 via-purple-500 to-purple-700" },
  ];

  const handleOpen = (cat) => {
    setSelectedCategory(cat);
    setOpenModal(true);
    setAddMode(false);
  };

  const handleAddOption = () => {
    setOptions([...options, { text: "", correct: false }]);
  };

  const handleOptionChange = (index, value) => {
    const updated = [...options];
    updated[index].text = value;
    setOptions(updated);
  };

  const handleCorrectChange = (index) => {
    const updated = options.map((opt, i) => ({
      ...opt,
      correct: i === index, // faqat bittasi true
    }));
    setOptions(updated);
  };

  const handleClear = () => {
    setQuestion("");
    setOptions([{ text: "", correct: false }]);
  };

  const handleSave = async () => {
    if (!question.trim()) {
      alert("Question maydonini to‘ldiring!");
      return;
    }

    const newTest = {
      category: selectedCategory?.name,
      question,
      options,
    };

    try {
      await axios.put("http://localhost:4000/add-test", newTest);
      alert("Test saqlandi! ✅");
      handleClear();
      setOpenModal(false);
    } catch (err) {
      console.error("❌ Error saving test:", err);
      alert("Test saqlanmadi ❌");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Tests</h1>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleOpen(cat)}
            className={`h-32 rounded-2xl shadow-xl 
                        bg-gradient-to-r ${cat.color}
                        p-6 text-white font-semibold 
                        backdrop-blur-md bg-opacity-90
                        hover:scale-105 hover:shadow-2xl 
                        transition-all duration-300 ease-in-out
                        flex items-center justify-center text-xl cursor-pointer`}
          >
            {cat.name}
          </div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {openModal && selectedCategory && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg p-6 w-[28rem] max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {!addMode ? (
                <>
                  <h2 className="text-xl font-bold mb-2 text-indigo-600">
                    {selectedCategory.name}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Grammar category.
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setOpenModal(false)}
                      className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setAddMode(true)}
                      className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
                    >
                      Add Test
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-4 text-indigo-600">
                    Add New Test - {selectedCategory.name}
                  </h2>

                  {/* Test Question */}
                  <label className="block mb-2 font-semibold">Question</label>
                  <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 mb-4"
                    placeholder="Enter test question..."
                  />

                  {/* Options */}
                  <label className="block mb-2 font-semibold">Options</label>
                  <div className="space-y-2 mb-4">
                    {options.map((opt, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 border p-2 rounded-lg"
                      >
                        <input
                          type="radio"
                          checked={opt.correct}
                          onChange={() => handleCorrectChange(idx)}
                          className="cursor-pointer"
                        />
                        <input
                          type="text"
                          value={opt.text}
                          onChange={(e) =>
                            handleOptionChange(idx, e.target.value)
                          }
                          placeholder={`Option ${idx + 1}`}
                          className="flex-1 border-b focus:outline-none px-2 py-1"
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={handleAddOption}
                    className="px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 mb-4"
                  >
                    + Add Option
                  </button>

                  {/* Actions */}
                  <div className="flex justify-between gap-3">
                    <button
                      onClick={handleClear}
                      className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                    >
                      Clear
                    </button>
                    <button
                      onClick={() => setAddMode(false)}
                      className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      Save Test
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

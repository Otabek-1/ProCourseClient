// components/Leaderboard.jsx
import { Crown } from "lucide-react";

const sampleData = [
  { id: 1, name: "Otabek", score: 980 },
  { id: 2, name: "Dilshod", score: 870 },
  { id: 3, name: "Madina", score: 820 },
  { id: 4, name: "Aziz", score: 790 },
  { id: 5, name: "Laylo", score: 720 },
];

export default function Leaderboard() {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow p-6">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Crown className="w-6 h-6 text-yellow-500" />
        Leaderboard
      </h2>

      {/* Table */}
      <div className="space-y-3">
        {sampleData.map((user, index) => (
          <div
            key={user.id}
            className={`flex justify-between items-center p-3 rounded-lg ${
              index === 0
                ? "bg-yellow-100"
                : index === 1
                ? "bg-gray-100"
                : index === 2
                ? "bg-orange-100"
                : "bg-gray-50"
            }`}
          >
            {/* Rank */}
            <span className="text-lg font-bold w-6">{index + 1}</span>

            {/* User name */}
            <span className="flex-1 ml-3 font-medium">{user.name}</span>

            {/* Score */}
            <span className="text-gray-700 font-semibold">{user.score}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

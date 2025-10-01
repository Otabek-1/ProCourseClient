import { Calendar, Clock, Trophy } from "lucide-react";

export default function Competitions() {
    // Demo data
    const activeCompetition = {
        name: "Grammar Challenge",
        description: "Test your English grammar skills and compete with others!",
        startTime: "2025-10-01 18:00",
        image: "https://picsum.photos/1000/500",
    };

    const pastCompetitions = [
        {
            id: 1,
            name: "Vocabulary Quiz Battle",
            date: "2025-09-20",
            winner: "John Doe",
        },
        {
            id: 2,
            name: "Listening Marathon",
            date: "2025-09-10",
            winner: "Sarah Smith",
        },
        {
            id: 3,
            name: "Reading Speed Contest",
            date: "2025-08-28",
            winner: "Michael Lee",
        },
    ];

    return (
        <div className="space-y-8 flex justify-center">
            {/* Active competition */}
            {/* <div className="relative w-full h-60 rounded-2xl overflow-hidden shadow-lg">
               
                <img
                    src={activeCompetition.image}
                    alt={activeCompetition.name}
                    className="absolute inset-0 w-full h-full object-cover"
                />

              
                <div className="absolute inset-0 bg-black/40"></div>

                
                <div className="relative z-10 flex flex-col justify-end h-full p-4 text-white">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Trophy className="w-6 h-6 text-yellow-400" />
                        {activeCompetition.name}
                    </h2>
                    <p className="text-sm opacity-90">{activeCompetition.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-200">
                        <Calendar className="w-4 h-4" />
                        {activeCompetition.startTime}
                    </div>
                </div>
            </div> */}

            {/* Past competitions */}
            {/* <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="text-yellow-500" /> Past Competitions
                </h3>
                <div className="space-y-4">
                    {pastCompetitions.map((comp) => (
                        <div
                            key={comp.id}
                            className="bg-white rounded-lg shadow p-4 flex justify-between items-center hover:shadow-md transition"
                        >
                            <div>
                                <h4 className="font-semibold">{comp.name}</h4>
                                <p className="text-sm text-gray-500">{comp.date}</p>
                            </div>
                            <span className="text-sm text-indigo-600 font-medium">
                                Winner: {comp.winner}
                            </span>
                        </div>
                    ))}
                </div>
            </div> */}

            <span className="text-gray-500 text-2xl">Competitions will be available soon.</span>
        </div>
    );
}

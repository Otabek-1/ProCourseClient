import { useState } from "react";
import { Menu, X, Home, Trophy, BarChart, User } from "lucide-react";
import Dashboard from "./Components/Dashboard";
import Competitions from "./Components/Competitions";
import Leaderboard from "./Components/LeaderBoard";
import Profile from "./Components/Profile";

export default function HomeUser() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("dashboard"); // default page

  const navItemStyle = (page) =>
    `flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
      active === page
        ? "bg-indigo-100 text-indigo-600 font-semibold"
        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:font-semibold"
    }`;

  // Sahifani tanlash
  const renderPage = () => {
    switch (active) {
      case "dashboard":
        return <Dashboard />;
      case "competitions":
        return <Competitions />;
      case "leaderboard":
        return <Leaderboard />;
      case "profile":
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-64 bg-white shadow flex-col">
        <div className="p-6 text-2xl font-bold text-indigo-600">ProCourse</div>
        <nav className="flex-1 space-y-2 p-4">
          <button onClick={() => setActive("dashboard")} className={navItemStyle("dashboard")}>
            <Home size={20} /> Dashboard
          </button>
          <button onClick={() => setActive("competitions")} className={navItemStyle("competitions")}>
            <Trophy size={20} /> Competitions
          </button>
          <button onClick={() => setActive("leaderboard")} className={navItemStyle("leaderboard")}>
            <BarChart size={20} /> Leaderboard
          </button>
          <button onClick={() => setActive("profile")} className={navItemStyle("profile")}>
            <User size={20} /> Profile
          </button>
        </nav>
      </aside>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setOpen(false)}
          ></div>
          <aside className="absolute left-0 top-0 w-64 h-full bg-white shadow p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold text-indigo-600">ProCourse</h1>
              <button onClick={() => setOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 space-y-2">
              <button
                onClick={() => {
                  setActive("dashboard");
                  setOpen(false);
                }}
                className={navItemStyle("dashboard")}
              >
                <Home size={20} /> Dashboard
              </button>
              <button
                onClick={() => {
                  setActive("competitions");
                  setOpen(false);
                }}
                className={navItemStyle("competitions")}
              >
                <Trophy size={20} /> Competitions
              </button>
              <button
                onClick={() => {
                  setActive("leaderboard");
                  setOpen(false);
                }}
                className={navItemStyle("leaderboard")}
              >
                <BarChart size={20} /> Leaderboard
              </button>
              <button
                onClick={() => {
                  setActive("profile");
                  setOpen(false);
                }}
                className={navItemStyle("profile")}
              >
                <User size={20} /> Profile
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top navbar (mobile only) */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-4 md:hidden">
          <h1 className="text-xl font-bold text-indigo-600">ProCourse</h1>
          <button onClick={() => setOpen(true)}>
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4">
            {active === "dashboard" && "Welcome back 👋"}
            {active === "competitions" && "Competitions"}
            {active === "leaderboard" && "Leaderboard"}
            {active === "profile" && "Your Profile"}
          </h2>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

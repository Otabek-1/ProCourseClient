import { useState } from "react";
import { Menu, X, Users, FileText, Trophy, BarChart, Settings } from "lucide-react";
import AdminUsers from "./AdminUsers";
import AdminTests from "./AdminTests";
import Leaderboard from "./LeaderBoard";
import Profile from "./Profile";

export default function AdminDashboard() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("users"); // default page

  const navItemStyle = (page) =>
    `flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
      active === page
        ? "bg-indigo-100 text-indigo-600 font-semibold"
        : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 hover:font-semibold"
    }`;

  const renderPage = () => {
    switch (active) {
      case "users":
        return <AdminUsers />;
      case "tests":
        return <AdminTests />;
      case "competitions":
        return <div>🏆 Manage competitions</div>;
      case "leaderboard":
        return <Leaderboard />;
      case "settings":
        return <Profile />;
      default:
        return <div>Welcome Admin</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-64 bg-white shadow flex-col">
        <div className="p-6 text-2xl font-bold text-indigo-600">ProCourse Admin</div>
        <nav className="flex-1 space-y-2 p-4">
          <button onClick={() => setActive("users")} className={navItemStyle("users")}>
            <Users size={20} /> Users
          </button>
          <button onClick={() => setActive("tests")} className={navItemStyle("tests")}>
            <FileText size={20} /> Tests
          </button>
          <button onClick={() => setActive("competitions")} className={navItemStyle("competitions")}>
            <Trophy size={20} /> Competitions
          </button>
          <button onClick={() => setActive("leaderboard")} className={navItemStyle("leaderboard")}>
            <BarChart size={20} /> Leaderboard
          </button>
          <button onClick={() => setActive("settings")} className={navItemStyle("settings")}>
            <Settings size={20} /> Settings
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
              <h1 className="text-xl font-bold text-indigo-600">Admin Panel</h1>
              <button onClick={() => setOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 space-y-2">
              <button onClick={() => { setActive("users"); setOpen(false); }} className={navItemStyle("users")}>
                <Users size={20} /> Users
              </button>
              <button onClick={() => { setActive("tests"); setOpen(false); }} className={navItemStyle("tests")}>
                <FileText size={20} /> Tests
              </button>
              <button onClick={() => { setActive("competitions"); setOpen(false); }} className={navItemStyle("competitions")}>
                <Trophy size={20} /> Competitions
              </button>
              <button onClick={() => { setActive("leaderboard"); setOpen(false); }} className={navItemStyle("leaderboard")}>
                <BarChart size={20} /> Leaderboard
              </button>
              <button onClick={() => { setActive("settings"); setOpen(false); }} className={navItemStyle("settings")}>
                <Settings size={20} /> Settings
              </button>
            </nav>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top navbar (mobile only) */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-4 md:hidden">
          <h1 className="text-xl font-bold text-indigo-600">Admin Panel</h1>
          <button onClick={() => setOpen(true)}>
            <Menu size={24} />
          </button>
        </header>

        <main className="flex-1 p-6">
          <h2 className="text-2xl font-bold mb-4 capitalize">{active}</h2>
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

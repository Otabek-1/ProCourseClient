// components/Profile.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(null); // "logout" | "delete" | null
  const [loading, setLoading] = useState(true);
  const user_from_loc = localStorage.getItem("user"); // string
  const userObj = JSON.parse(user_from_loc); // endi obyekt
  const userId = userObj.userId; // "2"


  // GET user data by ID
  useEffect(() => {
    if (!userId) {
      navigate("/auth");
      return;
    }
    axios
      .get(`https://otabek.alwaysdata.net/user/${userId}`)
      .then((res) => {
        setName(res.data.full_name);
        setEmail(res.data.email);
      })
      .catch((err) => console.error("❌ Error fetching user:", err))
      .finally(() => setLoading(false));
  }, [userId, navigate]);

  // Update profile
  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("https://otabek.alwaysdata.net/user", { id: userId, full_name:name, email, password })
      .then(() => alert("Profile updated ✅"))
      .catch((err) => console.error("❌ Error updating profile:", err));
  };

  // Delete account
  const handleDelete = () => {
    axios
      .delete(`https://otabek.alwaysdata.net/user/${userId}`)
      .then(() => {
        localStorage.removeItem("id");
        alert("Account deleted ❌");
        navigate("/auth");
      })
      .catch((err) => console.error("❌ Error deleting account:", err));
  };

  // Log out
  const handleLogout = () => {
    axios
      .post("https://otabek.alwaysdata.net/auth/logout", { id: userId })
      .finally(() => {
        localStorage.removeItem("id");
        navigate("/auth");
      });
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white shadow rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-300"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-indigo-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
        >
          Update Profile
        </button>
      </form>

      {/* Danger zone */}
      <div className="mt-6 border-t pt-6 space-y-3">
        <button
          onClick={() => setModal("logout")}
          className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
        >
          Log Out
        </button>
        <button
          onClick={() => setModal("delete")}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-2xl shadow max-w-sm w-full">
            <h3 className="text-lg font-bold mb-3">
              {modal === "logout"
                ? "Log Out Confirmation"
                : "Delete Account Confirmation"}
            </h3>
            <p className="mb-4 text-gray-600">
              {modal === "logout"
                ? "Are you sure you want to log out?"
                : "This action is permanent. Do you really want to delete your account?"}
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setModal(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setModal(null);
                  modal === "logout" ? handleLogout() : handleDelete();
                }}
                className={`px-4 py-2 rounded-lg text-white ${modal === "logout"
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-red-600 hover:bg-red-700"
                  }`}
              >
                {modal === "logout" ? "Log Out" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

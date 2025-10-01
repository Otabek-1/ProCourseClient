import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2 } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [deleteUser, setDeleteUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Foydalanuvchilarni olish
  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://otabek.alwaysdata.net/users");
      setUsers(res.data);
    } catch (err) {
      console.error("❌ Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Search filter
  const filteredUsers = users.filter(
    (u) =>
      u.full_name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  // Delete user
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://otabek.alwaysdata.net/user/${id}`);
      setUsers(users.filter((u) => u.id !== id));
      setDeleteUser(null);
    } catch (err) {
      console.error("❌ Error deleting user:", err);
    }
  };

  if (loading) {
    return <div className="p-6 text-gray-600">Loading users...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search users..."
        className="w-full mb-4 p-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Users List */}
      <ul className="space-y-3">
        {filteredUsers.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center p-3 bg-white rounded-lg shadow hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold">{user.full_name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={() => setDeleteUser(user)}
              className="text-red-500 hover:text-red-700 transition"
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>

      {/* Delete Modal */}
      {deleteUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-2">Delete Account</h2>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deleteUser.full_name}</span>'s
              account? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteUser(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteUser.id)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

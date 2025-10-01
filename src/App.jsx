import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Trophy, Users, ClipboardList } from "lucide-react";
import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-blue-100">
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">ProCourse</h1>
        <div className="space-x-4">
          <Link to="/auth" className="px-4 py-2 rounded-lg font-medium bg-blue-600 text-white hover:bg-blue-700">
            Login
          </Link>
          <Link to="/auth" className="px-4 py-2 rounded-lg font-medium bg-gray-100 hover:bg-gray-200">
            Register
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center text-center px-6 py-20"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          Learn English the Smart Way 🚀
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mb-6">
          ProCourse — ingliz tili o‘quv platformasi. Testlar, Mock Exams,
          Leaderboard va musobaqalar orqali bilimingizni sinab ko‘ring va
          do‘stlaringiz bilan bellashing!
        </p>
        <Link to="/auth" className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700">
          Get Started
        </Link>
      </motion.section>

      {/* Features */}
      <section className="grid gap-8 md:grid-cols-4 px-6 py-16 max-w-6xl mx-auto">
        <FeatureCard
          Icon={ClipboardList}
          title="Interactive Tests"
          text="Har kuni yangi testlar orqali grammatika va vocabularyni mustahkamlash."
        />
        <FeatureCard
          Icon={BookOpen}
          title="Mock Exams"
          text="IELTS va boshqa imtihonlarga tayyorlov uchun haqiqiy sharoitdagi testlar."
        />
        <FeatureCard
          Icon={Trophy}
          title="Leaderboard"
          text="Eng faol va bilimli o‘quvchilar ro‘yxati — top 10talikka chiqishga harakat qiling."
        />
        <FeatureCard
          Icon={Users}
          title="Competitions"
          text="Do‘stlaringiz bilan musobaqalarga qo‘shiling va yutuqlarni qo‘lga kiriting."
        />
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-center px-6 py-20 bg-blue-600 text-white"
      >
        <h3 className="text-3xl font-bold mb-4">
          Ready to level up your English?
        </h3>
        <p className="mb-6 text-lg">
          Hozir ro‘yxatdan o‘ting va ProCourse bilan o‘rganishni boshlang.
        </p>
        <Link to="/auth" className="px-8 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-gray-100">
          Join Now
        </Link>
      </motion.section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-600 text-sm">
        © {new Date().getFullYear()} ProCourse. All rights reserved.
      </footer>
    </div>
  );
}

function FeatureCard({ Icon, title, text }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl p-6 shadow-md text-center"
    >
      <Icon className="w-12 h-12 mx-auto text-blue-600 mb-4" />
      <h4 className="font-bold text-lg mb-2">{title}</h4>
      <p className="text-gray-600 text-sm">{text}</p>
    </motion.div>
  );
}

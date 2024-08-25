import React, { useState } from "react";
import { FaList } from "react-icons/fa6";
import { FaListAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  onViewModeChange: (mode: "list" | "grid") => void;
  currentViewMode: "list" | "grid";
}

const Sidebar: React.FC<SidebarProps> = ({
  onViewModeChange,
  currentViewMode,
}) => {
  const toggleViewMode = () => {
    onViewModeChange(currentViewMode === "list" ? "grid" : "list");
  };

  const navigate = useNavigate();

  const handleclick = () => {
    navigate("/form");
  };

  return (
    <aside className="w-64 h-screen p-6 bg-white border-r shadow-lg">
      <header className="flex items-center gap-4 mb-10">
        <img
          src="/avatar.png"
          alt="User avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h1 className="text-xl font-bold">Hi Reader,</h1>
          <p className="text-sm text-gray-500">Here's your News!</p>
        </div>
      </header>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-bold text-gray-800">View Toggle</h2>
        <div className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg">
          <button
            onClick={toggleViewMode}
            aria-label="List view"
            className={`p-2 ${
              currentViewMode === "list" ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <FaListAlt />
          </button>
          <button
            onClick={toggleViewMode}
            aria-label="Grid view"
            className={`p-2 ${
              currentViewMode === "grid" ? "text-blue-500" : "text-gray-500"
            }`}
          >
            <FaList />
          </button>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold text-gray-800">
          Have a Feedback?
        </h2>
        <button
          onClick={handleclick}
          className="w-full py-3 text-center text-white rounded-lg bg-emerald-500 hover:bg-emerald-400"
        >
          We're Listening!
        </button>
      </section>
    </aside>
  );
};

export default Sidebar;

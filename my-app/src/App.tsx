import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import NewsCards from "./components/NewsCards";
import Form from "./components/Form";

const App: React.FC = () => {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const handleViewModeChange = (mode: "list" | "grid") => {
    setViewMode(mode);
  };

  return (
    <BrowserRouter>
      <div className="flex h-screen">
        <Sidebar
          onViewModeChange={handleViewModeChange}
          currentViewMode={viewMode}
        />
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<NewsCards viewMode={viewMode} />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;

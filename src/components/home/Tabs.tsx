"use client";
import React, { useState } from "react";

interface TabsProps {
  tabs: string[];
  defaultActive: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, defaultActive }) => {
  const [activeTab, setActiveTab] = useState<string>(defaultActive);

  return (
    <div className="mt-6 flex justify-center items-center gap-3">
      {tabs.map((tab, index) => (
        <button
          key={index}
          onClick={() => setActiveTab(tab)}
          className={`cursor-pointer disabled:cursor-not-allowed text-[#6C6C6C] text-sm ${
            activeTab === tab
              ? "text-white bg-multi-gradient"
              : "bg-[var(--color-purple)]/10"
          } rounded-full px-5 py-2 transition-all duration-500`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

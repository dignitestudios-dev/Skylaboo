"use client";
import { Category } from "@/lib/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

interface TabsProps {
  isShopPage?: boolean;
  tabs: Category[];
  defaultActiveTabId?: string | null;
  onTabChange?: any;
}

const Tabs: React.FC<TabsProps> = ({
  isShopPage = false,
  tabs,
  defaultActiveTabId,
  onTabChange,
}) => {
  const defaultTab = {
    _id: "",
    name: "All",
  };
  const [activeTabId, setActiveTabId] = useState<string>(defaultTab._id);

  const tabsWithAll = useMemo(() => [defaultTab, ...tabs], [tabs]);

  const handleTabChange = (tabId: string) => {
    if (!tabId && tabId !== "") return;
    setActiveTabId(tabId);
    onTabChange?.(tabId);
  };

  useEffect(() => {
    setActiveTabId(defaultActiveTabId || "");
  }, [defaultActiveTabId]);

  return (
    <div className="mt-6 flex justify-center items-center flex-wrap sm:gap-3 gap-2">
      {tabsWithAll.map((tab, index) => (
        <button
          key={index}
          onClick={() => handleTabChange(tab?._id)}
          className={`cursor-pointer disabled:cursor-not-allowed text-[#6C6C6C] sm:text-sm text-xs ${
            activeTabId === tab?._id
              ? "text-white bg-multi-gradient"
              : `${isShopPage ? "bg-white/65" : "bg-[var(--color-purple)]/10"}`
          } rounded-full sm:px-5 px-4 py-2 transition-all duration-500`}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default Tabs;

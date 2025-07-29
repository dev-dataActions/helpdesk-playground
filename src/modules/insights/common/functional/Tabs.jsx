import { useEffect, useState } from "react";
import { Dropdown } from "../base/Dropdown";
import { Button } from "../base/Button";
import { classNames } from "../util/general.util";
import { useRouter } from "next/router";

export const Tabs = ({ tabs, onTabChange }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState(tabs.find((t) => t.current)?.value ?? tabs[0].value);
  const currentComponent = tabs.find((t) => t.value === selectedTab)?.component;

  const handleTabChange = (value) => {
    try {
      setSelectedTab(value);
      if (onTabChange && typeof onTabChange === "function") {
        onTabChange(value);
      }
    } catch (error) {
      console.error("Tab change error:", error);
    }
  };

  useEffect(() => {
    const tab = tabs.find((t) => t.value === selectedTab);
    if (tab?.href) router.push(tab?.href);
  }, [selectedTab]);

  return (
    <div className="deepdive-tabs rounded-md">
      <div className="sm:hidden mb-3">
        <Dropdown id="tabs" options={tabs} selectedOption={selectedTab} setSelectedOption={handleTabChange} />
      </div>
      <div className="hidden sm:!block mb-1">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex gap-2" aria-label="Tabs">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                label={tab.label}
                onClick={() => handleTabChange(tab.value)}
                className={classNames(
                  tab.value === selectedTab
                    ? "border-blue-700 text-blue-700"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "min-w-32 border-b-2 pb-2 px-2 text-sm rounded-none shadow-transparent text-left"
                )}
              />
            ))}
          </nav>
        </div>
      </div>
      {currentComponent}
    </div>
  );
};

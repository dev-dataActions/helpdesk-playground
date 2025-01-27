import { useState } from "react";
import { Button } from "../base/Button";
import { Select } from "../base/Select";
import { classNames } from "../utils/general.util";

export const Tabs = ({ tabs, selectedTab, onTabChange }) => {
  const [_selectedTab, _setSelectedTab] = useState(selectedTab ?? tabs[0]);
  return (
    <div className="deepdive-tabs">
      <div className="sm:hidden">
        <Select
          options={tabs}
          id="tabs"
          onChange={(e) => {
            (onTabChange ?? _setSelectedTab)(tabs.find((tab) => tab.id === e.target.value));
          }}
          value={(selectedTab ?? _selectedTab)?.id}
        />
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex w-1/4" aria-label="Tabs">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                label={tab.title}
                onClick={() => (onTabChange ?? _setSelectedTab)(tab)}
                className={classNames(
                  tab.id === (selectedTab ?? _selectedTab)?.id
                    ? "border-blue-800 text-blue-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "border-b-2 text-sm font-medium rounded-none shadow-transparent"
                )}
              />
            ))}
          </nav>
        </div>
      </div>
      {(selectedTab ?? _selectedTab)?.component}
    </div>
  );
};

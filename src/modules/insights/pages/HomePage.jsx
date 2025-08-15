import { useCallback, useState } from "react";
import { PinnedDecisions } from "../components/PinnedDecisions";
import { PinnedMetrics } from "../components/PinnedMetrics";
import { SearchResultsPanel } from "../components/SearchResultsPanel";
import { HiOutlineSparkles, HiOutlineSearch } from "react-icons/hi";
import { useDecisionTree } from "../hooks/useDecisionTree";

const DecisionSearch = ({ workspaceId, appId, handleNavigate }) => {
  const { decisionTree, loading, error } = useDecisionTree(workspaceId, appId);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsSearchActive(true);
  };

  const handleSearchClose = () => {
    setIsSearchActive(false);
    setSearchTerm("");
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <HiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
      <input
        id="decision-search-input"
        type="text"
        placeholder="Search decision, explore hierarchy, or find specific metrics..."
        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl shadow-sm bg-white"
        value={searchTerm}
        onFocus={() => setIsSearchActive(true)}
        onChange={handleSearchChange}
        disabled={loading || error}
      />

      {/* Search Results Panel */}
      {isSearchActive && (
        <SearchResultsPanel
          searchTerm={searchTerm}
          onClose={handleSearchClose}
          decisionTree={decisionTree}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
};

/**
 * HomePage component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {string} props.workspaceId - Workspace ID
 * @param {string} props.appId - App ID
 * @param {Function} props.onNavigate - Navigation handler function
 */
export const HomePage = ({
  workspaceId = process.env.NEXT_PUBLIC_WORKSPACE_ID,
  appId = process.env.NEXT_PUBLIC_CFA_APP_ID,
  onNavigate = null,
}) => {
  const handleNavigate = useCallback((path) => onNavigate?.(path)[onNavigate]);

  return (
    <div>
      <div className="max-w-5xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-12 max-w-5xl mx-auto">
          {/* AI Badge */}
          <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full mb-3">
            <HiOutlineSparkles className="w-4 h-4 text-blue-700" />
            <p className="text-xs font-medium text-blue-700">Decision Analytics</p>
          </div>

          {/* Main Heading */}
          <div className="mb-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-1">Make Better Decisions</h1>
            <p className="text-gray-500">
              Access comprehensive decision boards with real-time metrics, performance insights, and actionable data to
              drive your business forward.
            </p>
          </div>

          {/* Search Bar */}
          <DecisionSearch workspaceId={workspaceId} appId={appId} handleNavigate={handleNavigate} />
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Pinned Metrics Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              <h2 className="text-lg font-semibold text-gray-900">Pinned Metrics</h2>
            </div>

            <PinnedMetrics />
          </div>

          {/* Pinned Decisions Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
              <h2 className="text-lg font-semibold text-gray-900">Pinned Decisions</h2>
            </div>

            <PinnedDecisions workspaceId={workspaceId} appId={appId} onNavigate={handleNavigate} />
          </div>
        </div>
      </div>
    </div>
  );
};

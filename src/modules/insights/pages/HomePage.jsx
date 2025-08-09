import { useCallback } from "react";
import { RecentDecisions } from "../components/RecentDecisions";
import { PinnedDecisions } from "../components/PinnedDecisions";
import { HiOutlineSparkles, HiOutlineSearch, HiOutlineChartBar, HiOutlineLightningBolt } from "react-icons/hi";

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
  const handleNavigate = useCallback(
    (path) => {
      try {
        if (onNavigate && typeof onNavigate === "function") {
          onNavigate(path);
        }
      } catch (error) {
        console.error("Navigation error:", error);
      }
    },
    [onNavigate]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          {/* AI Badge */}
          <div className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-xs font-medium mb-4">
            <HiOutlineSparkles className="w-4 h-4" />
            AI-Powered Decision Analytics
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-4 leading-tight">
            What decision would you like to analyze?
          </h1>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <HiOutlineSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
            <input
              type="text"
              placeholder="Search decisions, ask AI for insights, or analyze patterns..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Favorite Metrics Section */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-1.5 mb-3">
            <HiOutlineChartBar className="w-4 h-4 text-gray-600" />
            <h2 className="text-sm font-semibold text-gray-600">Pinned metrics</h2>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-8 text-center">
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-2">
              <span className="text-emerald-600 font-semibold text-sm">$</span>
            </div>
            <p className="text-gray-500 text-sm">Add your favorite metrics to see insights here</p>
          </div>
        </div>

        {/* Pinned Decisions Section */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-1.5 mb-3">
            <HiOutlineLightningBolt className="w-4 h-4 text-gray-600" />
            <h2 className="text-sm font-semibold text-gray-600">Pinned decisions</h2>
          </div>

          <PinnedDecisions workspaceId={workspaceId} appId={appId} onNavigate={handleNavigate} />
        </div>
      </div>
    </div>
  );
};

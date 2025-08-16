import { useState, useEffect, useCallback, useMemo } from "react";
import { HiOutlineChevronDown, HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import { RxTarget } from "react-icons/rx";
import { FiSearch } from "react-icons/fi";

// Recursive component to render decision nodes
const DecisionNode = ({
  node,
  onNodeSelect,
  onToggleCollapse,
  collapsedNodes,
  countTotalNodes,
  isSearchMode = false,
}) => {
  const isCollapsed = collapsedNodes.has(node.id);
  const hasChildren = node.children?.length > 0;

  return (
    <div>
      <div
        className="flex items-center gap-3 px-4 py-3 cursor-pointer transition-all duration-200 text-sm hover:text-blue-900 hover:bg-blue-50 border-l-2 border-l-transparent hover:border-l-blue-500"
        onClick={() => onNodeSelect(node)}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          {!isSearchMode ? (
            <div className="flex items-center gap-2" style={{ marginLeft: `${node.level * 28}px` }}>
              {node.level > 0 && (
                <div className="flex items-center gap-1">
                  <div className="w-6 h-px bg-gradient-to-r from-blue-200 to-blue-300"></div>
                  <div className="w-2 h-2 rounded-full bg-blue-400 shadow-sm"></div>
                </div>
              )}
              <div
                className={`flex-shrink-0 ${
                  hasChildren ? "cursor-pointer hover:bg-blue-100 p-1 rounded transition-colors hover:scale-110" : ""
                }`}
                onClick={hasChildren ? (e) => onToggleCollapse(node.id, e) : undefined}
                title={hasChildren ? (isCollapsed ? "Expand" : "Collapse") : undefined}
              >
                {hasChildren ? (
                  isCollapsed ? (
                    <HiOutlineChevronRight size={16} className="text-blue-600" />
                  ) : (
                    <HiOutlineChevronDown size={16} className="text-blue-600" />
                  )
                ) : (
                  <RxTarget size={16} className="ml-1 text-blue-500" />
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <RxTarget size={16} className="text-blue-500" />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <div className="font-medium truncate text-foreground">{node.name}</div>
              {isSearchMode && (
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">
                  Level {node.level + 1}
                </span>
              )}
              {hasChildren && isCollapsed && !isSearchMode && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  {countTotalNodes([node]) - 1} hidden
                </span>
              )}
            </div>
            {node.description && (
              <div className="text-xs text-left text-muted-foreground truncate mt-0.5 leading-relaxed">
                {node.description}
              </div>
            )}
          </div>
        </div>

        {!isSearchMode && (
          <div className="flex-shrink-0 opacity-60">
            <HiOutlineChevronLeft size={16} className="text-gray-400 transform rotate-180" />
          </div>
        )}
      </div>

      {hasChildren && !isCollapsed && (
        <div>
          {node.children.map((child) => (
            <DecisionNode
              key={child.id}
              node={child}
              onNodeSelect={onNodeSelect}
              onToggleCollapse={onToggleCollapse}
              collapsedNodes={collapsedNodes}
              countTotalNodes={countTotalNodes}
              isSearchMode={isSearchMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const SearchResultsPanel = ({ searchTerm, onClose, decisionTree = [], onNavigate }) => {
  const [collapsedNodes, setCollapsedNodes] = useState(new Set());

  // Core utility functions
  const getTreeData = useCallback((tree) => tree?.data || tree?.[0] || tree || null, []);

  const processTree = useCallback((nodes, level = 0) => {
    if (!nodes) return [];
    const nodeArray = Array.isArray(nodes) ? nodes : [nodes];

    return nodeArray
      .map((node) => {
        if (!node) return null;

        const processedNode = {
          id: node.decisionId || node.id,
          name: node.decisionName || node.name || node.title || "Unnamed",
          description: node.description || "",
          level,
          hasChildren: node.children?.length > 0,
          children: node.children || [],
        };

        if (node.children?.length > 0) {
          processedNode.children = processTree(node.children, level + 1);
        }

        return processedNode;
      })
      .filter(Boolean);
  }, []);

  const countNodes = useCallback((nodes) => {
    if (!nodes) return 0;
    const nodeArray = Array.isArray(nodes) ? nodes : [nodes];
    return nodeArray.reduce((count, node) => count + 1 + countNodes(node?.children), 0);
  }, []);

  const countVisibleNodes = useCallback(
    (nodes) => {
      if (!nodes) return 0;
      const nodeArray = Array.isArray(nodes) ? nodes : [nodes];
      return nodeArray.reduce((count, node) => {
        let nodeCount = 1;
        if (node?.children?.length > 0 && !collapsedNodes.has(node.id)) {
          nodeCount += countVisibleNodes(node.children);
        }
        return count + nodeCount;
      }, 0);
    },
    [collapsedNodes]
  );

  // Main data processing
  const { filteredNodes, totalNodeCount, visibleNodeCount, isSearchMode } = useMemo(() => {
    const treeData = getTreeData(decisionTree);
    if (!treeData) return { filteredNodes: [], totalNodeCount: 0, visibleNodeCount: 0, isSearchMode: false };

    const all = processTree(treeData);
    const totalCount = countNodes(all);
    const visibleCount = countVisibleNodes(all);

    if (!searchTerm.trim()) {
      // Show full tree when no search
      return { filteredNodes: all, totalNodeCount: totalCount, visibleNodeCount: visibleCount, isSearchMode: false };
    }

    // Flatten tree and filter matching nodes for search
    const flattenAndFilter = (nodes, level = 0) => {
      if (!nodes) return [];
      const nodeArray = Array.isArray(nodes) ? nodes : [nodes];

      return nodeArray.reduce((acc, node) => {
        if (!node) return acc;

        const matches = node.name.toLowerCase().includes(searchTerm.toLowerCase());

        if (matches) {
          acc.push({ ...node, level, isSearchResult: true, children: [] });
        }

        if (node.children?.length > 0) {
          acc.push(...flattenAndFilter(node.children, level + 1));
        }

        return acc;
      }, []);
    };

    const flattenedResults = flattenAndFilter(all);
    return {
      filteredNodes: flattenedResults,
      totalNodeCount: totalCount,
      visibleNodeCount: flattenedResults.length,
      isSearchMode: true,
    };
  }, [decisionTree, searchTerm, getTreeData, processTree, countNodes, countVisibleNodes]);

  // Tree controls
  const expandAll = useCallback(() => setCollapsedNodes(new Set()), []);

  const collapseAll = useCallback(() => {
    try {
      const collectIds = (nodes) => {
        if (!nodes) return new Set();
        const nodeArray = Array.isArray(nodes) ? nodes : [nodes];
        const ids = new Set();

        nodeArray.forEach((node) => {
          if (node?.children?.length > 0) {
            const nodeId = node.decisionId || node.id;
            if (nodeId) ids.add(nodeId);
            collectIds(node.children).forEach((id) => ids.add(id));
          }
        });

        return ids;
      };

      const treeData = getTreeData(decisionTree);
      if (treeData) {
        setCollapsedNodes(collectIds(treeData));
      }
    } catch (error) {
      console.error("Error in collapseAll:", error);
      setCollapsedNodes(new Set());
    }
  }, [decisionTree, getTreeData]);

  const toggleNodeCollapse = useCallback((nodeId, event) => {
    event?.stopPropagation();
    setCollapsedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  }, []);

  const handleNodeSelect = useCallback(
    (node) => {
      onNavigate?.(`/insights?decisionId=${node.id}`);
      onClose?.();
    },
    [onNavigate, onClose]
  );

  // Event handlers
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };
    const handleClickOutside = (event) => {
      const isSearchInput = event.target.closest("#decision-search-input");
      const isSearchPanel = event.target.closest(".search-results-panel");

      if (!isSearchInput && !isSearchPanel) {
        onClose?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!decisionTree || (Array.isArray(decisionTree) && decisionTree.length === 0)) return null;

  return (
    <div className="search-results-panel absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-80 overflow-y-auto z-50 backdrop-blur-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-600">{isSearchMode ? "Search Results" : "Tree Controls"}</span>
          <span className="text-xs text-gray-500">
            {isSearchMode
              ? `${filteredNodes.length} matching nodes found`
              : `${filteredNodes.length} of ${visibleNodeCount} visible (${totalNodeCount} total)`}
          </span>
        </div>
        {!isSearchMode && (
          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
            >
              Expand All
            </button>
            <button
              onClick={collapseAll}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
            >
              Collapse All
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {filteredNodes.length > 0 ? (
        <div className="py-2">
          {filteredNodes.map((node) => (
            <DecisionNode
              key={node.id}
              node={node}
              onNodeSelect={handleNodeSelect}
              onToggleCollapse={toggleNodeCollapse}
              collapsedNodes={collapsedNodes}
              countTotalNodes={countNodes}
              isSearchMode={isSearchMode}
            />
          ))}
        </div>
      ) : (
        <div className="px-6 py-8 text-center text-sm text-muted-foreground">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <FiSearch size={20} className="text-gray-400" />
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">
            {isSearchMode ? "No matching nodes found" : "No decision nodes found"}
          </h3>
          <p className="text-xs text-gray-500">
            {isSearchMode
              ? "Try adjusting your search terms"
              : "Try adjusting your search terms or browse the hierarchy"}
          </p>
        </div>
      )}
    </div>
  );
};

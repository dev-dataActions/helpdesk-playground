import { useState, useMemo } from "react";
import { FiChevronRight } from "react-icons/fi";

/**
 * Tree node component for individual decision items
 */
const TreeNode = ({ node, level = 0, selectedId, expandedNodes, onToggleExpand, onNodeClick, onNavigate }) => {
  const hasChildren = Array.isArray(node.children) && node.children.length > 0;
  const isExpanded = expandedNodes.has(node.id);
  const isSelected = selectedId === node.id;

  const handleToggle = (e) => {
    e.stopPropagation();
    if (hasChildren) {
      onToggleExpand(node.id);
    }
  };

  const handleClick = () => {
    if (onNavigate && node.id) {
      onNavigate(`/insights?decisionId=${node.id}`);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`
          flex items-center gap-1 p-1.5 rounded cursor-pointer text-sm
          ${
            isSelected
              ? "bg-blue-100 border border-blue-300 text-blue-800"
              : "hover:bg-gray-50 border border-transparent"
          }
          transition-all duration-150
        `}
        onClick={handleClick}
      >
        {/* Indentation */}
        {level > 0 && <div className="flex" style={{ width: `${level * 5}px` }} />}

        {/* Expand/collapse arrow */}
        {hasChildren ? (
          <button
            onClick={handleToggle}
            className={`
              w-4 h-4 flex items-center justify-center text-gray-500 hover:text-gray-700
              transition-transform duration-150
              ${isExpanded ? "rotate-90" : ""}
            `}
          >
            <FiChevronRight size={12} />
          </button>
        ) : (
          <div className="w-4 h-4" />
        )}

        <span className="flex-1 text-xs truncate" title={node.name || "Unnamed Decision"}>
          {node.name || "Unnamed Decision"}
        </span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="ml-2">
          {node.children.map((child, index) => (
            <TreeNode
              key={child.id || index}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              expandedNodes={expandedNodes}
              onToggleExpand={onToggleExpand}
              onNodeClick={onNodeClick}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * DecisionTreeView component with comprehensive error handling and prop validation
 * @param {Object} props - Component props
 * @param {Object} props.decisionTree - Full decision tree data
 * @param {string} props.selectedDecisionId - Currently selected decision ID
 * @param {Function} props.onNavigate - Navigation handler function
 * @param {string} props.className - Additional CSS classes
 */
export const DecisionTreeView = ({ decisionTree = {}, selectedDecisionId = "", onNavigate = null, className = "" }) => {
  const [expandedNodes, setExpandedNodes] = useState(new Set());

  // Auto-expand nodes to show the path to selected decision
  const autoExpandedNodes = useMemo(() => {
    const newExpandedNodes = new Set(expandedNodes);

    if (selectedDecisionId && decisionTree?.data) {
      const expandPathToNode = (node, path = []) => {
        if (!node) return false;

        if (node.id === selectedDecisionId) {
          // Expand all nodes in the path
          path.forEach((nodeId) => newExpandedNodes.add(nodeId));
          return true;
        }

        if (Array.isArray(node.children)) {
          for (const child of node.children) {
            if (expandPathToNode(child, [...path, node.id])) {
              return true;
            }
          }
        }

        return false;
      };

      expandPathToNode(decisionTree.data);
    }

    return newExpandedNodes;
  }, [decisionTree, selectedDecisionId, expandedNodes]);

  const handleToggleExpand = (nodeId) => {
    setExpandedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  if (!decisionTree?.data) {
    return (
      <div className={className}>
        <div className="flex justify-between items-center gap-2 mb-1">
          <p className="text-xs text-gray-600">Decision Tree</p>
        </div>
        <div className="text-xs text-gray-500 p-2">No decision tree available</div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex justify-between items-center gap-2 mb-1">
        <p className="text-xs text-gray-600">Decision Tree</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-md p-1 max-h-96 overflow-y-auto">
        <div className="min-w-0">
          <TreeNode
            node={decisionTree.data}
            selectedId={selectedDecisionId}
            expandedNodes={autoExpandedNodes}
            onToggleExpand={handleToggleExpand}
            onNavigate={onNavigate}
          />
        </div>
      </div>
    </div>
  );
};

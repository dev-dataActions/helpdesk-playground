/**
 * Get the complete path from root to a specific decision
 * @param {Object} tree - Decision tree object
 * @param {string} decisionId - Target decision ID
 * @returns {Array} Array of decision nodes from root to target
 */
export function getDecisionPath(tree, decisionId) {
  if (!tree || !decisionId) return [];

  const path = [];

  function findPath(node, targetId, currentPath = []) {
    if (!node) return false;

    const newPath = [...currentPath, node];

    if (node.id === targetId) {
      path.push(...newPath);
      return true;
    }

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        if (findPath(child, targetId, newPath)) {
          return true;
        }
      }
    }

    return false;
  }

  // Handle the data property structure
  const rootNode = tree.data || tree;
  findPath(rootNode, decisionId);
  return path;
}

/**
 * Get siblings at a specific level in the decision tree
 * @param {Object} tree - Decision tree object
 * @param {number} level - Level in the tree (0 = root, 1 = first level, etc.)
 * @param {string} parentId - Parent ID to find siblings under
 * @returns {Array} Array of sibling nodes
 */
export function getSiblingsAtLevel(tree, level, parentId = null) {
  if (!tree) return [];

  // Handle the data property structure
  const rootNode = tree.data || tree;

  if (level === 0) {
    // Root level - return the root node only
    return [rootNode];
  }

  function findSiblings(node, currentLevel, targetParentId) {
    if (!node) return [];

    if (currentLevel === level - 1) {
      // We're at the parent level
      if (node.id === targetParentId || !targetParentId) {
        return node.children || [];
      }
    }

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        const siblings = findSiblings(child, currentLevel + 1, targetParentId);
        if (siblings.length > 0) {
          return siblings;
        }
      }
    }

    return [];
  }

  return findSiblings(rootNode, 0, parentId);
}

/**
 * Transform decision tree path to breadcrumb format
 * @param {Array} path - Array of decision nodes from root to current
 * @param {Object} tree - Full decision tree for sibling lookup
 * @returns {Array} Array of breadcrumb config objects
 */
export function transformToBreadcrumbs(path, tree) {
  if (!path || path.length === 0) return [];

  return path.map((node, index) => {
    const level = index;
    const parentId = index > 0 ? path[index - 1].id : null;
    const siblings = getSiblingsAtLevel(tree, level, parentId);

    return {
      id: node.id,
      name: node.name || node.title || `Decision ${index + 1}`,
      path: `/insights?decisionId=${node.id}`,
      siblings:
        siblings.length > 1
          ? siblings.map((sibling) => ({
              id: sibling.id,
              name: sibling.name || sibling.title || `Decision ${index + 1}`,
              path: `/insights?decisionId=${sibling.id}`,
            }))
          : [],
      currentId: node.id,
      isCurrent: index === path.length - 1,
    };
  });
}

/**
 * Get the parent ID for a given decision
 * @param {Object} tree - Decision tree object
 * @param {string} decisionId - Decision ID to find parent for
 * @returns {string|null} Parent ID or null if root
 */
export function getParentId(tree, decisionId) {
  if (!tree || !decisionId) return null;

  // Handle the data property structure
  const rootNode = tree.data || tree;

  function findParent(node, targetId, parent = null) {
    if (!node) return null;

    if (node.children && node.children.length > 0) {
      for (const child of node.children) {
        if (child.id === targetId) {
          return parent ? parent.id : null;
        }
        const result = findParent(child, targetId, node);
        if (result !== null) {
          return result;
        }
      }
    }

    return null;
  }

  return findParent(rootNode, decisionId);
}

/**
 * Check if a decision has siblings
 * @param {Object} tree - Decision tree object
 * @param {string} decisionId - Decision ID to check
 * @returns {boolean} True if decision has siblings
 */
export function hasSiblings(tree, decisionId) {
  if (!tree || !decisionId) return false;

  const parentId = getParentId(tree, decisionId);
  if (!parentId) {
    // Root level - check if there are multiple root nodes
    return false; // Assuming single root for now
  }

  const siblings = getSiblingsAtLevel(tree, 1, parentId);
  return siblings.length > 1;
}

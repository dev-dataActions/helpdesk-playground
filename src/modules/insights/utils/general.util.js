export const getBreadcrumbs = (workspaceId, appId, decisionTree = {}, decisionId = "") => {
  const breadcrumbs = [];

  function dfs(node) {
    if (!node) return false;

    breadcrumbs.push({ name: node.name, description: node.description, id: node.id });

    if (node.id === decisionId) return true;

    for (const child of node.children) {
      if (dfs(child)) return true;
    }

    breadcrumbs.pop();
    return false;
  }

  if (dfs(decisionTree.data)) {
    if (breadcrumbs.length > 0) breadcrumbs.pop();
    return breadcrumbs.map((bc) => ({
      ...bc,
      href: `/insights?decisionId=${bc.id}`,
    }));
  } else return [];
};

export const getDecision = (decisionTree = {}, decisionId = "") => {
  function dfs(node) {
    if (!node) return null;

    if (node.id === decisionId) return node;

    for (const child of node.children) {
      const result = dfs(child);
      if (result) return result;
    }

    return null;
  }

  return dfs(decisionTree?.data) || decisionTree?.data;
};

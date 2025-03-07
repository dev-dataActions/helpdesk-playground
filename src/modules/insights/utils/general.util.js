export const getBreadcrumbs = (featureMap = {}, featureId = "") => {
  const breadcrumbs = [];

  function dfs(node) {
    if (!node) return false;

    breadcrumbs.push({ name: node.name, description: node.description, id: node.id });

    if (node.id === featureId) return true;

    for (const child of node.children) {
      if (dfs(child)) return true;
    }

    breadcrumbs.pop();
    return false;
  }

  if (dfs(featureMap.data)) {
    if (breadcrumbs.length > 0) breadcrumbs.pop();
    return breadcrumbs.map((bc) => ({
      ...bc,
      href: `/insights?featureId=${bc.id}`,
    }));
  } else return [];
};

export const getFeature = (featureMap = {}, featureId = "") => {
  function dfs(node) {
    if (!node) return null;

    if (node.id === featureId) return node;

    for (const child of node.children) {
      const result = dfs(child);
      if (result) return result;
    }

    return null;
  }

  return dfs(featureMap?.data) || featureMap?.data;
};

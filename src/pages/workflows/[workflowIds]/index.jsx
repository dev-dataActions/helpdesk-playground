import { useRouter } from "next/router";
import { workflows, workflowsTree } from "../index";

const findNode = (treeNode, id) => {
  if (!treeNode) return null;
  if (treeNode.id == id) return treeNode;
  for (let i = 0; i < treeNode.children.length; i++) {
    const node = findNode(treeNode.children[i], id);
    if (node != null) return node;
  }
  return null;
};

export default function WorkflowPage() {
  const { query } = useRouter();
  const workflowIds = query?.workflowIds?.split("-");
  const workflowId = workflowIds?.[workflowIds?.length - 1];
  const workflow = workflows?.find((w) => w.id === parseInt(workflowId));
  const workflowNode = findNode(workflowsTree[0], workflowId);
  return (
    <div className="pt-12">
      <p>{workflow?.name}</p>
      {workflowNode?.children?.length > 0 && (
        <div>
          <p>Related workflows</p>
          {workflowNode?.children?.map((wn) => {
            const cworkflow = workflows?.find((w) => w.id === wn.id);
            return (
              <div key={cworkflow.id}>
                <a href={`/workflows/${workflowIds}-${cworkflow.id}`}>{cworkflow.name}</a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

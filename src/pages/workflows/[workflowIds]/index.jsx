import { useRouter } from "next/router";
import { workflows, workflowsTree } from "../index";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { BsGraphUp } from "react-icons/bs";
import { SlBulb } from "react-icons/sl";
import { IoIosArrowForward } from "react-icons/io";

export const findNode = (treeNode, id) => {
  if (!treeNode) return null;
  if (treeNode.id == id) return treeNode;
  for (let i = 0; i < treeNode.children.length; i++) {
    const node = findNode(treeNode.children[i], id);
    if (node != null) return node;
  }
  return null;
};
const InsightScenarios = [
  {
    id: 2,
    label: "Reporting",
    href: "/reporting",
    icon: <LiaFileInvoiceSolid size={40} />,
  },
  {
    id: 3,
    label: "RCA",
    href: "#",
    icon: <SlBulb size={35} />,
  },
  {
    id: 4,
    label: "Forecasting",
    href: "#",
    icon: <BsGraphUp size={35} />,
  },
];

export default function WorkflowPage() {
  const router = useRouter();
  const { query, asPath } = router;
  const workflowIds = query?.workflowIds?.split("-");
  const workflowId = workflowIds?.[workflowIds?.length - 1];
  const workflow = workflows?.find((w) => w.id === parseInt(workflowId));
  const workflowNode = findNode(workflowsTree[0], workflowId);
  return (
    <div className="flex flex-col justify-center items-center pt-12 h-screen gap-y-3">
      <p className="text-4xl font-sans">{workflow?.name}</p>
      <br />
      <div className="items-start">
        <p className="text-sm m-2 mb-4 font-thin">Analysis Scenario</p>
        <div className="flex justify-around items-center gap-x-4">
          {InsightScenarios.map((scenario) => (
            <p
              onClick={() => router.push(`${asPath + scenario?.href}`)}
              className="flex flex-col w-40 gap-y-2 justify-center items-center p-5 border border-gray-300 rounded-xl bg-white text-xs cursor-pointer"
            >
              {scenario?.icon}
              {scenario.label}
            </p>
          ))}
        </div>
      </div>
      <br />
      {workflowNode?.children?.length > 0 && (
        <div className="flex flex-col gap-y-4 items-start w-[60%]">
          <p className="text-sm font-semibold">Related workflows</p>
          {workflowNode?.children?.map((wn) => {
            const cworkflow = workflows?.find((w) => w.id === wn.id);
            return (
              <div key={cworkflow.id}>
                <a
                  href={`/workflows/${workflowIds}-${cworkflow.id}`}
                  className="flex items-center bg-white p-3 gap-x-2 rounded-lg w-auto text-xs border border-gray-300 justify-between"
                >
                  <p>{cworkflow.name}</p>

                  <IoIosArrowForward />
                </a>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

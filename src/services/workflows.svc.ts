export interface IWorkflow {
  id: number;
  name: string;
  desc: string;
  icon: string;
}

export const getWorkflowsByWorkspaceIdAndUserId = async (
  workspaceId: string
): Promise<IWorkflow[]> => {
  // Your SaaS app backend should implement this API call to return workflows by workspace ID
  return [
    {
      id: 1,
      name: "Player lifecycle management",
      desc: "A comprehensive workflow designed to manage the various stages of a player's career in esports, from recruitment and training to performance tracking and retirement planning.",
      icon: "https://img.icons8.com/ios/452/rocket.png",
    },
  ];
};

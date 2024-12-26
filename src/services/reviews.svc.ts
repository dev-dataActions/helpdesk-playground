export interface IReview {
  id: number;
  name: string;
  createdOn: string;
  updatedOn: string;
}

export const getReviewsByWorkspaceIdAndUserId = async (workspaceId: string) => {
  return [
    {
      id: 1,
      name: "Acquisition and Activation",
      createdOn: "October 30, 2024 11:09 AM",
      updatedOn: "October 30, 2024 11:09 AM",
    },
    {
      id: 2,
      name: "Stable retention",
      createdOn: "October 30, 2024 11:09 AM",
      updatedOn: "October 30, 2024 11:09 AM",
    },
  ];
};

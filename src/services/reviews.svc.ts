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
      name: "Tournament health and performance review",
      createdOn: "October 30, 2024 11:09 AM",
      updatedOn: "October 30, 2024 11:09 AM",
    },
  ];
};

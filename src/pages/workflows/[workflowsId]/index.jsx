export default function NewWorkflowsPage() {
  const reviewBoards = [
    {
      id: 1,
      name: "Acquisition and Activation",
      createdOn: "October 30, 2024 11:09 AM",
      updatedOn: "October 30, 2024 11:09 AM",
      href: "/workflows/1/1",
    },
    {
      id: 2,
      name: "Stable retention",
      createdOn: "October 30, 2024 11:09 AM",
      updatedOn: "October 30, 2024 11:09 AM",
      href: "#",
    },
  ];

  return (
    <div className="p-4 mt-10">
      <div className="mb-6">
        <p className="text-xl font-semibold">Review Boards</p>
        <p className="text-gray-600">
          You can review what is happening within your organization, or within teams and projects.
        </p>
      </div>
      <div className="border border-gray-200 rounded-lg bg-white">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left font-semibold">Name</th>
              <th className="px-4 py-2 text-left font-semibold">Created On</th>
              <th className="px-4 py-2 text-left font-semibold">Updated On</th>
            </tr>
          </thead>
          <tbody>
            {reviewBoards.map((board) => (
              <tr key={board.id} className="cursor-pointer text-sm text-gray-600">
                <td className="px-4 py-2">
                  <a href={board.href}>{board.name}</a>
                </td>
                <td className="px-4 py-2">{board.createdOn}</td>
                <td className="px-4 py-2">{board.updatedOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <p>Review Boards</p>
        <p>You can review workflows within this organization, or within teams and projects.</p>
      </div>
    </div>
  );
}

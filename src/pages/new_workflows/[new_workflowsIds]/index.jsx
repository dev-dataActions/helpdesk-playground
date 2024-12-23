export default function NewWorkflowsPage() {
  const liveBoards = [
    {
      id: 1,
      name: "Game Selection",
      createdOn: "October 30, 2024 11:09 AM",
      updatedOn: "October 30, 2024 11:09 AM",
      href: "/new_workflows/1",
    },
    {
      id: 2,
      name: "Time Slot Optimization",
      createdOn: "October 30, 2024 11:09 AM",
      updatedOn: "October 30, 2024 11:09 AM",
      href: "/new_workflows/2",
    },
    {
      id: 3,
      name: "Prize Pool and Entry Fee",
      createdOn: "October 30, 2024 11:09 AM",
      updatedOn: "October 30, 2024 11:09 AM",
      href: "/new_workflows/3",
    },
    {
      id: 4,
      name: "Target Player",
      createdOn: "October 30, 2024 11:09 AM",
      updatedOn: "October 30, 2024 11:09 AM",
      href: "/new_workflows/4",
    },
  ];

  return (
    <div className="p-4 mt-10">
      <div className="mb-6">
        <p className="text-xl font-semibold">Live Boards</p>
        <p className="text-gray-600">
          You can create dashboards within this organization, or within teams
          and projects.
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
            {liveBoards.map((board) => (
              <tr
                key={board.id}
                className="cursor-pointer text-sm text-gray-600"
              >
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
    </div>
  );
}

import Link from "next/link";

export const SubDecisions = ({ decisions }) => {
  return (
    <div>
      <div className="flex justify-between items-center gap-2 mb-1">
        <p className="text-xs text-gray-600">{`Sub decisions (${decisions?.length ?? 0})`}</p>
      </div>

      <div className="flex flex-col gap-2 items-end">
        {decisions?.map((decision) => (
          <div
            key={decision.id}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md hover:shadow-md cursor-pointer flex gap-1 items-center justify-between group"
          >
            <Link
              className="text-xs hover:underline flex-grow"
              href={`/insights?decisionId=${decision.id}`}
            >
              {decision.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

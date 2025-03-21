import { GoToCard } from "./GoToCard";

export const SubFeatures = ({ features = [] }) => {
  if (!features || features.length == 0) return null;
  return (
    <div className="bg-blue-50 p-4 rounded-lg">
      <p className="mb-2 text-sm">{`Features (${features?.length})`}</p>
      <div className="grid grid-cols-12 gap-3">
        {features.map((feature) => (
          <div key={feature.id} className="col-span-4">
            <GoToCard
              name={feature.name}
              description={feature.description}
              goToText="Go to module"
              href={`/insights?featureId=${feature.id}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

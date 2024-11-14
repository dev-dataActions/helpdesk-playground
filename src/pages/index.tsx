import { Insight } from "@/da-insight-kit";

export default function Home() {
  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="h-60 w-72">
        <Insight id="1" workspaceId="42eed85d-b1d7-4b8e-8621-1dfa79e72cf1" />
      </div>
    </div>
  );
}

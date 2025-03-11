import parse from "html-react-parser";

export const MarkupEditor = ({ text }) => {
  return (
    <div className="relative">
      <div className="cursor-text text-gray-800 text-sm ProseMirror">
        {parse((text ?? "").replace(/<p><\/p>/g, "<p><br /></p>"))}
      </div>
    </div>
  );
};

import Link from "next/link";
import { Label } from "../base/Label";

export const List = ({ title, items, className }) => {
  return (
    <div className={className}>
      {title && <div className="text-xs font-medium p-1 flex items-center gap-x-1">{title}</div>}
      <ul role="list" className="flex flex-col gap-y-2">
        {items.map((item, index) => (
          <li key={item.id ?? index}>
            {item.component ? (
              item.component
            ) : (
              <Link
                href={item.href}
                className={`block px-3 py-2 w-full ${
                  item.current ? "bg-gray-100 outline outline-gray-200" : ""
                } hover:bg-gray-100 hover:outline hover:outline-gray-200 rounded-md`}
                shallow
              >
                <Label icon={item.icon} text={item.label} />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

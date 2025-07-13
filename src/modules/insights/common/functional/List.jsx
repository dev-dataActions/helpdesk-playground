import Link from "next/link";
import { Label } from "../base/Label";

export const List = ({ title, items, className }) => {
  return (
    <div className={className}>
      {title && <div className="text-xs font-medium p-1">{title}</div>}
      <ul role="list" className="flex flex-col gap-y-2">
        {items.map((item, index) => (
          <li key={item.id ?? index}>
            {item.component ? (
              item.component
            ) : (
              <Link
                href={item.href ?? "#"}
                className={`block px-2 py-2 border ${
                  item.current ? "bg-white border-gray-300" : "border-transparent"
                } hover:bg-white hover:border-gray-300 rounded-md group`}
              >
                <Label
                  icon={item.icon}
                  text={item.label}
                  className={item.current ? "text-black" : "text-white group-hover:text-black"}
                />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

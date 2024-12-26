import Link from "next/link";
import { Label } from "./Label";

interface IItem {
  id?: number | string;
  component?: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
  current?: boolean;
}

interface IListProps {
  title?: string;
  items: IItem[];
  className?: string;
}

export const List: React.FC<IListProps> = ({ title, items, className }) => {
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
                href={item.href ?? "#"}
                className={`block px-2 py-1.5 w-full ${
                  item.current ? "bg-gray-100 text-black" : ""
                } hover:bg-gray-100 hover:text-black rounded-md text-sm`}
                shallow
              >
                <Label icon={item.icon} text={item.label} className={item.className} />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

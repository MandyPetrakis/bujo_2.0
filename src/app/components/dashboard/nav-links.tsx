"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { getDate } from "@/app/lib/data";

const { year, month } = getDate();

const links = [
  { name: "Year", href: "/dashboard/year-spread" },
  {
    name: "Month",
    href: `/dashboard/month-spread/${year}/${month}`,
  },
  { name: "Week", href: "/dashboard/week-spread" },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <div className="flex mt-[550px] ml-4 -rotate-90">
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[40px] rounded-t-lg items-center justify-center bg-light px-12 py-6 text-sm hover:bg-medium hover:text-light",
              {
                "bg-dark text-light hover:bg-dark": pathname === link.href,
              }
            )}
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}

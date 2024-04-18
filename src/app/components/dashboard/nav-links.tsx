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
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] rounded-t-lg flex-auto items-center justify-center bg-light p-3 text-md hover:bg-medium hover:text-light",
              {
                "bg-dark text-light hover:bg-dark": pathname === link.href,
              }
            )}
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}

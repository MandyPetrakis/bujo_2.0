"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Year", href: "/dashboard/year-spread" },
  {
    name: "Month",
    href: "/dashboard/month-spread",
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
              "flex h-[48px] grow items-center justify-center  bg-light text-medium  p-3 text-sm hover:bg-medium hover:text-light md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-dark text-light hover:bg-dark hover:text-light":
                  pathname === link.href,
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

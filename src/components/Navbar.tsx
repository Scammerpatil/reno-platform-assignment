import { IconBuildingSkyscraper, IconMenu2 } from "@tabler/icons-react";
import Link from "next/link";
import ThemeToggler from "./ThemeToggler";

export default function Navbar() {
  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <IconMenu2 size={24} />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {["add-school", "view-schools"].map((item) => (
              <li key={item}>
                <Link href={`/${item}`} className="btn btn-ghost text-base">
                  {item
                    .replace("-", " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>
              </li>
            ))}
            <ThemeToggler className="" />
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link href="/" className="space-x-3 flex items-center">
          <IconBuildingSkyscraper size={50} className="text-primary" />
          <div className="flex flex-col items-start gap-1">
            <div className="flex items-center gap-[2px]">
              <span className="text-primary font-extrabold text-xl">Reno</span>
              <span className="text-accent font-semibold text-xl">
                Platform
              </span>
            </div>
            <hr className="w-full border border-base-content hidden lg:block" />
            <span className="text-sm text-base-content/70 italic hidden lg:block">
              Assignment for Reno Platform
            </span>
          </div>
        </Link>
      </div>
      <div className="navbar-end space-x-2">
        <Link href="/add-school" className="btn btn-accent hidden lg:flex">
          Add School <IconBuildingSkyscraper size={24} />
        </Link>
        <Link href="/view-schools" className="btn btn-secondary hidden lg:flex">
          View Schools <IconBuildingSkyscraper size={24} />
        </Link>
        <ThemeToggler className="hidden lg:flex" />
      </div>
    </div>
  );
}

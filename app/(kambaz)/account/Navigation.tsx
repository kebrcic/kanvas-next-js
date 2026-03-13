/* eslint-disable react/jsx-key */
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const pathname = usePathname();

  return (
    <div id="wd-account-navigation" className="wd list-group fs-6 rounded-0 p-0 ms-0">
      {links.map((link) => (
        <Link
          href={link.toLowerCase()}
          id={`wd-${link.toLowerCase()}-link`}
          className={`list-group-item border-0 ${pathname.toLowerCase().includes(link.toLowerCase()) ? "active" : "text-danger"}`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
}

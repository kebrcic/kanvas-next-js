/* eslint-disable react/jsx-key */
'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccountNavigation() {
  const links = ["Signin", "Signup", "Profile"];
  const pathname = usePathname();

  return (
    <div
      id="wd-account-navigation"
      className="wd list-group fs-6 rounded-0 p-0 ms-0"
    >
      {links.map((link) => (
        <Link href={link.toLowerCase()}
        id={`wd-${link.toLowerCase()}-link`}
        className={`list-group-item border-0 ${pathname.toLowerCase().includes(link.toLowerCase()) ? "active" : "text-danger"}`}
        >
        {link}   
        </Link>
      ))}
    </div>
  );
}

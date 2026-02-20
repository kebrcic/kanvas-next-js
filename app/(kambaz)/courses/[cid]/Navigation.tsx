/* eslint-disable react/jsx-key */
'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";
export default function CourseNavigation() {
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];
  const pathname = usePathname();
  const {cid} = useParams();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link href={`/courses/${cid}/${link.toLowerCase() === "people" ? "people/table" : link.toLowerCase()}`}
        id={`wd-course-${link.toLowerCase()}-link`}
        className={`list-group-item border-0 ${pathname.toLowerCase().includes(link.toLowerCase()) ? "active" : "text-danger"}`}
        >
        {link}   
        </Link>
      ))}
    </div>
  );
}

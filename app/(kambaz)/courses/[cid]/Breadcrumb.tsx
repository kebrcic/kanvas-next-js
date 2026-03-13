"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Breadcrumb({ course }: { course: { name: string } | undefined }) {
  const pathname = usePathname();

  // Get the last part of the URL (like home" or "assignments")
  const lastSegment = pathname.split("/").pop() || "";

  // Capitalize the first letter
  const formattedSegment = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);

  return (
    <span className="fs-4" style={{ color: "grey" }}>
      {" "}
      <span style={{ color: "#d3d3d3" }}>&gt;</span> {formattedSegment}
    </span>
  );
}

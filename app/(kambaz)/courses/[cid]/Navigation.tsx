import Link from "next/link";
export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation">
      <Link href="/courses/1234/home" id="wd-course-home-link">
        Home
      </Link>
      <br />
      <Link href="/courses/1234/modules" id="wd-course-modules-link">
        Modules
      </Link>
      <br />
      <Link
        href="https://piazza.com/class/mju4yv9nultsp#"
        id="wd-course-piazza-link"
      >
        Piazza
      </Link>
      <br />
      <Link href="https://www.zoom.com/" id="wd-course-zoom-link">
        Zoom
      </Link>
      <br />
      <Link href="/courses/1234/assignments" id="wd-course-assignments-link">
        Assignments
      </Link>
      <br />
      <Link href="/courses/1234/quizzes" id="wd-course-quizzes-link">
        Quizzes
      </Link>
      <br />
      <Link href="/courses/1234/grades" id="wd-course-grades-link">
        Grades
      </Link>
      <br />
      <Link href="/courses/1234/people" id="wd-course-people-link">
        People
      </Link>
      <br />
    </div>
  );
}

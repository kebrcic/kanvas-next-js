import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/courses/1234" className="wd-dashboard-course-link">
            <Image
              src="/images/reactjs.png"
              width={200}
              height={150}
              alt="reactjs"
            />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/4550" className="wd-dashboard-course-link">
            <Image
              src="/images/distSys.jpg"
              width={200}
              height={150}
              alt="distSys"
            />
            <div>
              <h5> CS4550 Distributed Systems </h5>
              <p className="wd-dashboard-course-title">Concurrent Systems</p>
              <button> Go </button>
            </div>
          </Link>{" "}
        </div>
        <div className="wd-dashboard-course">
          <Link href="/courses/5330" className="wd-dashboard-course-link">
            <Image src="/images/CV.png" width={200} height={150} alt="CV" />
            <div>
              <h5> CS5330 Computer Vision </h5>
              <p className="wd-dashboard-course-title">
                CV & Pattern Recognition
              </p>
              <button> Go </button>
            </div>
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}

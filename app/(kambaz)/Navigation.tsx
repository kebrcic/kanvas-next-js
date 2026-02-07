import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { FaBook, FaCalendarAlt } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
export default function KambazNavigation() {
  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 105 }}
      id="wd-kambaz-navigation"
    >
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        action
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/neu.png" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      <ListGroupItem action className="border-0 bg-black text-center">
        <Link
          href="/account"
          id="wd-account-link"
          className="text-white text-decoration-none"
        >
          <FaRegCircleUser className="fs-1 text-white" />
          <br />
          Account
        </Link>
      </ListGroupItem>

      <ListGroupItem action active className="border-0 bg-white text-center">
        <Link
          href="/dashboard"
          id="wd-dashboard-link"
          className="text-danger text-decoration-none"
        >
          <AiOutlineDashboard className="fs-1 text-danger" />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>

      <ListGroupItem action className="border-0 bg-black text-center">
        <Link
          href="/courses/1234/home"
          id="wd-courses-link"
          className="text-white text-decoration-none"
        >
          <FaBook className="fs-1 text-danger" />
          <br />
          Courses
        </Link>
      </ListGroupItem>
      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/calendar"
          id="wd-calendar-link"
          className="text-white text-decoration-none"
        >
          <FaCalendarAlt className="fs-1 text-danger" />
          <br />
          Calendar
        </Link>
      </ListGroupItem>
      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/inbox"
          id="wd-inbox-link"
          className="text-white text-decoration-none"
        >
          <FaInbox className="fs-1 text-danger" />
          <br />
          Inbox
        </Link>
      </ListGroupItem>
      <ListGroupItem className="border-0 bg-black text-center">
        <Link
          href="/labs"
          id="wd-labs-link"
          className="text-white text-decoration-none"
        >
          <CiSettings className="fs-1 text-danger" />
          <br />
          Labs
        </Link>
      </ListGroupItem>

      {/* complete styling the rest of the links */}
    </ListGroup>
  );
}

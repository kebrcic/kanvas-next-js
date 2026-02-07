import Link from "next/link";
import { FormSelect } from "react-bootstrap";
import FormControl from "react-bootstrap/esm/FormControl";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        className="mb-2"
        defaultValue="alice"
      />
      <br />
      <FormControl
        id="wd-password"
        placeholder="password"
        className="mb-2"
        defaultValue="123"
      />

      <br />

      <FormControl
        id="wd-firstname"
        placeholder="First Name"
        className="mb-2"
        defaultValue="Alice"
      />

      <br />
      <FormControl
        id="wd-lastname"
        placeholder="Last Name"
        className="mb-2"
        defaultValue="Wonderland"
      />
      <br />

      <FormControl
        id="wd-dob"
        className="mb-2"
        defaultValue="2000-01-01"
        type="date"
      />
      <br />
      <FormControl
        id="wd-email"
        className="mb-2"
        defaultValue="wonderland-01-01"
        type="email"
      />
      <br />

      <FormSelect id="wd-role">
        <option value="USER" defaultChecked>
          User
        </option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
        <option value="ADMIN">Admin</option>
      </FormSelect>

      <br />
      <Link href="signin" className="btn btn-danger w-100 mb-2">
        {" "}
        Sign out{" "}
      </Link>
    </div>
  );
}

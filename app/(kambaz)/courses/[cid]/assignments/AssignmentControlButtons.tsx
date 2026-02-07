import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus } from "react-icons/bs";
export default function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <input
        type="text"
        value="40% of Total"
        readOnly
        className="styled-input"
      />
      <BsPlus />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

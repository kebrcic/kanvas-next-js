/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../modules/GreenCheckmark";
import { BsTrash } from "react-icons/bs";

export default function SingleAssignmentControlButton({
  setFormData,
  setShowDeleteModal,
  assignment,
}: any) {
  return (
    <div className="float-end">
      <BsTrash
        className="text-danger me-2 mb-1"
        onClick={(e) => {
          e.stopPropagation();
          setFormData(assignment);
          setShowDeleteModal(true);
        }}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}

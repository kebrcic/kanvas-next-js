import { Modal, Button } from "react-bootstrap";

interface ConfirmModalProps {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "primary" | "warning"; // Allow changing button color
}

export default function ConfirmModal({
  show,
  onHide,
  onConfirm,
  title = "Confirm Action", // Default Title
  message = "Are you sure?", // Default Description
  confirmLabel = "Save", // Default Save/Yes button
  cancelLabel = "Cancel", // Default Cancel button
  variant = "danger",
}: ConfirmModalProps) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {cancelLabel}
        </Button>
        <Button variant={variant} onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

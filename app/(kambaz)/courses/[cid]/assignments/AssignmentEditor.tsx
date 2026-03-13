/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { AssignmentData } from "./page";

export default function AssignmentEditor({
  show,
  handleClose,
  dialogTitle,
  formData,
  setFormData, // Add this prop
  funcAssignment,
}: {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  formData: AssignmentData;
  setFormData: (data: AssignmentData) => void;
  funcAssignment: () => void;
}) {
  // Generic handler to update any field in the object
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Assignment Name */}
          <Form.Group className="mb-3">
            <Form.Label>Assignment Name</Form.Label>
            <Form.Control name="title" value={formData.title} onChange={handleChange} />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          {/* Points */}
          <Row className="mb-3">
            <Col xs={4} className="text-end align-self-center">
              Points
            </Col>
            <Col xs={8}>
              <Form.Control name="points" value={formData.points} onChange={handleChange} />
            </Col>
          </Row>

          {/* Assign Box (The border styling) */}
          <Row className="mb-3">
            <Col xs={4} className="text-end">
              Assign
            </Col>
            <Col xs={8} className="border p-3 rounded">
              <Form.Group className="mb-2">
                <Form.Label>
                  <b>Due</b>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Label>
                    <b>Available from</b>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="available_from_date"
                    value={formData.available_from_date}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Form.Label>
                    <b>Until</b>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="available_until_date"
                    value={formData.available_to_date}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={() => {
            funcAssignment();
            handleClose();
          }}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

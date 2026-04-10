/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Modal,
  Form,
  Button,
  Row,
  Col,
  FormControl,
  FormLabel,
  ModalBody,
  ModalFooter,
  FormGroup,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
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
      <ModalHeader closeButton>
        <ModalTitle>{dialogTitle}</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form>
          {/* Assignment Name */}
          <FormGroup className="mb-3">
            <FormLabel>Assignment Name</FormLabel>
            <FormControl name="title" value={formData.title} onChange={handleChange} />
          </FormGroup>

          {/* Description */}
          <FormGroup className="mb-3">
            <FormControl
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormGroup>

          {/* Points */}
          <Row className="mb-3">
            <Col xs={4} className="text-end align-self-center">
              Points
            </Col>
            <Col xs={8}>
              <FormControl name="points" value={formData.points} onChange={handleChange} />
            </Col>
          </Row>

          {/* Assign Box (The border styling) */}
          <Row className="mb-3">
            <Col xs={4} className="text-end">
              Assign
            </Col>
            <Col xs={8} className="border p-3 rounded">
              <FormGroup className="mb-2">
                <FormLabel>
                  <b>Due</b>
                </FormLabel>
                <FormControl
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                />
              </FormGroup>

              <Row>
                <Col>
                  <FormLabel>
                    <b>Available from</b>
                  </FormLabel>
                  <FormControl
                    type="date"
                    name="available_from_date"
                    value={formData.available_from_date}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <FormLabel>
                    <b>Until</b>
                  </FormLabel>
                  <FormControl
                    type="date"
                    name="available_to_date"
                    value={formData.available_to_date}
                    onChange={handleChange}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </ModalBody>
      <ModalFooter>
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
      </ModalFooter>
    </Modal>
  );
}

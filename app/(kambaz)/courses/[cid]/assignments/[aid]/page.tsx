import {
  FormLabel,
  FormControl,
  FormSelect,
  Button,
  Container,
  Row,
  Col,
  FormCheck,
} from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <Container id="wd-assignments-editor" className="p-4">
      {/* Assignment Name Section */}
      <div className="mb-3">
        <h6>
          <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
        </h6>
        <FormControl id="wd-name" defaultValue="A1 - ENV + HTML" />
      </div>

      {/* Description Section */}
      <div className="mb-3">
        <FormControl
          as="textarea"
          id="wd-description"
          rows={5}
          defaultValue={`The assignment is available online Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following:
Your full name and section
Links to each of the lab assignments
Link to the Kanbas application
Links to all relevant source code repositories
The Kanbas application should include a link to navigate back to the landing page.`}
        />
      </div>

      <hr />

      {/* Main Form Fields Layout using Grid */}
      {/* Points Field */}
      <Row className="mb-3">
        <FormLabel column sm={3} className="text-sm-end">
          Points
        </FormLabel>
        <Col sm={9}>
          <FormControl type="number" defaultValue={100} />
        </Col>
      </Row>

      {/* Assignment Group Field */}
      <Row className="mb-3">
        <FormLabel column sm={3} className="text-sm-end">
          Assignment Group
        </FormLabel>
        <Col sm={9}>
          <FormSelect defaultValue="ASSIGNMENTS" id="wd-ass-group">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
          </FormSelect>
        </Col>
      </Row>

      {/* Display Grade as Field */}
      <Row className="mb-3">
        <FormLabel column sm={3} className="text-sm-end">
          Display Grade as
        </FormLabel>
        <Col sm={9}>
          <FormSelect defaultValue="PERCENTAGE" id="wd-disp-grade">
            <option value="PERCENTAGE">Percentage</option>
            <option value="DECIMAL">Decimal</option>
            <option value="LETTER">Letter</option>
          </FormSelect>
        </Col>
      </Row>

      {/* Submission Type Field */}
      <Row className="mb-3">
        <FormLabel column sm={3} className="text-sm-end">
          Submission Type
        </FormLabel>
        <Col sm={9}>
          <FormSelect defaultValue="ONLINE" id="wd-subm-type">
            <option value="ONLINE">Online</option>
          </FormSelect>
        </Col>
      </Row>

      {/* Online Entry Options Field */}
      <Row className="mb-3">
        <FormLabel column sm={3} className="text-sm-end">
          Online Entry Options
        </FormLabel>
        <Col sm={9}>
          <FormCheck
            type="checkbox"
            id="wd-chkbox-txt"
            label="Text Entry"
            name="check-online-entry"
          />
          <FormCheck
            type="checkbox"
            id="wd-chkbox-url"
            label="Website URL"
            name="check-online-entry"
            defaultChecked
          />
          <FormCheck
            type="checkbox"
            id="wd-chkbox-records"
            label="Media Recordings"
            name="check-online-entry"
          />
          <FormCheck
            type="checkbox"
            id="wd-chkbox-annot"
            label="Student Annotation"
            name="check-online-entry"
          />
          <FormCheck
            type="checkbox"
            id="wd-chkbox-file"
            label="File Uploads"
            name="check-online-entry"
          />
        </Col>
      </Row>

      {/* Assign To Field */}
      <Row className="mb-3">
        <FormLabel column sm={3} className="text-sm-end">
          Assign To
        </FormLabel>
        <Col sm={9}>
          <FormControl defaultValue="Everyone" id="wd-assign-to" />
        </Col>
      </Row>

      {/* Due Date Field */}
      <Row className="mb-3">
        <FormLabel column sm={3} className="text-sm-end">
          Due
        </FormLabel>
        <Col sm={9}>
          <FormControl type="date" defaultValue="2024-05-13" id="wd-due-date" />
        </Col>
      </Row>

      {/* Available From and Until Dates (Aligned) */}
      <Row className="mb-3">
        <FormLabel column sm={3} className="text-sm-end">
          Available From
        </FormLabel>
        <Col sm={4}>
          <FormControl
            type="date"
            id="wd-from-date"
            defaultValue="2024-05-06"
          />
        </Col>
        <FormLabel column sm={1} className="text-sm-end">
          Until
        </FormLabel>
        <Col sm={4}>
          <FormControl
            type="date"
            id="wd-until-date"
            defaultValue="2024-05-20"
          />
        </Col>
      </Row>

      {/* End Main Form Fields Layout */}

      <hr />

      {/* Buttons at the bottom right */}
      <div className="d-flex justify-content-end gap-2">
        <Button variant="light">Cancel</Button>
        {/* Using 'danger' variant to match the red 'Save' button in the image */}
        <Button variant="danger">Save</Button>
      </div>
    </Container>
  );
}

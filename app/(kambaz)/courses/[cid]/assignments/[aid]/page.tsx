export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <h3>
        <label htmlFor="wd-name">Assignment Name</label>
      </h3>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description" rows={5}>
        The assignment is available online Submit a link to the landing page of
        your Web application running on Netlify. The landing page should include
        the following: Your full name and section Links to each of the lab
        assignments Link to the Kanbas application Links to all relevant source
        code repositories The Kanbas application should include a link to
        navigate back to the landing page.
      </textarea>
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" defaultValue={100} />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-ass-group">Assignment Group</label>
          </td>
          <td>
            <select defaultValue="ASSIGNMENTS" id="wd-ass-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-disp-grade">Display Grade as</label>
          </td>
          <td>
            <select defaultValue="PERCENTAGE" id="wd-disp-grade">
              <option value="PERCENTAGE">Percentage</option>
              <option value="PERCENTAGE">Decimal</option>
              <option value="PERCENTAGE">Letter</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-subm-type">Submission Type</label>
          </td>
          <td>
            <select defaultValue="ONLINE" id="wd-subm-type">
              <option value="ONLINE">Online</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-online-eo">Online Entry Options</label>
          </td>
          <td>
            <br />
            <input
              id="wd-chkbox-txt"
              type="checkbox"
              name="check-online-entry"
            />
            <label htmlFor="wd-chkbox-txt">Text Entry</label>
            <br />
            <input
              id="wd-chkbox-url"
              type="checkbox"
              name="check-online-entry"
            />
            <label htmlFor="wd-chkbox-url">Website URL</label>
            <br />
            <input
              id="wd-chkbox-records"
              type="checkbox"
              name="check-online-entry"
            />
            <label htmlFor="wd-chkbox-records">Media Recordings</label>
            <br />
            <input
              id="wd-chkbox-annot"
              type="checkbox"
              name="check-online-entry"
            />
            <label htmlFor="wd-chkbox-annot">Student Annotation</label>
            <br />
            <input
              id="wd-chkbox-file"
              type="checkbox"
              name="check-online-entry"
            />
            <label htmlFor="wd-chkbox-file">File Uploads</label>
            <br />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign To</label>
          </td>
          <td>
            <input id="wd-assign-to" defaultValue={"Everyone"} />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-due-date">Due</label>
          </td>
          <td>
            <input id="wd-due-date" type="date" defaultValue="2024-05-13" />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-from-date">Available from</label>
          </td>
          <td>
            <label htmlFor="wd-until-date">Until</label>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <input id="wd-from-date" type="date" defaultValue="2024-05-06" />
          </td>
          <td>
            <input id="wd-until-date" type="date" defaultValue="2024-05-20" />
          </td>
        </tr>
        <br />
      </table>
      <hr />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { ListGroup, ListGroupItem } from "react-bootstrap";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };
  const { todos } = useSelector((state: RootState) => state.todosReducer);
  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <button className="btn btn-success me-2" onClick={addElement}>
        Add Element
      </button>
      <ul className="list-group">
        {array.map((item, index) => (
          <li
            className="list-group-item d-flex justify-content-between align-items-center"
            key={index}
          >
            {" "}
            {item}
            <button className="btn btn-danger me-2" onClick={() => deleteElement(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <ListGroup>
        {todos.map((todo: any) => (
          <ListGroupItem key={todo.id}>{todo.title}</ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}

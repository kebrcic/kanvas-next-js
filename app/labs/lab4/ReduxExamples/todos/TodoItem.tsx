/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListGroupItem, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";

export default function TodoItem({ todo }: any) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex align-items-center" key={todo.id}>
      <div className="d-flex gap-2">
        <span className="flex-grow-1">{todo.title}</span>
        <Button
          variant="danger"
          onClick={() => dispatch(deleteTodo(todo.id))}
          id="wd-delete-todo-click"
        >
          {" "}
          Delete{" "}
        </Button>
        <Button variant="primary" onClick={() => dispatch(setTodo(todo))} id="wd-set-todo-click">
          {" "}
          Edit{" "}
        </Button>
      </div>
    </ListGroupItem>
  );
}

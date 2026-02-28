import { ListGroupItem, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addTodo, updateTodo, setTodo } from "./todosReducer";

export default function TodoForm() {
  const { todo } = useSelector((state: RootState) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="d-flex gap-2">
      <FormControl
        value={todo.title}
        onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
      />
      <Button variant="success" onClick={() => dispatch(addTodo(todo))} id="wd-add-todo-click">
        {" "}
        Add{" "}
      </Button>
      <Button
        variant="warning"
        onClick={() => dispatch(updateTodo(todo))}
        id="wd-update-todo-click"
      >
        {" "}
        Update{" "}
      </Button>
    </ListGroupItem>
  );
}

import React from "react";
import {
  createEvent,
  createStore,
  createEffect,
  restore,
  sample,
} from "effector-logger";
import { useStore, useList } from "effector-react";
import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const submit = createEvent();
const submitted = createEvent();
const completed = createEvent();
const changed = createEvent();
const removed = createEvent();

const validateFx = createEffect(([todo, todos]) => {
  if (todos.some((item) => item.text === todo))
    throw "This todo is already on the list";

  if (!todo.trim().length) throw "Required field";

  return null;
});

const $todo = restore(changed, "").reset(submitted);
const $error = restore(validateFx.failData, "").reset(changed);

const $todos = createStore([])
  .on(submitted, (prev, next) => [...prev, { text: next, completed: false }])
  .on(completed, (state, index) =>
    state.map((item, i) => ({
      ...item,
      completed: index === i ? !item.completed : item.completed,
    }))
  )
  .on(removed, (state, index) => state.filter((_, i) => i !== index));

sample({
  clock: submit,
  source: [$todo, $todos],
  target: validateFx,
});

sample({
  clock: validateFx.done,
  source: $todo,
  target: submitted,
});

submit.watch((e) => e.preventDefault());

const ProjectTwo = () => {
  const todo = useStore($todo);
  const error = useStore($error);

  const list = useList($todos, (item, index) => (
    <ListItem
      key={index}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => removed(index)}
        >
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} dense>
        <ListItemIcon>
          <Checkbox
            edge="start"
            type="checkbox"
            checked={item.completed}
            onChange={() => completed(index)}
            tabIndex={-1}
            disableRipple
          />
        </ListItemIcon>
        <ListItemText id={index} primary={item.text} />
      </ListItemButton>
    </ListItem>
  ));

  return (
    <div>
      <h3>Forms</h3>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Задача"
          required={true}
          error={!!error}
          variant="outlined"
          className="text"
          size="small"
          type="text"
          name="todo"
          value={todo}
          onChange={(e) => changed(e.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          onClick={submit}
          className="submit"
        >
          Создать
        </Button>
      </Box>
      <List
        sx={{
          width: "50ch",
        }}
      >
        {list}
      </List>
    </div>
  );
};

export default ProjectTwo;

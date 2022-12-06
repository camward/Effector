import React from "react";
import { createEffect, createStore } from "effector-logger";
import { useStore, useEvent } from "effector-react";
import { Box, Button } from "@mui/material";

const url = "https://jsonplaceholder.typicode.com/users/1";

const fetchUserFx = createEffect((url) => fetch(url).then((req) => req.json()));

const $user = createStore(null).on(
  fetchUserFx.doneData,
  (state, result) => result.username
);

const ProjectOne = () => {
  const user = useStore($user);
  const pending = useStore(fetchUserFx.pending);
  const fetchEvent = useEvent(fetchUserFx);

  return (
    <div>
      <h3>Effects</h3>
      <Box>
        {user ? <p>Current user: {user}</p> : <p>No current user</p>}
        <Button
          variant="contained"
          disabled={pending}
          onClick={() => fetchEvent(url)}
        >
          Load user
        </Button>
      </Box>
    </div>
  );
};

export default ProjectOne;

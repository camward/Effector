import React from "react";
import { createEffect, createStore, forward } from "effector-logger";
import { useList } from "effector-react";

const getAllId = createEffect({ handler: async () => [1, 2, 3] });

const getPostsByIds = createEffect({
  handler: (ids) =>
    Promise.all(
      ids.map(async (id) => {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${id}`
        );
        const posts = await res.json();
        return { id, posts };
      })
    ),
});

forward({
  from: getAllId.done.map(({ result }) => result),
  to: getPostsByIds,
});

const postGroups = createStore([]).on(
  getPostsByIds.done,
  (list, { result }) => [...list, ...result]
);

const ProjectThree = () => {
  return (
    <div>
      <h3>Effect Sequence</h3>
      {useList(postGroups, ({ id, posts }) =>
        posts.map(({ title, body }) => (
          <div>
            {title}
            <br />
            {body}
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default ProjectThree;

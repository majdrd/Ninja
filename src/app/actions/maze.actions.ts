import { createAction, props } from "@ngrx/store";

export const initilizeMaze = createAction(
    '[maze] Inintilize Maze',
    props<{ maze: string[][], ninjaPosition: any }>()
);
export const updateMaze = createAction(
    '[maze] Inintilize Maze',
    props<{ maze: string[][], ninjaPosition: any }>()
);

export const moveNinja = createAction(
    '[maze] Move Ninja',
    props<{ direction: string }>()
);
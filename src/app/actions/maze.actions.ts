import { createAction, props } from "@ngrx/store";

export const updateMaze = createAction(
    '[maze] Inintilize Maze',
    props<{ maze: string[][], ninjaPosition: any }>()
);

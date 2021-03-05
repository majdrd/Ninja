import { Action, createReducer, on } from '@ngrx/store';
import * as MazeActions from '../actions/maze.actions';
import { CELL, INIT_NINJA_POSITION, KEY_CODE } from '../constants/app.const';

export const mazeRootKey = 'maze-state';

export interface State {
    mazeCells: string[][];
    ninjaPosition: {
        x: number,
        y: number
    };
}

export const initialState: State = {
    mazeCells: [],
    ninjaPosition: {
        x: INIT_NINJA_POSITION.x,
        y: INIT_NINJA_POSITION.y
    }
};

const mazeReducer = createReducer(
    initialState,
    on(MazeActions.updateMaze, (state: State, { maze, ninjaPosition }) => {
        return {
            ...state,
            mazeCells: maze,
            ninjaPosition
        };
    })
);

export function reducer(state: State | undefined, action: Action) {
    return mazeReducer(state, action);
}

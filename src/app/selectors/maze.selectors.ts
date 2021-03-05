import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMazeReducer from '../reducer/maze.reducer';

export const selectMazeState = createFeatureSelector<fromMazeReducer.State>(
    fromMazeReducer.mazeRootKey
);

export const selectMaze = createSelector(
    selectMazeState,
    (state: fromMazeReducer.State) => state.mazeCells
);

export const selectNunjaPosition = createSelector(
    selectMazeState,
    (state: fromMazeReducer.State) => state.ninjaPosition
);

import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { CELL, INIT_NINJA_POSITION, KEY_CODE } from '../constants/app.const';
import * as fromMazeReducer from '../reducer/maze.reducer';
import * as MazeActions from '../actions/maze.actions';
import { MazeService } from '../services/maze.service';
import { selectMaze, selectNunjaPosition } from '../selectors/maze.selectors';
import { clone } from 'ramda';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css']
})
export class MazeComponent implements OnInit {
  mazeSize = 8;
  winner = '';
  cells: string[][];
  mazeCells$ = this.store.pipe(select(selectMaze));
  ninjaPosition$ = this.store.pipe(select(selectNunjaPosition)).subscribe(p => {
    this.ninjaPosition = p;
  });
  ninjaPosition: any;
  constructor(private store: Store<fromMazeReducer.State>, private mazeService: MazeService) {
    this.cells = this.mazeService.createMaze(this.mazeSize);
  }

  ngOnInit(): void {
    this.store.dispatch(MazeActions.updateMaze({
      maze: this.cells,
      ninjaPosition: INIT_NINJA_POSITION
    }));
  }

  move(event: string) {
    const { cells, position, legalMove } = this.mazeService.moveNinja(event, this.cells, this.ninjaPosition);
    if (legalMove) {
      this.cells = cells;
      this.store.dispatch(MazeActions.updateMaze({
        maze: cells,
        ninjaPosition: position
      }));
      if (this.mazeService.shurekenCount === 0) {
        this.winner = 'You Won the Game!';
        console.log('Winnner');
      }
    }

  }
}

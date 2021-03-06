import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { INIT_NINJA_POSITION } from '../constants/app.const';
import * as fromMazeReducer from '../reducer/maze.reducer';
import * as MazeActions from '../actions/maze.actions';
import { MazeService } from '../services/maze.service';
import { selectMaze, selectNunjaPosition } from '../selectors/maze.selectors';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { WinnerDialogComponent } from './winner-dialog/winner-dialog.component';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css']
})
export class MazeComponent implements OnInit {
  mazeSize = 8;
  winner = false;

  cells: string[][];
  mazeCells$ = this.store.pipe(select(selectMaze));
  ninjaPosition$ = this.store.pipe(select(selectNunjaPosition)).subscribe(p => {
    this.ninjaPosition = p;
  });
  ninjaPosition: any;
  constructor(
    private store: Store<fromMazeReducer.State>,
    private mazeService: MazeService,
    private dialogService: DialogService
  ) {
    this.cells = this.mazeService.createMaze(this.mazeSize);
  }

  ngOnInit(): void {
    this.initMaze();
  }

  initMaze() {
    console.log('[MazeComponent] - initilize maze');

    this.store.dispatch(MazeActions.updateMaze({
      maze: this.cells,
      ninjaPosition: INIT_NINJA_POSITION
    }));
  }

  getCount() {
    return this.mazeService.shurekenCount;
  }

  weHaveAWinner() {
    console.log('[MazeComponent] - Ninja won the game!');
    const ref: DynamicDialogRef = this.dialogService.open(
      WinnerDialogComponent, {
      closable: false
    });
    ref.onClose.subscribe(c => {
      console.log('[MazeComponent] - Ninja starting a new game.');
      this.cells = this.mazeService.createMaze(this.mazeSize);
      this.initMaze();
    });
  }

  move(event: string) {
    console.log(`[MazeComponent] - Ninja is making a move by clicking ${event}.`);

    const { cells, position, legalMove } = this.mazeService.moveNinja(event, this.cells, this.ninjaPosition);
    if (legalMove) {
      this.cells = cells;
      this.store.dispatch(MazeActions.updateMaze({
        maze: cells,
        ninjaPosition: position
      }));
      if (this.mazeService.shurekenCount === 0 && !this.winner) {
        this.winner = true;
        this.weHaveAWinner();
      }
    } else {
      console.log('[MazeComponent] - Ninja hit a wall!!!');
    }
  }

}

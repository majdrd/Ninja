import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { CellComponent } from './cell/cell.component';
import { MoveDirective } from './move.directive';

import * as fromMazeReducer from './reducer/maze.reducer';
import { MazeComponent } from './maze/maze.component';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    MoveDirective,
    MazeComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({}), 
    StoreModule.forFeature(fromMazeReducer.mazeRootKey, fromMazeReducer.reducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

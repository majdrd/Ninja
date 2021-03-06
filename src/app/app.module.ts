import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DialogModule } from 'primeng/dialog';

import { AppComponent } from './app.component';
import { CellComponent } from './cell/cell.component';
import { MoveDirective } from './move.directive';

import * as fromMazeReducer from './reducer/maze.reducer';
import { MazeComponent } from './maze/maze.component';
import { WinnerDialogComponent } from './maze/winner-dialog/winner-dialog.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    CellComponent,
    MoveDirective,
    MazeComponent,
    WinnerDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DialogModule,
    ButtonModule,
    StoreModule.forRoot({}),
    StoreModule.forFeature(fromMazeReducer.mazeRootKey, fromMazeReducer.reducer)
  ],
  providers: [
    DialogService
  ],
  entryComponents: [
    WinnerDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

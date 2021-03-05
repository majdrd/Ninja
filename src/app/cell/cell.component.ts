import { Component, Input, OnInit } from '@angular/core';
import { CELL } from '../constants/app.const';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input('type')
  type!: string;

  readonly CELL_TYPES = CELL;
  constructor() { }

  ngOnInit(): void {
  }

}

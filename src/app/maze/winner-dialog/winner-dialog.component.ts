import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-winner-dialog',
  templateUrl: './winner-dialog.component.html',
  styleUrls: ['./winner-dialog.component.css']
})
export class WinnerDialogComponent implements OnInit {

  constructor(public ref: DynamicDialogRef) { }

  ngOnInit(): void {
  }

  close() {
    this.ref.close();
  }
}

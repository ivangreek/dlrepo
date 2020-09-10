import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-full-image-dialog',
  templateUrl: './full-image-dialog.component.html',
  styleUrls: ['./full-image-dialog.component.css']
})
export class FullImageDialogComponent implements OnInit {
  imageUrl: string;
  isLoading: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FullImageDialogComponent>
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    if (this.data.imageUrl){
      this.imageUrl = this.data.imageUrl;
    }
  }

  loadComplete(){
    this.isLoading = false;
  }
  
  close(){
    this.dialogRef.close();
  }
}

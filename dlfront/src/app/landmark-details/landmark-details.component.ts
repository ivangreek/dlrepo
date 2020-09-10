import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LandmarksService } from '../landmarks.service';
import { Landmark } from "../_models/landmark"
import { MatDialog, MatDialogConfig } from "@angular/material/dialog"
import { FullImageDialogComponent } from '../full-image-dialog/full-image-dialog.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-landmark-details',
  templateUrl: './landmark-details.component.html',
  styleUrls: ['./landmark-details.component.css']
})
export class LandmarkDetailsComponent implements OnInit {
  landmark: Landmark;
  locationExists = false;
  isAuthenticated: boolean;

  constructor( 
    private route : ActivatedRoute,
    private router: Router,
    private landmarkService: LandmarksService,
    private authService: AuthService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.getLandmark(params.get("landmarkId"));
    });
    this.authService.getCurrentUser$().subscribe(
      user => { this.isAuthenticated = (user != null); }
    );     
  }

  getLandmark(landmarkId:string){
    this.landmarkService.getLandmark(landmarkId)
    .then(landmark => {
      this.landmark = this.landmarkService.landmarkFromParseObject(landmark);
      //Set locationExists to true if the location is not empty.
      this.locationExists = (this.landmark.location['latitude'] != null);
    })
    .catch(error=>{
      console.error(JSON.stringify(error));
      this.router.navigate(['**']);
    });
  }

  showFullImage(imageUrl) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {imageUrl: imageUrl};
    dialogConfig['panelClass'] = 'full-image-container';
    dialogConfig['max-width'] = '90vw';
    this.dialog.open(FullImageDialogComponent, dialogConfig);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LandmarksService } from '../landmarks.service';
import { ToolService } from '../tool.service';
import { Parse } from 'parse';
import { MaxSizeValidator } from '@angular-material-components/file-input';
import * as filesize from 'filesize';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-landmark-form',
  templateUrl: './landmark-form.component.html',
  styleUrls: ['./landmark-form.component.css']
})
export class LandmarkFormComponent implements OnInit {
  landmarkForm : FormGroup;
  landmarkInvalid: boolean;
  formSubmitAttempt: boolean;
  landmark: any;
  locationExists = false;
  latitude: number;
  longitude: number;
  photo: any;
  photo_thumb: any;
  photoPreexists: boolean;
  title: string;
  readonly maxSize = 5242880;
  maxSizeInBytes: string;
  isAuthenticated: boolean;
  private currentUser$: Subscription;

  constructor(   
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private landmarkService: LandmarksService,
    private toolSevice: ToolService) {
      
      this.maxSizeInBytes = filesize(this.maxSize);
    }

  ngOnInit(): void {
    this.currentUser$ = this.authService.getCurrentUser$().subscribe(
      user => { 
        this.isAuthenticated = (user != null);
        if (!this.isAuthenticated) {
          this.router.navigate(['login']);
        }
      }
    );
    this.route.paramMap.subscribe(params => {
      this.getLandmark(params.get("landmarkId"))
      .then(landmark => {
        console.log('step 3');
        this.landmark = landmark;
        let landmarksSimpleFields = ['title', 'short_info', 'url', 'description', 'order'];
        var formFields = {
          imageFile: ['', MaxSizeValidator(this.maxSize)]
        }
        if (landmark.id){
          this.title = this.landmark.get("title");
          this.locationExists = (this.landmark.get('location')['latitude'] != null);
          this.latitude = this.landmark.get('location')['latitude'];
          this.longitude = this.landmark.get('location')['longitude'];
          landmarksSimpleFields.forEach(keyName=>{
            formFields[keyName]=[this.landmark.get(keyName), Validators.required]
          });
          this.photoPreexists = (this.landmark.get('photo') != null)
          console.log(this.photoPreexists);
        } else {
          this.locationExists = false;
          this.photoPreexists = false;
          this.title = '';
          landmarksSimpleFields.forEach(keyName=>{
            formFields[keyName]=['', Validators.required]
          });
        }
        this.landmarkForm = this.formBuilder.group(formFields);
      })
      .catch(error=>{console.log(JSON.stringify(error))});
    });    
  }
  getLandmark(landmarkId:string){
    console.log('step 2');
    if (landmarkId){
      return this.landmarkService.getLandmark(landmarkId);
    } else {
      return new Promise((resolve) => {
        var Landmark = Parse.Object.extend("Landmark");
        var landmark = new Parse.Query(Landmark);
        resolve(landmark);
      });
    }
  }
  onSubmit(): void{
    this.landmarkInvalid = false;
    this.formSubmitAttempt = false;
    if (this.landmarkForm.valid) {
      this.updatePhoto(this.photo)
      .then((savedFile: Parse.File)=>{        
        this.landmark.set("title", this.landmarkForm.get('title').value);
        this.landmark.set("short_info", this.landmarkForm.get('short_info').value);
        this.landmark.set("url", this.landmarkForm.get('url').value);
        this.landmark.set("description", this.landmarkForm.get('description').value);
        this.landmark.set("order", this.landmarkForm.get('order').value);
        this.landmark.set("location", new Parse.GeoPoint(this.latitude, this.longitude));
        if (savedFile) {
          this.landmark.set("photo", savedFile);
        }         
        return this.landmarkService.saveLandmark(this.landmark);
      }).then(landmark=>{
        this.router.navigate(['landmark', landmark.id]);
      });
    } else {
      this.formSubmitAttempt = true;
    }      
  }

  updatePhoto(fileToSave){
    if (fileToSave) {
      return fileToSave.save();
    } else {
      return new Promise((resolve) => {
        resolve(null);
      });
    }
  }
  onCancel(){
    if (this.landmark.id){
      this.router.navigate(['landmark', this.landmark.id]);
    } else {
      this.router.navigate(['/']);
    }
  }
  setCoors(location: {lng: number, lat: number}){
    this.latitude = location.lat;
    this.longitude = location.lng;
  }

  onFileChange(files: File[]){
    if (files.length > 0){
      var fileData = files[0];
      let re = /[^a-zA-Z0-9\\.\\_]/g;
      var fileName = fileData.name.replace(re, "_");
      this.toolSevice.getBase64(fileData)
        .then(b64 =>{
          let base64 = b64.toString().replace(/^data:(.*,)?/, '') 
          this.photo = new Parse.File(fileName, {base64: base64});
        });
    }
  }

  ngOnDestroy(){
    this.currentUser$.unsubscribe();
  }
}

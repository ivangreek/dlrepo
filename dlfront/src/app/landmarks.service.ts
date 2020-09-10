import { Injectable } from '@angular/core';
import { Parse } from 'parse';
import { Landmark } from './_models/landmark';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LandmarksService {
  authorization: boolean
  currentUser: Parse.User;
  currentUser$: Subscription

  constructor(
    private authService: AuthService
  ) { 
    this.currentUser$ = this.authService.getCurrentUser$().subscribe(
      user => {
        this.currentUser = user
        if (this.currentUser){
          this.authorization = true;
        } else {
          this.authorization = false;
        }
    })
  }

  getLandmark(landmarkId: string){
    var Landmark = Parse.Object.extend("Landmark");
    var landmark = new Parse.Query(Landmark);
    return landmark.get(landmarkId);
  }

  saveLandmark(landmark){
    return landmark.save();
  }

  getLandmarks(){
    var query = new Parse.Query("Landmark");
    query.select('title', 'short_info', 'photo_thumb');
    query.ascending('order');
    return query.find();
  }

  landmarkFromParseObject(parseObject) : Landmark{
    const keysOfLandmark = ["title", "location", "url", "short_info", "description", "order"];
    var val = {} as Landmark;
    var photo_thumb, photo;

    keysOfLandmark.forEach(element => {
      val[element] = parseObject.get(element)
    });
    val.id = parseObject.id;
    photo_thumb = parseObject.get("photo_thumb");
    val.photo_thumb = (photo_thumb) ? parseObject.get("photo_thumb").url() : '';

    photo = parseObject.get("photo");
    val.photo = (photo) ? parseObject.get("photo").url() : '';

    return val;
  }

  newLandmark(){
    var query = new Parse.Query("Landmark");
    return query.get();
  }

  get isAuthorized(){
    return (this.currentUser != null);
  }
}

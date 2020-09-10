import { Component, OnInit } from '@angular/core';
import { LandmarkList } from '../_models/landmark-list';
import { LandmarksService } from '../landmarks.service';
import { Parse } from 'parse';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-landmark-list',
  templateUrl: './landmark-list.component.html',
  styleUrls: ['./landmark-list.component.css']
})
export class LandmarkListComponent implements OnInit {
  landmarks :LandmarkList[];
  isAuthenticated: boolean;

  constructor(private landmarkService: LandmarksService,
    private authService: AuthService
  ) { 

  }

  ngOnInit() {
    this.authService.getCurrentUser$().subscribe(
      user => { this.isAuthenticated = (user != null); }
    )
    this.getLandmarks();
  }

  getLandmarks(): void{
    this.landmarkService.getLandmarks().then(landmarks => { 
      this.landmarks = landmarks.map(item => this.getLandmarkListItem(item));
    });
  }

  getLandmarkListItem(parseObject): LandmarkList {
    var photo_thumb = parseObject.get('photo_thumb');
    var photo_thumb_url = photo_thumb ? photo_thumb.url() : false

    return {
      id: parseObject.id,
      title: parseObject.get('title'),
      short_info: parseObject.get('short_info'),
      order: parseObject.get('order'),
      photo_thumb: photo_thumb_url
    }
  }
}


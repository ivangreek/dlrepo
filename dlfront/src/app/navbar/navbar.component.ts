import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() app_title: string;
  isAuthenticated: boolean;
  username: string;
  currentUser: Subscription;
   
  constructor( 
    private router: Router,
    private authService: AuthService)
  {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser$().subscribe(
      user => {
        if (user){
          this.username = user.get("username");
          this.isAuthenticated = true;
        } else {
          this.username = '';     
          this.isAuthenticated = false;
        }
    })
  }
  
  login(){
    this.router.navigate(['/login']);
  }

  logout(){
    this.authService.logOut()
  }

  ngOnDestroy(){
    this.currentUser.unsubscribe();
  }
}

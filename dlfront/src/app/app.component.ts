import { Component } from '@angular/core';
import { Parse } from 'parse';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Dubai landmarks';

  constructor () {
    Parse.initialize("myAppId");
    Parse.serverURL="http://localhost:1337/parse";
  }

}

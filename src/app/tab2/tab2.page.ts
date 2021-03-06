import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FavService } from '../services/fav.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public auth: AuthService, public favService: FavService) {

  }
}

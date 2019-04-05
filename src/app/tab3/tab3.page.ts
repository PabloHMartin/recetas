import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FavService } from '../services/fav.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public auth: AuthService, public favService: FavService) {

  }

  signOut() {
    this.auth.signOut();
    this.favService.deleteFavs();
  }
}

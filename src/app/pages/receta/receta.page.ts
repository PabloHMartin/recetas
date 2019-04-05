import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { RecetasService } from 'src/app/services/recetas.service';
import { Observable } from 'rxjs';
import { Receta } from 'src/app/models/receta.model';
import { FavService } from 'src/app/services/fav.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.page.html',
  styleUrls: ['./receta.page.scss'],
})
export class RecetaPage implements OnInit {
  receta$: Observable<Receta>;
  id;

  constructor(public recetaService: RecetasService,
    private route: ActivatedRoute,
    public favService: FavService) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.receta$ = this.recetaService.getRecetaById(this.id);
  }

  ngOnInit() {
  }
  print() {
    console.log(this.favService.userId);


  }

}

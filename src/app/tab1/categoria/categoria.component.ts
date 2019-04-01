import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecetasService } from 'src/app/services/recetas.service';
import { Observable } from 'rxjs';
import { Receta } from 'src/app/models/receta.model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent implements OnInit {
  recetas$: Observable<Receta[]>;
  id;

  constructor(public recetas: RecetasService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id');
    this.recetas$ = this.recetas.getRecetasByCategoria(this.id);
  }

  ngOnInit() {

  }

}

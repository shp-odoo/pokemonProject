import { PokemonService } from './../../shared/services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
  image = '';

  constructor(private pokemonService: PokemonService, private router: Router) { }
  pokemonDetail;


  ngOnInit(): void {
    const name = history.state?.pokemonName
    this.pokemonService.getPokemonDetail(name).subscribe(
      (data: any) => {
        this.pokemonDetail = data.body;
        this.image = data.body.sprites.other.dream_world.front_default;
      },
      error => {
        throw Error(error);
      }
    );
  }

}

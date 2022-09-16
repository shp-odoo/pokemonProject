import { Router } from '@angular/router';
import { PokemonService } from './../../shared/services/pokemon.service';
import { Component, OnInit } from '@angular/core';
import { concat, Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  subscription: Subscription;
  loading: boolean;

  constructor(private pokemonService: PokemonService, private router: Router) { }

  ngOnInit(): void {
    this.loadMore();
  }

  get pokemons(): any[] {
    return this.pokemonService.pokemons;
  }

  localError() {
    throw Error('The app component has thrown an error!');
  }

  loadMore() {
    this.loading = true;
    this.subscription = this.pokemonService.getPokemon().subscribe(response => {
      this.pokemonService.next = response.next;
      const details = response.results.map((i: any) => this.pokemonService.get(i.name));
      this.subscription = concat(...details).subscribe((response: any) => {
        this.pokemonService.pokemons.push(response);
      });
    },error => console.log('Error Occurred:', error), () => this.loading = false); 
  }

  gotoDetails(name) {
    this.router.navigate(['/details'], {
      state: {
        pokemonName: name
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

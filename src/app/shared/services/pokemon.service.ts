import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private url: string = environment.apiUrl + 'pokemon/';
  private _next: string = '';
  private _pokemons: any[] = [];


  constructor(private http: HttpClient) { }
  
  getPokemonDetail(name: string): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
 
    return this.http.get<any>(this.url + name, { headers: headers, observe: "response" })
    .pipe(
     catchError((err) => {
       // throw error to observer and treat it in subscription
       return throwError(() => new Error(err));
     })
   );
  }

  get pokemons(): any[] {
    return this._pokemons;
  }

  get next(): string {
    return this._next;
  }

  set next(next: string) {
    this._next = next;
  }

  get(name: string): Observable<any> {
    const url = `${this.url}${name}`;
    return this.http.get(url);
  }

  getPokemon(): Observable<any> {
    const url = this.next === '' ? `${this.url}?limit=20` : this.next;
    return this.http.get(url);
  }

}

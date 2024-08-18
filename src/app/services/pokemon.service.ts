import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpClient) {}

  // Fetches the first 20 Pokémon
  getFirstTwentyPokemons(): Observable<any> {
    return this.http.get(`${this.baseUrl}?limit=20`);
  }

  // Fetches details of a single Pokémon by its ID
  getPokemonById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`);
  }
}

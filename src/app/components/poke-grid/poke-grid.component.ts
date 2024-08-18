import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-poke-grid',
  standalone: true,
  imports: [
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  providers: [PokemonService],
  templateUrl: './poke-grid.component.html',
  styleUrls: ['./poke-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokeGridComponent implements OnInit {
  pokemonList = signal<{ name: string; image: string }[]>([]);  // Signal to store the list of Pokémon
  loading = signal(false);  // Signal to track loading state

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  // Function to fetch the first 20 Pokémon using the service
  loadPokemons(): void {
    this.loading.set(true);  // Set loading to true while data is being fetched
    this.pokemonService.getFirstTwentyPokemons().subscribe({
      next: (response: any) => {
        // Map the API response to extract names and images for each Pokémon
        const pokemonArray = response.results.map((pokemon: any, index: number) => ({
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,  // Create image URL based on index
        }));
        this.pokemonList.set(pokemonArray);  // Set the signal value for the Pokémon list
        this.loading.set(false);  // Stop loading
      },
      error: () => {
        console.error('Error fetching Pokémon data');
        this.loading.set(false);  // Stop loading in case of error
      },
    });
  }
}

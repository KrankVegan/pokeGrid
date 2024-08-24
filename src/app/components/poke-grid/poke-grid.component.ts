import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { PokemonDetailsDialogComponent } from '../pokemon-details-dialog/pokemon-details-dialog.component';

@Component({
  selector: 'app-poke-grid',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
  ],
  providers: [PokemonService],
  templateUrl: './poke-grid.component.html',
  styleUrls: ['./poke-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokeGridComponent implements OnInit {
  pokemonList = signal<{ name: string; image: string }[]>([]);
  loading = signal(false);

  constructor(private pokemonService: PokemonService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  // Fetches the first 20 Pokémon
  loadPokemons(): void {
    this.loading.set(true);
    this.pokemonService.getFirstTwentyPokemons().subscribe({
      next: (response: any) => {
        const pokemonArray = response.results.map((pokemon: any, index: number) => ({
          name: pokemon.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
        }));
        this.pokemonList.set(pokemonArray);
        this.loading.set(false);
      },
      error: () => {
        console.error('Error fetching Pokémon data');
        this.loading.set(false);
      },
    });
  }

  // Opens the Pokémon details dialog when a Pokémon is clicked
  openPokemonDetails(id: number): void {
    this.pokemonService.getPokemonById(id).subscribe((pokemon: any) => {
      const abilities = pokemon.abilities.map((ability: any) => ability.ability.name);
      const cryUrl = pokemon.cries.latest


      this.dialog.open(PokemonDetailsDialogComponent, {
        data: {
          pokemon: {
            name: pokemon.name,
            image: pokemon.sprites.front_default,
            abilities,
            cryUrl
          },
        },
      });
    });
  }
}

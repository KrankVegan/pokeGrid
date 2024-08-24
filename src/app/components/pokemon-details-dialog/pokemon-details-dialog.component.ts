import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-details-dialog',
  templateUrl: './pokemon-details-dialog.component.html',
  imports: [CommonModule, MatDialogModule],
  standalone: true,
  styleUrls: ['./pokemon-details-dialog.component.scss'],
})
export class PokemonDetailsDialogComponent {
  pokemon: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.pokemon = data.pokemon;
  }
  ngOnInit(): void {
    // Play the cry sound if the cryUrl is available
    if (this.data.pokemon.cryUrl) {
      const cryAudio = new Audio(this.data.pokemon.cryUrl);
      cryAudio.play().catch(error => console.error('Error playing cry audio:', error));
    }
  }
}

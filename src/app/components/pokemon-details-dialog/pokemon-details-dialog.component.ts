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
}

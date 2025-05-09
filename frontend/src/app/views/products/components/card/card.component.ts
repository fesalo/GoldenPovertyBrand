import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() id: number = 0;
  @Input() name: string = 'Classic T-Shirt';
  @Input() price: number = 29.99;
  @Input() description: string = 'Comfortable cotton t-shirt for everyday wear';
  @Input() category: number = 0;
  @Input() image: string = '';
  @Input() rating: number = 4.5;


}

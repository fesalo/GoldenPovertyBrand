import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductStateService } from '../../../../core/services/product-state.service';
import { Product } from '../../../../core/models/product.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  constructor(private service: ProductStateService) { }

  @Input() id: number = 0;
  @Input() name: string = 'Classic T-Shirt';
  @Input() price: number = 29.99;
  @Input() description: string = 'Comfortable cotton t-shirt for everyday wear';
  @Input() category: number = 0;
  @Input() frontImage: string = '';
  @Input() images: string[] = [];
  @Input() sizes: string[] = [];
  @Input() colors?: string[] = [];
  @Input() stock: number = 4.5;

  public isAdmin: boolean = true;

  public setProduct(product: Product): void {
    this.service.setProduct(product)
  }

}

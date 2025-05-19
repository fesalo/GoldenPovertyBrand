import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductStateService } from '../../../../core/services/product-state.service';
import { Product } from '../../../../core/models/product.model';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { NgStyle } from '@angular/common';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [RouterModule, ConfirmModalComponent, NgStyle],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  constructor(private router: Router, private service: ProductStateService) { }
  public showConfirmModal: boolean = false;
  public apiUrl: string = 'http://127.0.0.1:8000'

  @Input() id?: number = 0;
  @Input() name: string = 'Classic T-Shirt';
  @Input() price: number = 29.99;
  @Input() description: string = 'Comfortable cotton t-shirt for everyday wear';
  @Input() category: number = 0;
  @Input() frontImage: string = '';
  @Input() stock: number = 4.5;
  @Input() isAdmin: boolean = false;
  @Output() onDelete = new EventEmitter<void>();

  public updateProduct(product: Product) {
    this.service.setProduct(product)
    this.router.navigate(['/update-product', this.id]);
  }

  public modalDelete() {
    this.showConfirmModal = true;
  }

  public deleteProduct() {
    this.onDelete.emit();
    this.showConfirmModal = false;
  }

  public notDelete() {
    this.showConfirmModal = false;
  }

}

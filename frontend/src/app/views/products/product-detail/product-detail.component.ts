import { Component } from '@angular/core';
import { ProductStateService } from '../../../core/services/product-state.service';
import { Product } from '../../../core/models/product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {

  constructor(public service: ProductStateService, private route: ActivatedRoute) { }

  product: Product | null = null;
  relatedProducts: Product[] = [];

  ngOnInit(): void {
   const id = Number(this.route.snapshot.paramMap.get('id'));
    const storedProduct = this.service.getProduct();

    if (storedProduct && storedProduct.id === id) {
      this.product = storedProduct;
    }

  }

}

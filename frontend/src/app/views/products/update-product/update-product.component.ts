import { ProductService } from './../../../core/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, Product } from '../../../core/models/product.model';
import { ProductStateService } from '../../../core/services/product-state.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
  productForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true }),
    description: new FormControl<string>('', { nonNullable: true }),
    price: new FormControl<number | null>(null),
    stock: new FormControl<number | null>(null),
    category: new FormControl<number | null>(null),
    frontImage: new FormControl<string | null>(null),
  });

   public apiUrl: string = 'http://127.0.0.1:8000';
  public productoId: number | undefined = 0;
  public newFoto: string = '';
  public categories: Category[] = [];
  public product: Product = {
  name: '',
  description: '',
  price: 0,
  stock: 0,
  category: 0,
  frontImage: '',
  creationDate: ''
};

  constructor(
    private router: Router,
    public service: ProductService,
    public stateService: ProductStateService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  public ngOnInit(): void {
    this.getCategories();
    this.product = this.stateService.getProduct();
    if (this.product) {
      this.productForm.setValue({
        name: this.product.name,
        description: this.product.description,
        price: this.product.price ?? 0,
        stock: this.product.stock ?? 0,
        category: this.product.category,
        frontImage: null,
      });
      this.productoId = this.product.id;

      this.productoId = this.product.id;
    } else {
      this.productForm.setValue({
        name: 'Título de ejemplo',
        description: 'Descripción de ejemplo',
        price: 0,
        stock: 0,
        category: 0,
        frontImage: null,
      });
    }
  }

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {

      const file = input.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        this.newFoto = base64String.split(',')[1];
        this.productForm.controls['frontImage'].setValue(this.newFoto);
      };
      reader.onerror = (error) => {
        console.error('Error al leer la imagen:', error);
      }
    }
  }

  public getCategories(): void {
    this.categories = []
    this.service.getCategories().subscribe((response) => {
      this.categories = response
    });
  }

  public onSubmit(): void {
    let product: Product = this.stateService.getProduct();
    const rawValue = this.productForm.getRawValue();

    const name = rawValue.name || product.name;
    const description = rawValue.description || product.description;
    const price = rawValue.price !== null ? Number(rawValue.price) : product.price;
    const stock = rawValue.stock !== null ? Number(rawValue.stock) : product.stock;
    const category = rawValue.category || product.category

    const payload: Product = {
      name: name,
      description: description,
      price: price,
      stock: stock,
      category: category,
      frontImage: this.newFoto,
    };

    const changes: Partial<Product> = {};

    if (rawValue.name && rawValue.name !== product.name) {
      changes.name = rawValue.name;
    }

    if (rawValue.description && rawValue.description !== product.description) {
      changes.description = rawValue.description;
    }

    if (rawValue.price !== null && Number(rawValue.price) !== product.price) {
      changes.price = Number(rawValue.price);
    }

    if (rawValue.stock !== null && Number(rawValue.stock) !== product.stock) {
      changes.stock = Number(rawValue.stock);
    }

    if (rawValue.category !== null && Number(rawValue.category) !== product.category) {
      changes.category = Number(rawValue.category);
    }

    if (this.newFoto) {
      changes.frontImage = this.newFoto;
    }

    if (Object.keys(changes).length === Object.keys(product).length) {
      this.service.putProduct(this.productoId, payload).subscribe({
        next: response => {
          console.log('Producto actualizado completamente', response);
          this.router.navigate(['/home']);
        },
        error: error => console.error('Error al actualizar product', error)
      });
    } else if (Object.keys(changes).length > 0) {
      this.service.patchProduct(this.productoId, changes).subscribe({
        next: response => {
          console.log('Producto actualizado parcialmente', response);
          this.router.navigate(['/home']);
        },
        error: error => console.error('Error al actualizar product', error)
      });
    } else {
      console.log('No se hicieron changes.');
    }
  }

  public cancelar(): void {
    this.router.navigate(['/home']);
  }
}

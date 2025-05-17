import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { Product } from '../../../core/models/product.model';

@Component({
  standalone: true,
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent {
  productForm = new FormGroup({
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl<number | null>(null),
    stock: new FormControl<number | null>(null),
    usuario: new FormControl<number>(1, { nonNullable: true, validators: [Validators.required] }),
    foto: new FormControl<string | null>(null, { nonNullable: true, validators: [Validators.required] }),
  });

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  public newFoto: string = ''

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        this.newFoto = base64String.split(',')[1]
      };
      reader.onerror = (error) => {
        console.error('Error al leer la imagen:', error);
      };
    }
  }

  public onSubmit() {
    /* if (this.productForm.valid) {
      const payload: Product = {
        name: this.productForm.value.name || '',
        description: this.productForm.value.description || '',
        price: Number(this.productForm.value.price) || 0,
        stock: Number(this.productForm.value.stock) || 0,
        usuario: 1,
        foto: this.newFoto,
      };

      console.log('Enviando payload:', payload);

      this.productService.createProduct(payload).subscribe({
        next: (response) => {
          console.log('Producto creado:', response);
          this.router.navigate(['/productos']);
        },
        error: (error) => {
          console.error('Error al crear producto:', error);
          if (error.error) {
            console.log('Error detallado:', error.error);
          }
        },
      });
    } */
  }

  public cancelar() {
    this.router.navigate(['/productos']);
  }
}

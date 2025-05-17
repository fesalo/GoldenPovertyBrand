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
    frontImage: new FormControl<string | null>(null, { nonNullable: true, validators: [Validators.required] }),
    additionalPhotos: new FormControl<string[]>([], { nonNullable: true })  // nuevo campo para fotos adicionales
  });

  public newFoto: string = ''
  public additionalPhotos: string[] = []; // array para almacenar fotos adicionales en base64

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  public onFileChange(event: Event, multiple: boolean = false) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (!multiple) {
        // Solo 1 foto (frontImage)
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
        };
      } else {
        // Fotos adicionales múltiples
        this.additionalPhotos = []; // limpiamos array
        const files = Array.from(input.files);
        files.forEach((file) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            const base64String = reader.result as string;
            this.additionalPhotos.push(base64String.split(',')[1]);
            this.productForm.controls['additionalPhotos'].setValue(this.additionalPhotos);
          };
          reader.onerror = (error) => {
            console.error('Error al leer la imagen:', error);
          };
        });
      }
    }
  }

  public removeAdditionalPhoto(index: number) {

    this.additionalPhotos.splice(index, 1);

    this.productForm.controls['additionalPhotos'].setValue(this.additionalPhotos);

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
        additionalPhotos: this.additionalPhotos, // añadimos fotos adicionales al payload
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
    this.router.navigate(['/home']);
  }
}

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
    name: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    description: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    price: new FormControl<number | null>(null),
    stock: new FormControl<number | null>(null),
    category: new FormControl<number | null>(null),
    frontImage: new FormControl<string | null>(null, { nonNullable: true, validators: [Validators.required] }),
    additionalPhotos: new FormControl<string[] | undefined>([], { nonNullable: true }),
  });

  public productoId: number | undefined = 0;
  public newFoto: string = '';
  public additionalPhotos: string[] = [];
  categories: Category[] = [
    { id: 1, name: 'Todos' },
    { id: 2, name: 'Camisetas' },
    { id: 3, name: 'Hoodies' },
    { id: 4, name: 'Accesorios' },
  ];

  constructor(
    private router: Router,
    public productosService: ProductService,
    public stateService: ProductStateService,
    private route: ActivatedRoute,
    private http: HttpClient
  ) { }

  public ngOnInit(): void {
    let product: Product = this.stateService.getProduct();
    if (product) {
      this.productForm.setValue({
        name: product.name,
        description: product.description,
        price: product.price ?? 0,
        stock: product.stock ?? 0,
        category: product.category,
        frontImage: null,
        additionalPhotos: product.images,
      });
      this.productoId = product.id;

      this.productoId = product.id;
    } else {
      this.productForm.setValue({
        name: 'Título de ejemplo',
        description: 'Descripción de ejemplo',
        price: 0,
        stock: 0,
        category: 0,
        frontImage: null,
        additionalPhotos: undefined,
      });
    }
  }

  public onFileChange(event: Event, multiple: boolean = false) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      if (!multiple) {
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
        this.additionalPhotos = [];
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

  public onSubmit(): void {
    let product: Product = this.stateService.getProduct();
    const rawValue = this.productForm.getRawValue();

    const name = rawValue.name || product.name;
    const description = rawValue.description || product.description;
    const price = rawValue.price !== null ? Number(rawValue.price) : product.price;
    const stock = rawValue.stock !== null ? Number(rawValue.stock) : product.stock;
    const category = rawValue.category || product.category;
    const additionalPhotos = rawValue.additionalPhotos || product.images;


    const payload: Product = {
      name: name,
      description: description,
      price: price,
      stock: stock,
      category: category,
      frontImage: this.newFoto,
      images: additionalPhotos,
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

    if (this.newFoto) {
      changes.frontImage = this.newFoto;
    }

    if (Object.keys(changes).length === Object.keys(product).length) {
      this.productosService.putProduct(this.productoId, payload).subscribe({
        next: response => {
          console.log('Producto actualizado completamente', response);
          this.router.navigate(['/productos']);
        },
        error: error => console.error('Error al actualizar product', error)
      });
    } else if (Object.keys(changes).length > 0) {
      this.productosService.patchProduct(this.productoId, changes).subscribe({
        next: response => {
          console.log('Producto actualizado parcialmente', response);
          this.router.navigate(['/productos']);
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

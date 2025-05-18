import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MusicNewService } from '../../../core/services/music-new.service';

@Component({
  selector: 'app-create-music-new',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-music-new.component.html',
  styleUrl: './create-music-new.component.css'
})

export class CreateMusicNewComponent {
  newForm = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    content: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    createdAt: new FormControl<string>(new Date().toISOString(), { nonNullable: true }),
    releaseDate: new FormControl<string>(new Date().toISOString(), { nonNullable: true }),
    imageUrl: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    musicUrl: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  constructor(private router: Router, private service: MusicNewService) { }

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result as string;
        this.newForm.patchValue({ imageUrl: base64String.split(',')[1] });
      };
      reader.onerror = (error) => {
        console.error('Error al leer la imagen:', error);
      };
    }
  }

  public onSubmit(): void {
    if (this.newForm.invalid) {
      console.log('Formulario no válido');
      this.newForm.markAllAsTouched();
      return;
    }

    const rawValue = this.newForm.getRawValue()


    const payload = {
      title: rawValue.title || '',
      content: rawValue.content || '',
      createdAt: rawValue.createdAt || '',
      imageUrl: rawValue.imageUrl || '',
      musicUrl: rawValue.musicUrl || '',
      releaseDate: rawValue.releaseDate || '',
    };

    console.log(payload);

    this.service.postNew(payload).subscribe({
      next: (response) => {
        console.log('new creada', response);
        this.router.navigate(['/news']);
      },
      error: (error) => {
        console.error('Error al crear new', error);
        if (error.status === 400) {
          console.log('Detalles del error:', error.error);
        }
      }
    });
  }

  public cancelar(): void {
    this.router.navigate(['/news']);
  }
}

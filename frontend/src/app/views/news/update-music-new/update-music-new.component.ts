import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MusicNewService } from '../../../core/services/music-new.service';
import { MusicNewStateService } from '../../../core/services/music-new-state.service';
import { MusicNew } from '../../../core/models/music-new.model';

@Component({
  selector: 'app-update-new',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-music-new.component.html',
  styleUrl: './update-music-new.component.css'
})
export class UpdateMusicNewComponent implements OnInit {
  public newId: string | undefined = '';

  newForm = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    content: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    createdAt: new FormControl<string>(new Date().toISOString(), { nonNullable: true }),
    releaseDate: new FormControl<string>(new Date().toISOString(), { nonNullable: true }),
    imageUrl: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    musicUrl: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] })
  });

  constructor(private router: Router, private service: MusicNewService, private stateService: MusicNewStateService) { }

  public ngOnInit(): void {
      let musicNew: MusicNew = this.stateService.getNew();
          if (musicNew) {
            this.newForm.setValue({
              title: musicNew.title,
              content: musicNew.content,
              releaseDate: musicNew.releaseDate,
              imageUrl: musicNew.imageUrl,
              musicUrl: musicNew.musicUrl,
              createdAt: musicNew.createdAt
            });
            this.newId = musicNew.id;

          } else {
            this.newForm.setValue({
             title: 'Título de ejemplo',
              content: 'Descripción de ejemplo',
              releaseDate: '0',
              imageUrl: '0',
              musicUrl: '0',
              createdAt: ''
            });
          }
  }

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

    this.service.patchNew(this.newId, payload).subscribe({
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

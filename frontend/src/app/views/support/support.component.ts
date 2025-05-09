import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './support.component.html',
})
export class SupportComponent {
  submitted = false;
  isSubmitting = false;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  handleSubmit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.isSubmitting = true;

    setTimeout(() => {
      this.submitted = true;
      this.isSubmitting = false;
      this.form.reset();
    }, 2000);
  }
}

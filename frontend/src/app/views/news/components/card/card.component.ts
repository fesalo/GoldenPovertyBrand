import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MusicNew } from '../../../../core/models/music-new.model';
import { MusicNewStateService } from '../../../../core/services/music-new-state.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  constructor(private router: Router, private service: MusicNewStateService) { }
  public showConfirmModal: boolean = false;
  public apiUrl: string = 'http://127.0.0.1:8000'

  @Input() id?: string = '';
  @Input() title: string = '';
  @Input() content: string = '';
  @Input() imageUrl: string = '';
  @Input() createdAt: string = '';
  @Input() musicUrl: string = '';
  @Input() releaseDate: string = '';
  @Input() isAdmin: boolean = false;
  @Output() onDelete = new EventEmitter<void>();

  public updateNew(musicNew: MusicNew) {
    this.service.setMusicNew(musicNew)
    this.router.navigate(['/update-music-new', this.id]);
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

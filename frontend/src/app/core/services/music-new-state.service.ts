import { Injectable } from '@angular/core';
import { MusicNew } from '../models/music-new.model';

@Injectable({
  providedIn: 'root'
})

export class MusicNewStateService {
  private selectedNew: MusicNew = {
    id: '1',
    title: 'Classic T-Shirt',
    content: 'Comfortable cotton t-shirt for everyday wear',
    imageUrl: '',
    createdAt: '',
    musicUrl: '',
    releaseDate: '',
  };

  setMusicNew(musicNew: MusicNew): void {
    this.selectedNew = musicNew;
  }

  getNew(): MusicNew {
    return this.selectedNew;
  }

  clearNew(): void {
    this.selectedNew = {
      id: '1',
      title: 'Classic T-Shirt',
      content: 'Comfortable cotton t-shirt for everyday wear',
      imageUrl: '',
      createdAt: '',
      musicUrl: '',
      releaseDate: '',
    };
  }
}


import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CardComponent } from './components/card/card.component';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { MusicNew } from '../../core/models/music-new.model';
import { MusicNewService } from '../../core/services/music-new.service';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {

  public isAdmin$!: Observable<boolean>;
  public news: MusicNew[] = [
    {
      id: '1',
      title: 'AVERZZO- STILL IN LUV',
      content: 'Discover our latest summer collection featuring vibrant colors and comfortable fabrics perfect for the season.',
      createdAt: '2023-06-15',
      imageUrl: '',
      musicUrl: '',
      releaseDate: 'release',
    },
    {
      id: '2',
      title: 'Sustainable Fashion: Our Commitment',
      content: 'Learn about our initiatives to reduce environmental impact and promote sustainable fashion practices.',
      createdAt: '2023-05-22',
      imageUrl: '',
      musicUrl: '',
      releaseDate: 'release',
    },
    {
      id: '3',
      title: 'Fashion Trends for 2023',
      content: 'Stay ahead with our guide to the top fashion trends that will dominate the industry this year.',
      createdAt: '2023-04-10',
      imageUrl: '',
      musicUrl: '',
      releaseDate: 'release',
    }
  ];

  constructor(private router: Router, private authService: AuthService, public service: MusicNewService) {
    /*  this.isAdmin$ = this.authService.isAdmin$;
     console.log(this.authService) */
    /* this.isAdmin$ = of(true) */
  }

  public getNews(): void {
    /* this.news = []
    this.service.getNews().subscribe((response) => {
      this.news = response
    }); */
  }

  public ngOnInit() {
    this.getNews();
    /*  this.isAdmin$ = this.authService.isAdmin$;
     this.isAdmin$.subscribe(isAdmin => {
       console.log('isAdmin:', isAdmin);
     }); */
  }

  public addMusicNew() {
    this.router.navigate(['/create-music-new']);
  }

  public eliminarNoticia(id: string): void {
    this.service.deleteNew(id).subscribe(() => {
      this.news = this.news.filter(noticia => noticia.id !== id);
    });
  }

}

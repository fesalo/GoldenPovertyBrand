import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  comments: number;
  image: string;
}

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  newsItems: NewsItem[] = [
    {
      id: 1,
      title: 'New Summer Collection Launch',
      excerpt: 'Discover our latest summer collection featuring vibrant colors and comfortable fabrics perfect for the season.',
      date: '2023-06-15',
      comments: 8,
      image: ''
    },
    {
      id: 2,
      title: 'Sustainable Fashion: Our Commitment',
      excerpt: 'Learn about our initiatives to reduce environmental impact and promote sustainable fashion practices.',
      date: '2023-05-22',
      comments: 12,
      image: ''
    },
    {
      id: 3,
      title: 'Fashion Trends for 2023',
      excerpt: 'Stay ahead with our guide to the top fashion trends that will dominate the industry this year.',
      date: '2023-04-10',
      comments: 15,
      image: ''
    }
  ];
}

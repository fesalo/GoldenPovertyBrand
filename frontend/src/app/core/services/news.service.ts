import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { News } from '../models/news.model';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  // Mock news data
  private news: News[] = [
    {
      id: '1',
      title: 'Summer Collection Launch',
      content: `<p>We're excited to announce the launch of our Summer 2024 collection, featuring bold designs and innovative materials. This collection represents our commitment to sustainable fashion without compromising on style.</p><p>Our design team has been working tirelessly to create pieces that not only look good but feel good too. Each item is crafted with attention to detail, using high-quality materials that are built to last.</p><p>The collection includes new variants of our popular Urban Street Hoodie, fresh graphic tees, and introduces our new lightweight cargo pants perfect for summer weather.</p><p>Visit our stores or shop online to check out the full collection before items sell out!</p>`,
      summary: 'Check out our latest summer collection featuring sustainable materials and bold designs.',
      imageUrl: 'https://images.pexels.com/photos/5698851/pexels-photo-5698851.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      author: 'STREETX Team',
      createdAt: new Date('2024-04-15'),
      updatedAt: new Date('2024-04-15')
    },
    {
      id: '2',
      title: 'Collaboration with Local Artists',
      content: `<p>We're proud to announce our collaboration with three local artists to create limited edition graphic tees that celebrate our city's culture and creative spirit.</p><p>Each artist brings their unique style and perspective to the collection, resulting in wearable art that tells a story. The designs range from abstract interpretations of iconic city landmarks to bold typographic statements.</p><p>This collaboration is part of our ongoing commitment to support the local creative community and bring fresh perspectives to streetwear design.</p><p>The limited edition tees will be available in stores and online starting next week. Don't miss your chance to own these unique pieces!</p>`,
      summary: 'Limited edition graphic tees designed in collaboration with local artists.',
      imageUrl: 'https://images.pexels.com/photos/6153354/pexels-photo-6153354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      author: 'Creative Director',
      createdAt: new Date('2024-04-05'),
      updatedAt: new Date('2024-04-07')
    },
    {
      id: '3',
      title: 'Sustainability Initiative',
      content: `<p>Today we're announcing our commitment to sustainability with our new eco-friendly packaging and manufacturing processes.</p><p>Starting this month, all our products will be shipped in 100% recycled and biodegradable packaging. We're also transitioning to using organic cotton and recycled materials in our production wherever possible.</p><p>This is just the first step in our journey toward more sustainable practices. We're actively researching and implementing ways to reduce our environmental footprint while maintaining the quality and style you expect from us.</p><p>We believe that great streetwear doesn't have to come at the expense of our planet, and we're committed to proving that with every item we produce.</p>`,
      summary: 'Our commitment to sustainability with eco-friendly packaging and materials.',
      imageUrl: 'https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      author: 'Sustainability Officer',
      createdAt: new Date('2024-03-22'),
      updatedAt: new Date('2024-03-22')
    }
  ];

  constructor() {}

  getNews(): Observable<News[]> {
    return of([...this.news]).pipe(delay(500)); // Simulate network delay
  }

  getNewsById(id: string): Observable<News | undefined> {
    const newsItem = this.news.find(n => n.id === id);
    return of(newsItem).pipe(delay(300)); // Simulate network delay
  }

  createNews(news: Omit<News, 'id' | 'createdAt' | 'updatedAt'>): Observable<News> {
    const now = new Date();
    const newNews: News = {
      ...news,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: now,
      updatedAt: now
    };
    
    this.news.push(newNews);
    return of(newNews).pipe(delay(500)); // Simulate network delay
  }

  updateNews(id: string, news: Partial<News>): Observable<News> {
    const index = this.news.findIndex(n => n.id === id);
    
    if (index === -1) {
      throw new Error('News item not found');
    }
    
    const updatedNews = {
      ...this.news[index],
      ...news,
      updatedAt: new Date()
    };
    
    this.news[index] = updatedNews;
    return of(updatedNews).pipe(delay(500)); // Simulate network delay
  }

  deleteNews(id: string): Observable<boolean> {
    const initialLength = this.news.length;
    this.news = this.news.filter(n => n.id !== id);
    
    return of(this.news.length !== initialLength).pipe(delay(500)); // Simulate network delay
  }
}
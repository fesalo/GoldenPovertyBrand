import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Review } from '../models/review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  // Mock reviews data
  private reviews: Review[] = [
    {
      id: '1',
      productId: '1',
      userId: '2',
      username: 'streetfashion_lover',
      rating: 5,
      comment: 'This hoodie is amazing! The quality is top-notch and the design is clean and modern. Definitely worth the price.',
      createdAt: new Date('2024-04-10')
    },
    {
      id: '2',
      productId: '1',
      userId: '3',
      username: 'urban_style',
      rating: 4,
      comment: 'Great hoodie, very comfortable and warm. The only downside is that it runs a bit large, so consider sizing down.',
      createdAt: new Date('2024-04-05')
    },
    {
      id: '3',
      productId: '2',
      userId: '4',
      username: 'fashion_forward',
      rating: 5,
      comment: 'The graphic print on this t-shirt is even better in person! The material is soft and the fit is perfect.',
      createdAt: new Date('2024-04-12')
    },
    {
      id: '4',
      newsId: '1',
      userId: '5',
      username: 'trend_watcher',
      rating: 5,
      comment: 'Can\'t wait for the summer collection! The sneak peeks look amazing.',
      createdAt: new Date('2024-04-16')
    }
  ];

  constructor() {}

  getReviewsForProduct(productId: string): Observable<Review[]> {
    const productReviews = this.reviews.filter(r => r.productId === productId);
    return of(productReviews).pipe(delay(300)); // Simulate network delay
  }

  getReviewsForNews(newsId: string): Observable<Review[]> {
    const newsReviews = this.reviews.filter(r => r.newsId === newsId);
    return of(newsReviews).pipe(delay(300)); // Simulate network delay
  }

  getReviewsByUser(userId: string): Observable<Review[]> {
    const userReviews = this.reviews.filter(r => r.userId === userId);
    return of(userReviews).pipe(delay(300)); // Simulate network delay
  }

  createReview(review: Omit<Review, 'id' | 'createdAt'>): Observable<Review> {
    const newReview: Review = {
      ...review,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    
    this.reviews.push(newReview);
    return of(newReview).pipe(delay(500)); // Simulate network delay
  }

  updateReview(id: string, review: Partial<Review>): Observable<Review> {
    const index = this.reviews.findIndex(r => r.id === id);
    
    if (index === -1) {
      throw new Error('Review not found');
    }
    
    const updatedReview = {
      ...this.reviews[index],
      ...review
    };
    
    this.reviews[index] = updatedReview;
    return of(updatedReview).pipe(delay(500)); // Simulate network delay
  }

  deleteReview(id: string): Observable<boolean> {
    const initialLength = this.reviews.length;
    this.reviews = this.reviews.filter(r => r.id !== id);
    
    return of(this.reviews.length !== initialLength).pipe(delay(500)); // Simulate network delay
  }
}
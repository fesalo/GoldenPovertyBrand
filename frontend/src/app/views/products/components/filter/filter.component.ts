import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { Category } from '../../../../core/models/product.model';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {

  @Input() categories: Category[] = [];
  @Input() priceRange: [number, number] = [0, 100];

  @Output() onSelectedCategories = new EventEmitter<number[]>();

  selectedCategories: number[]=[];



  setPriceRange(value: number): void {
    this.priceRange = [this.priceRange[0], value];
  }

  isSelected(categoryId: number): boolean {
    return this.selectedCategories.includes(categoryId);
  }

  toggleCategory(categoryId: number): void {
    if (this.isSelected(categoryId)) {
      this.selectedCategories = this.selectedCategories.filter(id => id !== categoryId);
      this.onSelectedCategories.emit(this.selectedCategories);
      return;
    }

    if (!this.isSelected(categoryId)) {
      this.selectedCategories.push(categoryId);
      this.onSelectedCategories.emit(this.selectedCategories);
      return;
    }


  }

}

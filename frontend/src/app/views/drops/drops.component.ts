import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-drops',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './drops.component.html',
  styleUrls: ['./drops.component.css']
})
export class DropsComponent {
  drops = [
    {
      id: '009(22)',
      title: 'Milf Shakes',
      subtitle: 'DROP.009',
      image: 'assets/img/drop009.png'
    },
    {
      id: 'ESSNTLS 2008',
      title: 'Winter',
      subtitle: 'DROP.008',
      image: 'assets/img/drop008.png'
    },
    {
      id: 'CASCO FC 007',
      title: 'Motomierda',
      subtitle: 'DROP.007',
      image: 'assets/img/drop007.png'
    }
  ];
}

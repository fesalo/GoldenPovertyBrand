import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { CartComponent } from './views/cart/cart.component';
import { SupportComponent } from './views/support/support.component';
import { DropsComponent } from './views/drops/drops.component';
import { NewsComponent } from './views/news/news.component';
import { ProductsComponent } from './views/products/products.component';
import { ProductDetailComponent } from './views/products/product-detail/product-detail.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cart', component: CartComponent},
  { path: 'support', component: SupportComponent },
  { path: 'drops', component: DropsComponent },
  { path: 'news', component: NewsComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'producto/:id', component: ProductDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

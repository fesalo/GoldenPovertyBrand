import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { AboutComponent } from './views/about/about.component';
import { CartComponent } from './views/cart/cart.component';
import { SupportComponent } from './views/support/support.component';
import { NewsComponent } from './views/news/news.component';
import { ProductDetailComponent } from './views/products/product-detail/product-detail.component';
import { CreateProductComponent } from './views/products/create-product/create-product.component';
import { UpdateProductComponent } from './views/products/update-product/update-product.component';
import { UpdateMusicNewComponent } from './views/news/update-music-new/update-music-new.component';
import { CreateMusicNewComponent } from './views/news/create-music-new/create-music-new.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'cart', component: CartComponent},
  { path: 'support', component: SupportComponent },
  { path: 'news', component: NewsComponent },
  { path: 'producto/:id', component: ProductDetailComponent },
  { path: 'create-product', component:CreateProductComponent },
  { path: 'update-product/:id', component:UpdateProductComponent },
  { path: 'create-music-new', component:CreateMusicNewComponent },
  { path: 'update-music-new/:id', component:UpdateMusicNewComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

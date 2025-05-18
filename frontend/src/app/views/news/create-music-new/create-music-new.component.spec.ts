import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMusicNewComponent } from './create-music-new.component';

describe('CreateMusicNewComponent', () => {
  let component: CreateMusicNewComponent;
  let fixture: ComponentFixture<CreateMusicNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMusicNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMusicNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMusicNewComponent } from './update-music-new.component';

describe('UpdateMusicNewComponent', () => {
  let component: UpdateMusicNewComponent;
  let fixture: ComponentFixture<UpdateMusicNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateMusicNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateMusicNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

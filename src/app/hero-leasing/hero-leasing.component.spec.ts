import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroLeasingComponent } from './hero-leasing.component';

describe('HeroLeasingComponent', () => {
  let component: HeroLeasingComponent;
  let fixture: ComponentFixture<HeroLeasingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroLeasingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroLeasingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

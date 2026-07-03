import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtigoFormComponent } from './artigo-form.component';

describe('ArtigoFormComponent', () => {
  let component: ArtigoFormComponent;
  let fixture: ComponentFixture<ArtigoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtigoFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtigoFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailRecommendedComponent } from './product-detail-recommended.component';

describe('ProductDetailRecommendedComponent', () => {
  let component: ProductDetailRecommendedComponent;
  let fixture: ComponentFixture<ProductDetailRecommendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDetailRecommendedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailRecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

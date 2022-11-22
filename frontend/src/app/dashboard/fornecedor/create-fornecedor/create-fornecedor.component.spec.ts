import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFornecedorComponent } from './create-fornecedor.component';

describe('CreateFornecedorComponent', () => {
  let component: CreateFornecedorComponent;
  let fixture: ComponentFixture<CreateFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateFornecedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

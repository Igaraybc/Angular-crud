import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadFornecedorComponent } from './read-fornecedor.component';

describe('ReadFornecedorComponent', () => {
  let component: ReadFornecedorComponent;
  let fixture: ComponentFixture<ReadFornecedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadFornecedorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

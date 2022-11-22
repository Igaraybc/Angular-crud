import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() itemsPerPage: number=7;
  @Input() itemsNumber: number =0;
  @Input() allPagesNumber: number = 0;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();
  @Output() changeSelect: EventEmitter<number> = new EventEmitter<number>();
  private _currentPage: number = 1;
  SelectItemsPage: number = 7;

  constructor() { }

  ngOnInit(): void {
  }

  get currentPage(): number{
    return this._currentPage;
  }

  set currentPage(page){
    this._currentPage = page;
    this.changePage.emit(this._currentPage);
  }

  onSetPage(event: any){
    this.currentPage = event.target.value;
  }

  onFirstPage(){
    this.currentPage = 1;
  }

  onLastPage(){
    this.currentPage = this.allPagesNumber;
  }

  onNextPage(){
    this.currentPage++;
  }

  onPreviousPage(){
    this.currentPage--;
  }
  
  itemPerPage(){
    this.itemsPerPage = this.SelectItemsPage;
    this.changeSelect.emit(this.SelectItemsPage);
  }

  verificaInput(evento:any){
    if(!evento.value || evento.value > this.allPagesNumber){
      this.currentPage = 1;
    }
  }
}

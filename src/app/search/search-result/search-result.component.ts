import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'kt-search-result',
  templateUrl: './search-result.component.html'
})
export class SearchResultComponent  {

  constructor() { }

  @Input() queryString;
  @Input() queryName;
  @Input() queryResult;

  @Input() recordsFound: number;
  @Input() pageSize: number;
  @Input() pageNumber: number;
  @Input() maxPageNumber: number;

  @Output() redoSearch = new EventEmitter();
  @Output() downloadMasterFile = new EventEmitter();


  doSearch() {
    this.redoSearch.emit(this.pageNumber);
  }

  forward(){
    this.pageNumber++;
    this.doSearch();
  }

  back(){
    this.pageNumber--;
    this.doSearch();
  }

  onDownloadMasterFile(elementInfo) {
    this.downloadMasterFile.emit(elementInfo);
  }

}

import { Tools } from '../shared/tools';
import { Component, OnInit } from '@angular/core';

import { HttpService } from "../services/http.service";
import { Server } from "../shared/server";
import { ElementResponse } from "../api/element-response";
import { SearchResponse } from "../api/search-response";

import * as FileSaver from 'file-saver';
import { AlertService } from "../services/alert.service";

@Component({
  selector: 'kt-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {
  constructor(
      private httpService: HttpService,
      private alertService: AlertService) { }

  queryString;
  queryResult;

  recordsFound: number;
  pageSize: number = 20;
  pageNumber: number = 1;
  maxPageNumber: number;

  ngOnInit() {
    this.queryString = Tools.getStorageValue("lastQuery");

    if (this.queryString != null) {
      this.pageNumber = Number(Tools.getStorageValue('lastQueryPageNumber'));
      this.getSearchResult(this.queryString);
    }
  }

  redoSearch(pageNumber) {
    this.pageNumber = pageNumber;
    this.getSearchResult(this.queryString);
  }

  doSearch() {
    this.alertService.info("Suche wird ausgeführt...")
    this.getSearchResult(this.queryString);
  }

  // ------------------------------------------------------------------
  // Downloads the master file
  // ------------------------------------------------------------------  
  async onDownloadMasterFile(elementInfo) {
    var elementKey = elementInfo.value.Key;

    try {
      await this.httpService.downloadMasterFile(Server.WebApiUrl, elementKey).toPromise();
    } 
    catch (error) {
      console.log ("Error: onDownloadMasterFile {" + elementInfo + "}" + error)
    }
  }

  // ------------------------------------------------------------------
  // Performs a search
  // ------------------------------------------------------------------
  async getSearchResult(querystring: string) {

    if (querystring != Tools.getStorageValue('lastQuery'))
      this.pageNumber = 1;

    Tools.setStorageValue('lastQuery', querystring);

    let url = Server.WebApiUrl + "/search?q=" + querystring + "&page=" + this.pageNumber + "&size=" + this.pageSize;

    try {
      const response: SearchResponse = await  this.httpService.sendGetRequest(url).toPromise();

      this.queryResult = SearchResponse.ToElementListArray(response);
      this.recordsFound = response.Totalrecords;
      this.pageSize = response.PageSize;

      response.PageNumber = response.PageNumber;
      Tools.setStorageValue('lastQueryPageNumber', response.PageNumber.toString());

      this.maxPageNumber = Math.ceil(this.recordsFound / this.pageSize);

      if (this.recordsFound==0)
        this.alertService.success("Keine Elemente gefunden :-(");
      else
        this.alertService.clearMessage();             
    } 
    catch (error) {
      this.alertService.error(error);
    }
  
    }
}

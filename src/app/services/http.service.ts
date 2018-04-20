import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import 'rxjs/Rx';

import * as FileSaver from 'file-saver';
import { ProgressHttp } from "angular-progress-http";

import { Server } from "../shared/server";
import { AuthService } from './auth.service';
import { FilesResponse } from "../api/files-response";
import { AlertService } from "./alert.service";

@Injectable()
export class HttpService {

  constructor(private http: ProgressHttp, 
              private authService: AuthService,
              private alertService: AlertService) {}

              /**
 * Sends a GET request to the server
 * 
 * @param {string} webApiUrl 
 * @returns 
 * @memberof HttpService
 */
sendGetRequest(webApiUrl: string) {

    const headers = this.authService.getAuthHeader();
    const options = this.getRequestOptions(headers, ResponseContentType.Json);

    return this.http
      .withDownloadProgressListener(progress => {})
      .get(webApiUrl, options)
      .map((response: Response) => response.json())
    }

  /**
   * Gets the RequestOptions
   * 
   * @private
   * @param {any} headers 
   * @param {ResponseContentType} responseType 
   * @returns 
   * @memberof HttpService
   */
  private getRequestOptions(headers: any, responseType: ResponseContentType) {
       const options = new RequestOptions( 
      {
        headers: headers,
        responseType: responseType
      });

      return options;
  }

/**
 * Downloads the master file of a document
 * 
 * @param {string} webApiUrl 
 * @param {string} elementKey 
 * @returns 
 * @memberof HttpService
 */
downloadMasterFile(webApiUrl: string, elementKey: string) {
    this.alertService.info('Datei wird heruntergeladen...');

    var url = webApiUrl + "/elements/" + elementKey + "/files/masterfile";
    var headers = this.authService.getAuthHeader();
    headers.append('Accept', 'application/octet-stream');

    var options = this.getRequestOptions(headers, ResponseContentType.Blob);

    this.getFilename(elementKey);

    return this.http
      .withDownloadProgressListener(progress => { 
          this.alertService.info(`Datei wird heruntergeladen... ${progress.percentage}%`);
        })    
      .get(url, options)
      .map((response: Response) => {
        let blob: Blob = response.blob();
        
        FileSaver.saveAs(blob, this.filename)
        this.alertService.clearMessage();
      })
  }

  filename: string;
    
  /**
   * Returns the file name of the master file of a given document
   * 
   * @param {string} elementKey 
   * @returns 
   * @memberof HttpService
   */
  getFilename(elementKey: string) { 
    return this
        .sendGetRequest(Server.WebApiUrl + "/elements/" + elementKey + "/files")
        .map((response: FilesResponse) => response.FileInfos[0].FileDisplayname)
        .subscribe((data => { return this.filename = data }))
    }  



/**
 * Sends a GET request for a graphic to the server
 * 
 * @param {string} webApiUrl 
 * @returns 
 * @memberof HttpService
 */
sendGetImageRequest(webApiUrl: string) {

    const headers = this.authService.getAuthHeader();
    const options = this.getRequestOptions(headers, ResponseContentType.ArrayBuffer);

    // Aufruf an den Server senden
    return this.http
      .get(webApiUrl, options)
      
    }

}

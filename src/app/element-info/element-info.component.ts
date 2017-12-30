import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';

import { HttpService } from "../services/http.service";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { ElementResponse } from "../api/element-response";
import { Server } from "../shared/server";
import { Tools } from "../shared/tools";
import { AlertService } from '../services/alert.service';
import { MasterfileNamePipe } from '../pipes/masterfile-name.pipe';
import { ElementList } from '../api/element-list';


@Component({
  selector: 'we-element-info',
  templateUrl: './element-info.component.html'
  
})
export class ElementInfoComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  elementKey: string;

  element: ElementList;
  preview: string;

  constructor(private httpService: HttpService,
              private activatedRoute: ActivatedRoute,
              private alertService: AlertService) { }

  ngOnInit() {
   this.subscription = this.activatedRoute.queryParams.subscribe(
      (params: any) => {
        this.elementKey = params['elementKey'];

        if (this.elementKey != null) {
          this.getElementInfo(this.elementKey);
          this.getPreview(this.elementKey);
        } 
      }
    );

  }

  // ------------------------------------------------------------------
  // Cancel subscription in order to avoid a possible memory leak
  // ------------------------------------------------------------------
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  // ------------------------------------------------------------------
  // Get the preview of the specified element
  // ------------------------------------------------------------------
  async getPreview(elementKey: string) {

    try {
      const response = await this.httpService
        .sendGetImageRequest(Server.WebApiUrl + "/elements/" + elementKey + "/preview").toPromise();

        var arrayBuffer = response.arrayBuffer();
        this.preview = 'data:image/jpeg;base64,' + Tools.arrayBufferToBase64(arrayBuffer);

    } catch (error) {
      this.alertService.error(error);
    }

  }

  masterFileNameExtension: string;

  // ------------------------------------------------------------------
  // Determines the data of a keytech element
  // ------------------------------------------------------------------
  async getElementInfo(elementKey: string) { 

    try {
      const response: ElementResponse = await this.httpService
        .sendGetRequest(Server.WebApiUrl + "/elements/" + elementKey).toPromise();

      this.element = response.ElementList[0];

      let pipe = new MasterfileNamePipe(this.httpService);
      this.masterFileNameExtension = await pipe.getMasterFilenameExtension(elementKey);

    } catch (error) {
      this.alertService.error(error);
    }

  }

  // ------------------------------------------------------------------
  // Download the master file of a keytech document
  // ------------------------------------------------------------------  
  async onDownloadMasterFile(elementKey) {

    try {
      await this.httpService.downloadMasterFile(Server.WebApiUrl, elementKey).toPromise();
    } 
    catch (error) {
      console.log ("Error: onDownloadMasterFile {" + elementKey + "}" + error)
    }
  }  

}

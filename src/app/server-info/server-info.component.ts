import { Component, OnInit } from '@angular/core';

import { HttpService } from "../services/http.service";
import { Server } from "../shared/server";
import { AlertService } from "../services/alert.service";
import { ServerInfoResponse } from '../api/serverinfo-response';

@Component({
  selector: 'kt-server-info',
  templateUrl: './server-info.component.html'
})
export class ServerInfoComponent implements OnInit {

  constructor(private httpService: HttpService,
              private alertService: AlertService) { }

  serverUrl: string = Server.WebApiUrl;
  serverInfo: any[];

  ngOnInit() {
    this.connect();
  }

  async connect() {

    try {
      this.getServerInfo(Server.WebApiUrl + "/serverinfo");
      this.alertService.clearMessage();

    } catch (error) {
      this.serverInfo = [];
    }
    
  }

  // ------------------------------------------------------------------
  // Gets server info
  // ------------------------------------------------------------------
  async getServerInfo(url) {

    try {
      const response: ServerInfoResponse = await this.httpService.sendGetRequest(url).toPromise();
      this.serverInfo = ServerInfoResponse.ToKeyValueArray(response);
    } 
    catch (error) {
      this.alertService.error(error);
      this.serverInfo = [];
    }
  }
}

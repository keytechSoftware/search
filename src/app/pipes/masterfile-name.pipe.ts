import { Pipe, PipeTransform } from '@angular/core';

import { HttpService } from "../services/http.service";
import { Server } from "../shared/server";
import { FilesResponse } from "../api/files-response";

/**
 * Asynchronous pipe that returns the name of the master file of the specified document.
 * 
 * @export
 * @class MasterfileNamePipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'masterfileName'
})

export class MasterfileNamePipe implements PipeTransform {
  constructor(private httpService: HttpService) { }

  transform(value: any, args?: any): any {
    var elementKey: string = value;

    if (elementKey.length == 0) {
      return null;
    }
    else {
      // Folders and articles do not have any files
      if (elementKey.includes("_WF") || elementKey.includes("_MI"))
        return null;
      else
        return this.getMasterFilenameExtension(elementKey);
      }

  }

/**
 * Gets the file extension of the master file
 * 
 * @param {string} elementKey 
 * @returns 
 * @memberof MasterfileNamePipe
 */
async getMasterFilenameExtension(elementKey: string) { 

    try {
      const response: FilesResponse = await this.httpService
        .sendGetRequest(Server.WebApiUrl + "/elements/" + elementKey + "/files").toPromise();

      if (response.FileInfos.length > 0) {      
        var fileName: string = response.FileInfos[0].FileDisplayname;
        return fileName.substr(fileName.lastIndexOf('.') + 1)
      }
      else
        return null;
    }

    catch (error) {
      console.log ("Error: getMasterFilenameExtension {" + elementKey + "}" + error)
      return null;
    }
 
  }
}

import { Pipe, PipeTransform } from '@angular/core';

import { HttpService } from "../services/http.service";
import { Server } from "../shared/server";
import { Tools } from "../shared/tools";

/**
 * Asynchronous pipe that returns the thumbnail of the specified element
 * 
 * @export
 * @class ThumbnailPipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'thumbnail'
})
export class ThumbnailPipe implements PipeTransform {
  constructor(private httpService: HttpService) { }
  
  transform(value: any, args?: any): any {
    var elementKey: string = value;
    return this.getThumbnail(elementKey);
  }

/**
 * Returns the thumbnail of the specified element
 * 
 * @param {string} elementKey 
 * @returns 
 * @memberof ThumbnailPipe
 */
async getThumbnail(elementKey: string) {

  if (elementKey.length == 0) {
    return null;
  }
  else {
    try {
      const response: any = await this.httpService
        .sendGetImageRequest(Server.WebApiUrl + "/elements/" + elementKey + "/thumbnail").toPromise();

        var arrayBuffer = response.arrayBuffer();
        return 'data:image/png;base64,' + Tools.arrayBufferToBase64(arrayBuffer);

    } 
    catch (error) {
      console.log ("Error: getThumbnail {" + elementKey + "}" + error)
    }

  }

  }

}

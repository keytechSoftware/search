import { Pipe, PipeTransform } from '@angular/core';

/**
 * Returns the status of the specified element
 * 
 * @export
 * @class StatusPipe
 * @implements {PipeTransform}
 */
@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var element = value;
    
    if (element.Key.includes("TASK_WF"))
      return element.TaskStatusDisplayText;
    else
      return element.Status;
  }

}

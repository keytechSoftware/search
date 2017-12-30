import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayname'
})
// ------------------------------------------------------------------
// Gets the display name of the specified element
// ------------------------------------------------------------------ 
export class DisplaynamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let element = value;

    if (element.Key.includes("MAIL_WF") || element.Key.includes("TASK_WF"))
      return element.Subject;
    else
      return element.DisplayName;
  }

}

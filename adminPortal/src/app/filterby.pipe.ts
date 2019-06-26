import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterby'
})
export class FilterbyPipe implements PipeTransform {

  transform(array: any, args?: any): any {

    if (!array || !args) {
      return null;
  }
  // filter items array, items which match and return true will be
  // kept, false will be filtered out
  return array.filter(item => item.cityId == parseInt(args))[0].areas;
  }

}

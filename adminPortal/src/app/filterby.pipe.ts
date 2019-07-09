import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterby'
})
export class FilterbyPipe implements PipeTransform {

  transform(array: any, filtertype:any, args?: any): any {

  
  // filter items array, items which match and return true will be
  // kept, false will be filtered out
    if(filtertype=='workAreas'){
      if (!array || !args) {
        return null;
      }
      return array.filter(item => item.cityId == parseInt(args))[0].areas;
    }

    if(filtertype=='skillsDetails'){
      if (!array || !args) {
        return null;
      };
      var skillIds = [];
      args.forEach(element => {
        skillIds.push(element.categoryId);
      });
      console.log(skillIds);
      console.log(array.filter(item => skillIds.indexOf(item.categoryId)<-1));
      return array.filter(item => (skillIds.indexOf(item.categoryId)>-1 && item.subCategories.length));

    }

  }

}

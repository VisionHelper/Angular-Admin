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
      return array.filter(item => (skillIds.indexOf(item.categoryId)>-1 && item.subCategories.length));

    }

    if(filtertype=='employerFilter'){
      if (!array || !args) {
        return null;
      };
    
    return array.filter(item => (((item.name && args.name)?item.name.trim().toLowerCase().includes(args.name.trim().toLowerCase()):false) || 
          ((item.mobileNum && args.mobileNum)?item.mobileNum.toString().trim().includes(args.mobileNum.trim()):false) ||
          ((item.city && args.city)?item.city.trim().toLowerCase().includes(args.city.trim().toLowerCase()):false)
      ));
    }
  }

}

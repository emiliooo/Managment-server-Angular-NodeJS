import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch'
})
export class FilterSearchPipe implements PipeTransform {
  transform(data: any[], searchTerm: string): any[] {
    if (!data) {
      return [];
    }
    searchTerm = searchTerm.toUpperCase();
    return data.filter(item => {
      return item.name.toUpperCase().indexOf(searchTerm) !== -1;
    });
  }

}

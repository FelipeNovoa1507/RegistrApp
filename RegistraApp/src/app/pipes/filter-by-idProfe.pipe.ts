import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByIdProfe'
})
export class FilterByIdProfePipe implements PipeTransform {

  transform(items: any[] | null, idProfesor: string | null): any[] {
    if (!items) return [];
    if (!idProfesor) return items;
    return items.filter(item => item.idProfesor === idProfesor);
  }
}
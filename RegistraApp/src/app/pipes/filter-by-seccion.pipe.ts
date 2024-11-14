import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBySeccion'
})
export class FilterBySeccionPipe implements PipeTransform {

  transform(items: any[] | null, seccion: string | null): any[] {
    if (!items) return [];
    if (!seccion) return items;
    return items.filter(item => item.seccion === seccion);
  }
}
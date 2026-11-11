import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class SortOrderPipe implements PipeTransform<string, 'asc' | 'desc'> {
  transform(value?: string): 'asc' | 'desc' {
    if (value === undefined || value === null || value === '') return 'asc';
    const order = value.toLowerCase();
    if (order !== 'asc' && order !== 'desc') {
      throw new BadRequestException('order must be asc or desc');
    }
    return order;
  }
}
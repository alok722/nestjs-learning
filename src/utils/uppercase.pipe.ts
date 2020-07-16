/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UppercasePipe implements PipeTransform<string, string> {
  transform(value: any, metadata: ArgumentMetadata) {
    // console.log(value);
    // console.log(metadata.type);
    // console.log('---------------');

    if (!value) return value;

    return value.toUpperCase();
  }
}

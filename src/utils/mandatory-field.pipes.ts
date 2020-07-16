/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PipeTransform, ArgumentMetadata, HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class MandatoryFieldsPipes implements PipeTransform {

    constructor(private fields: Array<string>) {}

    transform(value: any, metadata: ArgumentMetadata) {
        if (!value || typeof value !== 'object') {
            throw new HttpException('Payload must be an object', 400);
        }

        const missingFields = [];
        this.fields.forEach(field => {
            if (!value[field]) missingFields.push(field)
        });

        if (missingFields.length > 0) {
            throw new HttpException(`Payload should include: ${missingFields.join(', ')}`, 400);
        }

        return value;
    }
}
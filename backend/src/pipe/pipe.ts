
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';



@Injectable()
export class MyParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value);
    if(isNaN(val))
        throw new BadRequestException('Validation failed!')
    return val;
  }
}

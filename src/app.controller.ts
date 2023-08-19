import { Body, Controller, Post } from '@nestjs/common';
import { InvokeDataService } from './app.service';

@Controller()
export class PopulationController {
  constructor(private readonly invokeDataService: InvokeDataService) {}

  @Post('/population')
  getPopulation(@Body() obj: any): Promise<any> {
    return this.invokeDataService.getPopulation(obj);
  }
}

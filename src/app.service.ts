import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Span } from '@metinseylan/nestjs-opentelemetry';

export type Nation = {
  data: data[];
  source: Array<any>;
};

export type data = {
  Nation: string;
  year: string;
  Population: number;
};

@Injectable()
export class InvokeDataService {
  constructor(private httpService: HttpService) {}
  @Span()
  public getPopulation(obj: any): Promise<Nation> {
    const year = this.getYear(obj);
    const population = this.getPopulationData(year);
    return population;
  }
  @Span()
  private getYear(obj: any): string {
    const year = obj.year;
    return year;
  }
  @Span()
  private async getPopulationData(year): Promise<Nation> {
    const response = await lastValueFrom(
      this.httpService.get(
        `https://datausa.io/api/data?drilldowns=Nation&measures=Population&year=${year}`,
      ),
    );
    console.log(response.data);
    return response.data;
  }
}

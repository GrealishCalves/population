import { Module } from '@nestjs/common';
import { PopulationController } from './app.controller';
import { InvokeDataService } from './app.service';
import { OpenTelemetryModule } from '@metinseylan/nestjs-opentelemetry';
import {
  ControllerInjector,
  GuardInjector,
  EventEmitterInjector,
  ScheduleInjector,
  PipeInjector,
  LoggerInjector,
} from '@metinseylan/nestjs-opentelemetry/';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { HttpModule } from '@nestjs/axios';

const jaegerExporter = new JaegerExporter({
  endpoint: 'http://localhost:14268/api/traces',
});

const spanProcessor = new SimpleSpanProcessor(jaegerExporter) as any;

@Module({
  imports: [
    OpenTelemetryModule.forRoot({
      serviceName: 'population-service',
      traceAutoInjectors: [
        ControllerInjector,
        GuardInjector,
        EventEmitterInjector,
        ScheduleInjector,
        PipeInjector,
        LoggerInjector,
      ],
      spanProcessor: spanProcessor,
    }),
    HttpModule,
  ],
  controllers: [PopulationController],
  providers: [InvokeDataService],
})
export class AppModule {}

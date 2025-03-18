import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@Controller('/actuator/health')
export default class HealthController {
    private readonly healthCheckService: HealthCheckService;

    constructor(healthCheckService: HealthCheckService) {
        this.healthCheckService = healthCheckService;
    }

    @Get()
    @HealthCheck()
    @ApiExcludeEndpoint()
    check() {
        return this.healthCheckService.check([]);
    }
}

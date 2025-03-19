import { Controller, Get } from '@nestjs/common';
import { ApiExcludeEndpoint } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, HttpHealthIndicator, MemoryHealthIndicator } from '@nestjs/terminus';
import { ConfigService } from '@nestjs/config';

@Controller('/actuator/health')
export default class HealthController {
    constructor(
        private readonly healthCheckService: HealthCheckService,
        private readonly httpIndicator: HttpHealthIndicator,
        private readonly memoryIndicator: MemoryHealthIndicator,
        private readonly configService: ConfigService,
    ) {}

    @Get()
    @HealthCheck()
    @ApiExcludeEndpoint()
    check() {
        const backendUrl = this.configService.get<string>('BACKEND_API_URL') || 'http://localhost:8080';

        return this.healthCheckService.check([
            () => this.httpIndicator.pingCheck('backend-api', `${backendUrl}/actuator/health`),
            () => this.memoryIndicator.checkHeap('memory_heap', 200 * 1024 * 1024),
            () => this.memoryIndicator.checkRSS('memory_rss', 300 * 1024 * 1024),
        ]);
    }
}

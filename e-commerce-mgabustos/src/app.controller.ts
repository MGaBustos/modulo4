import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
	constructor(private readonly appService: AppService) {}

	@Get()
	@ApiOperation({ summary: 'Comprobar estado del servidor' })
	@ApiResponse({ status: 200, description: 'El servidor está activo.' })
	getHello(): string {
		return this.appService.getHello();
	}
}

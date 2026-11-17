import {
	Controller,
	Param,
	Put,
	UploadedFile,
	UseInterceptors,
	ParseUUIDPipe,
	ParseFilePipe,
	MaxFileSizeValidator,
	FileTypeValidator,
	UseGuards,
} from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/guards/auth/auth.guard';
import {
	ApiBearerAuth,
	ApiTags,
	ApiOperation,
	ApiResponse,
	ApiParam,
	ApiConsumes,
	ApiBody,
	ApiUnauthorizedResponse,
	ApiBadRequestResponse,
} from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Role } from '../common/roles.enum';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('File Upload')
@ApiBearerAuth()
@Controller('file-upload')
export class FileUploadController {
	constructor(private readonly fileUploadService: FileUploadService) {}

	@Put('uploadImage/:id')
	@Roles(Role.Admin)
	@UseGuards(AuthGuard, RolesGuard)
	@UseInterceptors(FileInterceptor('file'))
	@ApiOperation({
		summary: 'Subir o actualizar imagen de un producto (Solo Admin)',
	})
	@ApiConsumes('multipart/form-data')
	@ApiBody({
		description:
			'Seleccionar un archivo de imagen (jpg, jpeg, png, webp) de hasta 200KB',
		schema: {
			type: 'object',
			properties: {
				file: {
					type: 'string',
					format: 'binary',
				},
			},
		},
	})
	@ApiParam({
		name: 'id',
		description: 'UUID v4 del producto al que pertenece la imagen',
		type: 'string',
	})
	@ApiResponse({
		status: 200,
		description: 'Imagen subida y URL actualizada en el producto.',
	})
	@ApiBadRequestResponse({
		description:
			'Producto con id incorrecto, formato no permitido o supera los 200KB.',
	})
	@ApiUnauthorizedResponse({ description: 'No autorizado (401).' })
	async uploadImage(
		@Param('id', ParseUUIDPipe) productId: string,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({
						maxSize: 200000,
						message:
							'El archivo supera el límite permitido de 200kb',
					}),
					new FileTypeValidator({
						fileType: /(jpg|jpeg|png|webp)$/,
					}),
				],
			}),
		)
		file: Express.Multer.File,
	) {
		return this.fileUploadService.uploadImage(productId, file);
	}
}

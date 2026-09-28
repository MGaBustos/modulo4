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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('File Upload')
@Controller('file-upload')
export class FileUploadController {
	constructor(private readonly fileUploadService: FileUploadService) {}

	@Put('uploadImage/:id')
	@ApiBearerAuth()
	@UseGuards(AuthGuard)
	@UseInterceptors(FileInterceptor('file'))
	async uploadImage(
		@Param('id', ParseUUIDPipe) productId: string,
		@UploadedFile(
			new ParseFilePipe({
				validators: [
					new MaxFileSizeValidator({
						maxSize: 200000, // 200kb en bytes aprox (o 204800 para ser exactos)
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

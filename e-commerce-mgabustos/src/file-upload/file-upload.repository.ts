import { Injectable, BadRequestException } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class FileUploadRepository {
	async uploadImage(
		file: { buffer?: Buffer } | null | undefined,
	): Promise<UploadApiResponse> {
		if (!file?.buffer) {
			throw new BadRequestException(
				'No se ha adjuntado ningún archivo válido',
			);
		}

		return new Promise((resolve, reject) => {
			const upload = cloudinary.uploader.upload_stream(
				{ resource_type: 'auto' },
				(error, result) => {
					if (error || !result) {
						return reject(
							error instanceof Error
								? error
								: new Error(
										'Error al cargar imagen en Cloudinary',
									),
						);
					}
					resolve(result);
				},
			);

			// Usamos el Stream nativo de Node.js en lugar de buffer-to-stream para evitar fallos de importación
			const stream = Readable.from(file.buffer!);
			stream.pipe(upload);
		});
	}
}

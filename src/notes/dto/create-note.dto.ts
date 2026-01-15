import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ example: 'Comprar comida', description: 'Título de la nota' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Leche, Huevos, Pan', description: 'Contenido de la nota' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
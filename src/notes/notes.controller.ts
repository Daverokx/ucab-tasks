import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva nota' })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las notas (sin contenido)' })
  @ApiQuery({ name: 'sort', required: false, description: 'title, creationDate, modificationDate' })
  findAll(@Query('sort') sort?: string) {
    return this.notesService.findAll(sort);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una nota específica (con contenido)' })
  findOne(@Param('id') id: string) {
    // ⚠️ AQUÍ ESTABA EL ERROR: Quitamos el "+" antes de id
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una nota' })
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    // ⚠️ AQUÍ TAMBIÉN: Quitamos el "+"
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una nota' })
  remove(@Param('id') id: string) {
    // ⚠️ Y AQUÍ TAMBIÉN: Quitamos el "+"
    return this.notesService.remove(id);
  }
}
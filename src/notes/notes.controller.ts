import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  /**
   * Crea una nueva nota en el sistema.
   * @param createNoteDto Objeto con los datos de la nota.
   * @returns La nota creada con su ID y fechas.
   */
  @Post()
  @ApiOperation({ summary: 'Crear una nueva nota' })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  /**
   * Obtiene el listado de todas las notas.
   * Aplica la lógica para ocultar el contenido de la nota.
   * @param sort Criterio de ordenamiento: 'title', 'creationDate', 'modificationDate'.
   * @returns Lista de notas sin el campo 'content'.
   */
  @Get()
  @ApiOperation({ summary: 'Listar todas las notas (sin contenido)' })
  @ApiQuery({ name: 'sort', required: false, description: 'title, creationDate, modificationDate' })
  findAll(@Query('sort') sort?: string) {
    return this.notesService.findAll(sort);
  }

  /**
   * Busca una nota específica por su ID único.
   * @param id Identificador único de la nota.
   * @returns La nota completa incluyendo su contenido.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Obtener una nota específica (con contenido)' })
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  /**
   * Actualiza parcialmente una nota existente.
   * @param id Identificador de la nota a modificar.
   * @param updateNoteDto Datos a actualizar.
   * @returns La nota actualizada.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una nota' })
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  /**
   * Elimina una nota del sistema permanentemente.
   * @param id Identificador de la nota a borrar.
   * @returns Booleano indicando éxito o la nota eliminada.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una nota' })
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
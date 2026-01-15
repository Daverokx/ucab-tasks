import { Inject, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import type { NotesRepositoryInterface } from './interfaces/notes-repository.interface';

@Injectable()
export class NotesService {
  constructor(
    @Inject('NOTES_REPOSITORY')
    private readonly notesRepository: NotesRepositoryInterface,
  ) {}

  /**
   * Crea una nueva nota en el sistema de persistencia.
   * @param createNoteDto Datos necesarios para crear la nota.
   * @returns La nota creada con su ID y fechas.
   */
  create(createNoteDto: CreateNoteDto) {
    return this.notesRepository.create(createNoteDto);
  }

  /**
   * Obtiene el listado de todas las notas.
   * @param sort Criterio de ordenamiento opcional.
   * @returns Arreglo de notas.
   */
  findAll(sort?: string) {
    return this.notesRepository.findAll(sort);
  }

  /**
   * Busca una nota específica por su identificador único.
   * @param id Identificador UUID de la nota.
   * @returns La nota encontrada.
   */
  findOne(id: string) {
    return this.notesRepository.findById(id);
  }

  /**
   * Actualiza el título o contenido de una nota existente.
   * @param id Identificador de la nota a modificar.
   * @param updateNoteDto Datos a actualizar.
   * @returns La nota actualizada.
   */
  update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.notesRepository.update(id, updateNoteDto);
  }

  /**
   * Elimina una nota del sistema.
   * @param id Identificador de la nota a eliminar.
   * @returns True si fue eliminada, False si no existía.
   */
  remove(id: string) {
    return this.notesRepository.delete(id);
  }
}
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

  create(createNoteDto: CreateNoteDto) {
    return this.notesRepository.create(createNoteDto);
  }

  /**
   * Obtiene las notas aplicando las reglas de negocio:
   * 1. Ordenamiento (Título, Creación, Modificación).
   * 2. Proyección (Ocultar el contenido).
   */
  async findAll(sort?: string) {
    // 1. Traemos todas las notas del repositorio
    const notes = await this.notesRepository.findAll();

    // 2. Aplicamos lógica de ORDENAMIENTO si el usuario lo pidió
    if (sort) {
      if (sort === 'title') {
        notes.sort((a, b) => a.title.localeCompare(b.title));
      } else if (sort === 'creationDate') {
        notes.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      } else if (sort === 'modificationDate') {
        notes.sort((a, b) => new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime());
      }
    }

    // 3. Aplicamos lógica de NEGOCIO: Ocultar el campo 'content' en el listado
    return notes.map((note) => {
      // Usamos desestructuración para separar el contenido del resto
      const { content, ...noteWithoutContent } = note as any;
      return noteWithoutContent;
    });
  }

  findOne(id: string) {
    return this.notesRepository.findById(id);
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    return this.notesRepository.update(id, updateNoteDto);
  }

  remove(id: string) {
    return this.notesRepository.delete(id);
  }
}
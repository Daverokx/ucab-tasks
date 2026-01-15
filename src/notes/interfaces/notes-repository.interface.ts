import { Note } from '../entities/note.entity'; // Ojo: Importa de entities, no de schemas
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';

export interface NotesRepositoryInterface {
  findAll(sort?: string): Promise<Note[]>;
  findById(id: string): Promise<Note>;
  create(createNoteDto: CreateNoteDto): Promise<Note>;
  update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note>;
  delete(id: string): Promise<boolean>;
  deleteMany(ids: string[]): Promise<boolean>;
}
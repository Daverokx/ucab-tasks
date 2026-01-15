import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { NotesRepositoryInterface } from '../interfaces/notes-repository.interface'; // Asegúrate que la ruta sea correcta
import { Note } from '../entities/note.entity';
import { CreateNoteDto } from '../dto/create-note.dto';
import { UpdateNoteDto } from '../dto/update-note.dto';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileNotesRepository implements NotesRepositoryInterface {
  // Ruta del archivo donde se guardarán los datos (en la raíz del proyecto)
  private readonly filePath = path.resolve(__dirname, '../../../../data.json');

  // Método auxiliar para leer el archivo
  private async readDatabase(): Promise<Note[]> {
    try {
      // Verificamos si el archivo existe
      await fs.access(this.filePath);
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // Si no existe, retornamos arreglo vacío
      return [];
    }
  }

  // Método auxiliar para guardar en el archivo
  private async saveDatabase(notes: Note[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(notes, null, 2));
  }

  async findAll(sort?: string): Promise<Note[]> {
    const notes = await this.readDatabase();
    // Aquí podrías implementar el ordenamiento si el parámetro sort llega
    return notes;
  }

  async findById(id: string): Promise<Note> {
    const notes = await this.readDatabase();
    const note = notes.find((n) => n.id === id);
    if (!note) throw new NotFoundException(`Nota con ID ${id} no encontrada`);
    return note;
  }

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const notes = await this.readDatabase();
    const newNote: Note = {
      id: uuidv4(),
      ...createNoteDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    notes.push(newNote);
    await this.saveDatabase(notes);
    return newNote;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const notes = await this.readDatabase();
    const index = notes.findIndex((n) => n.id === id);
    
    if (index === -1) throw new NotFoundException(`Nota con ID ${id} no encontrada`);

    const updatedNote = {
      ...notes[index],
      ...updateNoteDto,
      updatedAt: new Date(), // Requisito: Actualizar fecha modificación [cite: 19]
    };

    notes[index] = updatedNote;
    await this.saveDatabase(notes);
    return updatedNote;
  }

  async delete(id: string): Promise<boolean> {
    let notes = await this.readDatabase();
    const initialLength = notes.length;
    notes = notes.filter((n) => n.id !== id);
    
    if (notes.length === initialLength) return false; // No se borró nada
    
    await this.saveDatabase(notes);
    return true;
  }

  async deleteMany(ids: string[]): Promise<boolean> {
     // Implementación opcional para borrar varios
     return true;
  }
}
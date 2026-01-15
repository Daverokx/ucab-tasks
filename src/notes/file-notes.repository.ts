import { Injectable, NotFoundException } from '@nestjs/common';
import { NotesRepositoryInterface } from './interfaces/notes-repository.interface';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import * as fs from 'fs/promises';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FileNotesRepository implements NotesRepositoryInterface {
  private readonly filePath = path.join(__dirname, '../../../data.json');

  private async readData(): Promise<any[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async writeData(data: any[]) {
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  async findAll(sort?: string): Promise<any[]> {
    return this.readData();
  }

  async findById(id: string): Promise<any> {
    const notes = await this.readData();
    const note = notes.find((n) => n.id === id);
    if (!note) throw new NotFoundException(`Nota con ID ${id} no encontrada`);
    return note;
  }

  async create(createNoteDto: CreateNoteDto): Promise<any> {
    const notes = await this.readData();
    const newNote = {
      id: uuidv4(),
      ...createNoteDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    notes.push(newNote);
    await this.writeData(notes);
    return newNote;
  }

  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<any> {
    const notes = await this.readData();
    const index = notes.findIndex((n) => n.id === id);
    if (index === -1) throw new NotFoundException(`Nota con ID ${id} no encontrada`);

    const updatedNote = {
      ...notes[index],
      ...updateNoteDto,
      updatedAt: new Date(),
    };
    notes[index] = updatedNote;
    await this.writeData(notes);
    return updatedNote;
  }

  async delete(id: string): Promise<boolean> {
    const notes = await this.readData();
    const filteredNotes = notes.filter((n) => n.id !== id);
    if (notes.length === filteredNotes.length) return false;
    await this.writeData(filteredNotes);
    return true;
  }

  // 👇 ESTE ES EL MÉTODO QUE FALTABA
  async deleteMany(ids: string[]): Promise<boolean> {
    const notes = await this.readData();
    const filteredNotes = notes.filter((n) => !ids.includes(n.id));
    
    // Si la longitud es la misma, no se borró nada
    if (notes.length === filteredNotes.length) return false;
    
    await this.writeData(filteredNotes);
    return true;
  }
}
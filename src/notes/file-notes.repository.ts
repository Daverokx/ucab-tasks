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

  /**
   * Lee el archivo JSON del sistema de archivos.
   * @returns Promesa con el array de datos o array vacío si falla.
   */
  private async readData(): Promise<any[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  /**
   * Escribe el array de datos en el archivo JSON.
   * @param data Array completo de notas a guardar.
   */
  private async writeData(data: any[]) {
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }

  /**
   * Obtiene todos los registros almacenados.
   * @param sort (No utilizado en repositorio, lógica delegada al servicio).
   * @returns Array de notas.
   */
  async findAll(sort?: string): Promise<any[]> {
    return this.readData();
  }

  /**
   * Busca un registro específico en el JSON.
   * @param id Identificador a buscar.
   * @returns La nota encontrada.
   * @throws NotFoundException si no existe.
   */
  async findById(id: string): Promise<any> {
    const notes = await this.readData();
    const note = notes.find((n) => n.id === id);
    if (!note) throw new NotFoundException(`Nota con ID ${id} no encontrada`);
    return note;
  }

  /**
   * Genera un ID único y guarda una nueva nota en el archivo.
   * @param createNoteDto Datos de la nota.
   * @returns Nota creada con metadatos.
   */
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

  /**
   * Actualiza una nota existente y guarda los cambios en disco.
   * @param id ID de la nota.
   * @param updateNoteDto Datos a cambiar.
   * @returns Nota actualizada.
   */
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

  /**
   * Elimina una nota del archivo y reescribe el JSON.
   * @param id ID de la nota a eliminar.
   * @returns True si se eliminó, False si no se borró nada.
   */
  async delete(id: string): Promise<boolean> {
    const notes = await this.readData();
    const filteredNotes = notes.filter((n) => n.id !== id);
    if (notes.length === filteredNotes.length) return false;
    await this.writeData(filteredNotes);
    return true;
  }

  /**
   * Elimina múltiples notas basadas en una lista de IDs.
   * @param ids Arreglo de IDs a eliminar.
   * @returns True si se eliminó al menos una.
   */
  async deleteMany(ids: string[]): Promise<boolean> {
    const notes = await this.readData();
    const filteredNotes = notes.filter((n) => !ids.includes(n.id));
    if (notes.length === filteredNotes.length) return false;
    await this.writeData(filteredNotes);
    return true;
  }
}
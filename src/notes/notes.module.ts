import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
// Importamos la implementación que acabamos de crear
import { FileNotesRepository } from './file-notes.repository';

@Module({
  controllers: [NotesController],
  providers: [
    NotesService,
    {
      // Cuando el Servicio pida 'NOTES_REPOSITORY'...
      provide: 'NOTES_REPOSITORY',
      // ... Nest le entregará una instancia de FileNotesRepository
      useClass: FileNotesRepository,
    },
  ],
})
export class NotesModule {}
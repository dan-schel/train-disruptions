import { InMemoryDatabase } from "../../../../../server/database/lib/in-memory/in-memory-database";
import {
  BASS_3,
  MUSICAL_INSTRUMENTS,
  PIANO_1,
  PIANO_4,
  SYNTH_2,
} from "../test-model";

export function getDatabase(): InMemoryDatabase {
  const db = new InMemoryDatabase();
  db.of(MUSICAL_INSTRUMENTS).create(PIANO_1);
  db.of(MUSICAL_INSTRUMENTS).create(SYNTH_2);
  db.of(MUSICAL_INSTRUMENTS).create(BASS_3);
  db.of(MUSICAL_INSTRUMENTS).create(PIANO_4);
  return db;
}

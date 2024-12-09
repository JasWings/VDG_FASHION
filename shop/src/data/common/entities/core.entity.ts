import { Type } from 'class-transformer';
import "reflect-metadata"

export class CoreEntity {
  id: number;
  @Type(() => Date)
  created_at: Date;
  @Type(() => Date)
  updated_at: Date;
}

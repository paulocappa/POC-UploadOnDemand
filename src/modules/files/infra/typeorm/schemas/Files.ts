import formatBytes from '@shared/utils/formatBytes';
import { Expose } from 'class-transformer';
import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('files')
export default class Files {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  user_id: string;

  @Column()
  filename: string;

  @Column()
  size: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'formatted_size' })
  get file_size(): string {
    return formatBytes(this.size);
  }

  @Expose({ name: 'file_url' })
  get fil_url(): string {
    return `${process.env.API_URL}/file/${this.filename}`;
  }
}

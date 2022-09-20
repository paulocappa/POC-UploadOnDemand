import formatBytes from '@shared/utils/formatBytes';
import { Expose } from 'class-transformer';
import {
  Entity,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ObjectID,
} from 'typeorm';

@Entity('files')
export default class Files {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  filename: string;

  @Column()
  thumbnail: string;

  @Column()
  type: string;

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

  @Expose({ name: 'thumb_url' })
  get thumbnail_url(): string | null {
    if (!this.thumbnail) return null;

    return `${process.env.API_URL}/thumb/${this.thumbnail}`;
  }
}

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  artist: string;

  @Column({ type: 'text', nullable: true })
  text: string | null;

  @Column()
  listens: number;

  @Column({ type: 'varchar', nullable: true })
  picture: string | null;

  @Column({ type: 'varchar', nullable: true })
  audio: string | null;
}
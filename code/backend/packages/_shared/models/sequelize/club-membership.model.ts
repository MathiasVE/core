import {
  Column,
  Index,
  ForeignKey,
  Model,
  Table,
  DataType,
  Unique,
  PrimaryKey,
  AutoIncrement,
  IsUUID,
  Default,
  NotNull,
  AllowNull
} from 'sequelize-typescript';
import { BuildOptions } from 'sequelize/types';
import { Club } from './club.model';
import { Player } from './player.model';

@Table({
  schema: 'public',
})
export class ClubMembership extends Model {
  constructor(values?: Partial<ClubMembership>, options?: BuildOptions) {
    super(values, options);
  }
  @ForeignKey(() => Player)
  @AllowNull(false)
  @Column
  playerId: string;

  @ForeignKey(() => Club)
  @AllowNull(false)
  @Column
  clubId: string;

  
  @Column
  end?: Date;

  @Default(true)
  @Column(DataType.BOOLEAN)
  active?: boolean;

  // Below is a hacky way to make the Unique across FK's + start
  // issue: (https://github.com/sequelize/sequelize/issues/12988)
  @Unique('ClubMemberships_clubId_playerId_unique')
  @AllowNull(false)
  @Column
  start: Date;

  @Default(DataType.UUIDV4)
  @IsUUID(4)
  @PrimaryKey
  @Column
  id: string;

}

import { DateTime } from "luxon";
import {
  BaseModel,
  column,
  hasMany,
  HasMany,
  belongsTo,
  BelongsTo
} from "@ioc:Adonis/Lucid/Orm";
import JobImage from "./JobImage";
import Quotation from "./Quotation";

export default class Job extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public title: string;

  @column()
  public posterId: number;

  @column()
  public clothesTypes: string;

  @column()
  public discription: string;

  @column()
  public budget: number;

  @column()
  public address: string;

  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasMany(() => JobImage)
  public jobImages: HasMany<typeof JobImage>;

  @hasMany(() => Quotation)
  public quotations: HasMany<typeof Quotation>;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}

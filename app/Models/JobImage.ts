import { DateTime } from "luxon";
import { BaseModel, column, BelongsTo, belongsTo } from "@ioc:Adonis/Lucid/Orm";
import Job from "./Job";

export default class JobImage extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public jobId: number;

  @column()
  public image: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Job)
  public user: BelongsTo<typeof Job>;
}

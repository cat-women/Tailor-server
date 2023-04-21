import { DateTime } from "luxon";
import { BaseModel, column, BelongsTo, belongsTo } from "@ioc:Adonis/Lucid/Orm";
import Job from "./Job";
import User from "./User";

export default class Quotation extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public jobId: number;

  @column()
  public requesterId: number;

  @column()
  public price: number;

  @column()
  public comments: string;

  @column()
  public status: boolean;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Job)
  public job: BelongsTo<typeof Job>;

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>;
}

import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";

import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  HasMany,
  hasMany,
  beforeSave,
  serializeAs
} from "@ioc:Adonis/Lucid/Orm";
import Role from "./Role";
import Job from "./Job";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public firstName: string;

  @column()
  public lastName: string;

  @column()
  public email: string;

  @column()
  public phone: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public address: string;

  @column()
  public forgotPassword: string;

  @column()
  public roleId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @belongsTo(() => Role)
  public role: BelongsTo<typeof Role>;

  @hasMany(() => Job)
  public jobs: HasMany<typeof Job>;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}

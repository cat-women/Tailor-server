import BaseSchema from "@ioc:Adonis/Lucid/Schema";
import Database from "@ioc:Adonis/Lucid/Database";
import Roles from "../../app/Enums/Roles.ts";

export default class extends BaseSchema {
  public async up() {
    await Database.table("roles").insert([
      { id: Roles.ADMIN, name: "ADMIN" },
      { id: Roles.MAKER, name: "MAKER" },
      { id: Roles.BUYER, name: "BUYER" }
    ]);
  }

  public async down() {}
}

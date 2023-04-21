import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("first_name", 20).notNullable();
      table.string("last_name", 20).notNullable();
      table.string("email").notNullable().unique();
      table.string("phone", 13).notNullable();
      table.string("password", 200).notNullable();
      table.string("address", 30).notNullable();
      table.boolean("forgot_password").default(false);
      table.integer("role_id").unsigned().references("id").inTable("roles");
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

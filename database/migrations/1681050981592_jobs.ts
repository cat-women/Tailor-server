import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "jobs";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("title").notNullable();
      table.integer("poster_id").unsigned().references("id").inTable("users");
      table.string("clothes_types").notNullable();
      table.string("discription").notNullable();
      table.integer("budget").unsigned().default(null);
      table.string("address").notNullable();
      table.boolean("status").default(1);

      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}

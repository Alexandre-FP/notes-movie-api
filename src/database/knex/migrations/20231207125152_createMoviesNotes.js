const up = knex => knex.schema.createTable("notesMovies", table => {
    table.increments("id");
    table.text("title");
    table.text("description");
    table.text("rating");
    table.integer("user_id").references("id").inTable("users")
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
});

const down = knex => knex.schema.dropTable("notesMovies");

export { up, down };

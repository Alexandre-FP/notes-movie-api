const up = knex => knex.schema.createTable("moviesTags", table => {
    table.increments("id");
    table.text("name");
    table.integer("user_id").references("id").inTable("users");
    table.integer("noteMovie_id").references("id").inTable("notesMovies").onDelete("CASCADE");
});

const down = knex => knex.schema.dropTable("moviesTags");

export { up, down };

import knex from "../database/knex/index.js";

class MoviesNotes {
    async create(req, res){
        const { body, params } = req;

        const [ userExists ] = await knex.select("*").from("users").where("id", Number(params.id));

        if(!userExists){
            return res.status(404).json({ menssage: "Usuário não encontrado" });
        }

        const [ noteMovie_id ] =  await knex("notesMovies").insert({
            title: body.title,
            description: body.description,
            rating: body.rating,
            user_id: Number(params.id),
        });

        const [ movies_tags ] = body.tags.map(name => {
            return {
                noteMovie_id,
                user_id: Number(params.id),
                name
            }
        });

        await knex("moviesTags").insert(movies_tags);

        return res.status(201).json({ menssage: "Criado com sucesso" });
    }

    async index(req, res){
        const result = await knex.select("*").from("notesMovies");

        return res.status(201).json({ content: result });
    }

    async delete(req, res){
        const { params } = req

        const [ noteExists ] = await knex.select("*").from("notesMovies").where("id", Number(params.id));

        if(!noteExists){
            return res.status(404).json({ menssage: "Notes não encontrado" });
        }

        await knex.delete().from("notesMovies").where("id", Number(params.id))

        return res.status(200).json({ menssage: "Notes deletado com sucesso" }); 
    } 
}

export default MoviesNotes; 
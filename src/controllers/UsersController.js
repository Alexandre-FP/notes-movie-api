import knex from "../database/knex/index.js";
import bcryptjs from "bcryptjs"

class UserController {

    async create(req, res){
        const { body } = req;
        
        const [ emailExists ] = await knex.select("*").from("users").where("email", body.email);

        console.log(emailExists)

        if(emailExists){
            return res.status(400).json({ menssage: "Email já em uso" });
        }

        const hashPassword = await bcryptjs.hash(body.password, 8);

        await knex("users").insert({
            ...body, 
            password: hashPassword
        });

        return res.status(201).json( { menssage: "Usuário cadastrado com sucesso" } ); 
    }

    async update(req, res){
        const { body, params } = req

        const [ usuarioExist ] = await knex.select("*").from("users").where("id", params.id);

        if(!usuarioExist){
            return res.status(400).json({ menssage: "Usuário não encontrado" })
        }

        const [ emailExists ] = await knex.select("*").from("users").where("email", body.email);

        if(emailExists && emailExists.id !== usuarioExist.id){
            return res.status(400).json({ menssage: "Email já em uso" });
        }

        if(body.password && !body.old_password){
            return res.status(400).json({ menssage: "Você precisa informar a senha antiga para definir a nova senha" });
        }

        if(body.password && body.old_password){
            const checkPassword = await bcryptjs.compare(body.old_password, usuarioExist.password);

            if(!checkPassword){
                return res.status(400).json({ menssage: "Senhas não concidem" }); 
            }
        }

        const hashPassword = await bcryptjs.hash(body.password, 8);

        delete body.old_password;

        await knex("users").where("id", params.id).update({
            ...body,
            password: hashPassword
        });

        return res.status(200).json({ menssage: "Usuário atualizado com sucesso" });
    }

    async index(req, res){
        const result = await knex.select("*").from("users")

        return res.status(200).json({ content: result });
    }

    async deleteUsers(req, res){
        const { params } = req

        const [ usuarioExist ] = await knex.select("*").from("users").where("id", params.id);

        if(!usuarioExist){
            return res.status(400).json({ menssage: "Usuário não encontrado" })
        }

        await knex.delete().from("users").where("id", params.id);

        return res.status(200).json({ menssage: "Usuário deletado om sucesso" });
    }
}

export default UserController;  
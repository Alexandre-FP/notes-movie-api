import express, { json }  from "express";
import AppError from "./utils/AppError.js";
import { routerUser, routerMovie } from "./routes/index.js";

const app = express();
const PORT = 3001;

app.use(json());

app.use("/api", routerUser);
app.use("/api", routerMovie);

app.use((error, req, res, next) => {
    if(error instanceof AppError){
        return res.status(error.statusCode).json({ 
            status: "error", 
            menssage: error.message
        });
    }

    return res.status(500).json({ 
        status: "error",
        menssage: "Error da Api"
    });
});

app.listen(PORT, () => {
    console.log(` Servidor rodando na porta ${PORT}🚀 `);
});





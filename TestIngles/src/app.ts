import "dotenv/config";
import express from "express";
import cors from "cors";
import { db } from "./config/database";
import { router } from "./routes";

const PORT = process.env.PORT || 3000;

const app = express()

app.use(express.json());
app.use(cors());
app.use(router);


db.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
  }
    )
    .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
    });





app.listen(PORT, () =>console.log(`Server is running on port ${PORT}`));

import "dotenv/config";
import express from "express";
import cors from "cors";
import { db } from "./config/database";
import { router } from "./routes";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000;

const app = express()

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5500", // Cambia esto a la URL de tu frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
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

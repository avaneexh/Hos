import express from "express";
import  dotenv  from "dotenv";
import cookieParser from "cookie-parser"
import cors from "cors"


import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import menuRoutes from "./routes/menu.routes.js";


dotenv.config();


const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true
  })
);

app.get("/", (req, res) =>{
    res.send("Hello From HOS🔥🔥")
})

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/menu", menuRoutes);

app.listen(process.env.PORT, ()=> {
    console.log("Server is running on port 8000")
})
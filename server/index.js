import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from 'morgan';
import helmet from "helmet";
import connectDB from "./config/connectDB.js";
import userRouter from "./route/user.route.js";
import categoryRouter from "./route/category.route.js";
import uploadRouter from "./route/upload.route.js";
import subCategoryRouter from "./route/subCategory.route.js";
import productRouter from "./route/product.route.js";
const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
app.use(cookieParser());
// app.use(morgan('combined')); //use 'combined' for morgan deprecated error
app.use(helmet({
    crossOriginResourcePolicy: false
}));
// serve static files means to save img in public folder
// app.use(express.static('public'));

const PORT =process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.send("Server is running fine");
})

app.use('/api/user',userRouter)
app.use('/api/category', categoryRouter);
app.use('/api/file', uploadRouter);
app.use('/api/subcategory', subCategoryRouter);
app.use('/api/product', productRouter);

// async methods returns promise 
connectDB().then(()=>{
    app.on("error", (error) => {
        console.log(error);
        process.exit(1);
    })
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})

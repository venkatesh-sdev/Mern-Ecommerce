// Third party Packages
import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import morgan from 'morgan';

// Built-In packages
import path from 'path';
import { fileURLToPath } from 'url';
import { randomUUID } from 'crypto';

// Utilites 
import DBConnection from './utils/DBConnection.js';
import errorMiddleware from './middlewares/error.middleware.js';

// Routers
import ProductRouter from './routes/products.route.js';


// --- Defaults --- //
dotenv.config();
const app = express();

// Overwriting a Default filename and dirname finder because of using module type exports and imports
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parsing the data
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));

// For Avoiding Cross-Orgin-Resource-Sharing Error
app.use(cors());

// Logger Middleware 
app.use(morgan('common'));

// A express Built-In Middleware used to set the path for directory
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

// --- File Storage --- //
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + Date.now() + ":" + randomUUID());
    }
});
export const upload = multer({ storage });

// --- Routes With Files --- //

// --- Router Routes --- //
app.use('/products', ProductRouter);


// Middlewares
app.use(errorMiddleware);

// MongoDB Database Connection Call

// The App Listing in the PORT of 3001
app.listen(
    process.env.PORT,
    () => {
        DBConnection();
        console.log("Server Running in http://localhost:" + process.env.PORT);
    }
)


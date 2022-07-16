import express from "express";
import multer from "multer";
import mongoose from "mongoose";

import { regVal, loginVal, postCreateVal } from "./validations.js";

import {handleValidationErrors, checkAuth} from './utils/index.js';

import {UserController, PostController} from './controllers/index.js';


mongoose.connect('mongodb+srv://admin:qwe@cluster0.xkogr.mongodb.net/blog?retryWrites=true&w=majority')
.then(()=> console.log('DB connected'))
.catch((err)=>console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.post('/auth/register', regVal, handleValidationErrors, UserController.register);
app.post('/auth/login', loginVal, handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', checkAuth, postCreateVal, handleValidationErrors, PostController.create);
app.delete('/posts/:id', checkAuth, PostController.remove);
app.patch('/posts/:id',  checkAuth, postCreateVal, handleValidationErrors, PostController.update);

app.listen(4444, (err)=>{
    if(err){
        return console.log(err);
    }

    console.log('server ok');
});
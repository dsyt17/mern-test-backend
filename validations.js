import { body } from "express-validator";

export const loginVal = [
    body('email', 'Некоректная почта').isEmail(),
    body('password', 'Переделай пароль').isLength({min: 5}),
];  

export const regVal = [
    body('email', 'Некоректная почта').isEmail(),
    body('password', 'Переделай пароль').isLength({min: 5}),
    body('fullName', 'Некорректное имя').isLength({min: 3}),
    body('avatarUrl', 'Ссылка на аватар').optional().isURL(),
];  

export const postCreateVal = [
    body('title', 'title').isLength({min: 3}).isString(),
    body('text', 'text').isLength({min: 3}).isString(),
    body('tags', 'tags').isLength({min: 3}).optional().isString(),
    body('imageUrl', 'imageUrl').optional().isString(),
];  
import { body } from "express-validator";

export const regVal = [
    body('email', 'Некоректная почта').isEmail(),
    body('password', 'Переделай пароль').isLength({min: 5}),
    body('fullName', 'Некорректное имя').isLength({min: 3}),
    body('avatarUrl', 'Ссылка на аватар').optional().isURL(),
];  
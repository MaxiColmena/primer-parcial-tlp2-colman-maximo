import { body, param } from "express-validator";
import { UserModel } from "../../models/mongoose/user.model.js";

export const getUserByIdValidations = [
  param("id")
  .isMongoId()
  .withMessage("El ID debe ser uno valido de mongo"),
];

export const createUserValidation = [
  body("username")
  .trim()
  .notEmpty()
  .withMessage("El name no debe estar vacio")
  .isLength({ min: 3, max: 20 })
  .withMessage("El name debe contener 3 caracteres como minimo y 20 como maximo")
  .matches(/^\S+$/)
  .withMessage("El nombre no debe contener espacios")
  .custom(async (username) => {
      const nameExists = await UserModel.findOne({ username: username });
      if (nameExists) throw new Error("El nombre ya existe");
    })
      .isAlphanumeric()
    .withMessage("El nombre de usuario solo puede contener letras y números"),
  body("email")
  .trim()
  .notEmpty()
  .withMessage("El email no debe estar vacio"),
  body("password")
  .trim()
  .notEmpty()
  .withMessage("La contraseña no debe estar vacia")
  .isLength({ min: 8})
  .withMessage("La contraseña debe contener 8 caracteres como minimo")
    .isAlphanumeric()
    .withMessage("La contraseña de usuario solo puede contener letras y números")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .withMessage(
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número"
    ),
  body("role")
  .trim()
  .notEmpty()
  .optional()
  .trim()
  .isIn(["secretary", "administrador"])
  .withMessage("El role debe ser 'secretary' o 'administrador'"),
  body("employee_number")
  .trim()
  .notEmpty()
    .custom(async (employee_number) => {
      const nameExists = await UserModel.findOne({ employee_number: employee_number });
      if (nameExists) throw new Error("El employee_number ya existe");
    })
    .matches(/[0-9]/)
    .withMessage("El employee_number debe tener al menos un número"),
  body("first_name")
  .trim()
  .notEmpty()
  .isLength({ min: 2, max: 50})
  .withMessage("El first_name debe contener 2 caracteres como minimo y 50 como máximo")
  .matches(/[A-Z]/)
  .withMessage("El first_name debe tener al menos una letra mayúscula")
  .matches(/[a-z]/)
  .withMessage("El first_name debe tener al menos una letra minúscula")
  .custom(async (first_name) => {
      const isLetters = await UserModel.findOne({ first_name: first_name });
      if (isLetters ==! String) throw new Error("El first_name debe ser una letra");
    }),
  body("last_name")
  .trim()
  .notEmpty()
  .isLength({ min: 2, max: 50})
  .withMessage("El last_name debe contener 2 caracteres como minimo y 50 como máximo")
  .matches(/[A-Z]/)
  .withMessage("El last_name debe tener al menos una letra mayúscula")
  .matches(/[a-z]/)
  .withMessage("El last_name debe tener al menos una letra minúscula")
  .custom(async (last_name) => {
      const isLetters = await UserModel.findOne({ last_name: last_name });
      if (isLetters ==! String) throw new Error("El last_name debe ser una letra");
    }),
  body("phone")
  .trim()
  .optional()
    .custom(async (phone) => {
      const isNumber = await UserModel.findOne({ phone: phone });
      if (isNumber ==! Number) throw new Error("El phone debe ser un número");
    }),
  // TODO: completar las validaciones para crear un usuario
];

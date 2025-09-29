import { body } from "express-validator";
import { CategoryModel } from "../../models/mongoose/category.model.js";

export const createCategoryValidation = [
  body("name")
  .trim()
  .notEmpty()
  .isLength({ min: 3, max: 100 })
    .withMessage("El name debe contener 3 caracteres como minimo y 100 como maximo"),
  body("description")
  .trim()
  .optional()
  .isLength({ max: 500 })
    .withMessage("El name debe contener 500 caracteres como maximo")
  // TODO: completar las validaciones para crear una categoria
];

// ● name: 3-100 caracteres, único, obligatorio
// ● description: máximo 500 caracteres (opcional)
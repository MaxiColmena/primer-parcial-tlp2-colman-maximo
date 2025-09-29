import { AssetModel } from "../../models/mongoose/asset.model.js";

export const createAssetValidation = [
    body("inventory_number:")
    .trim()
    .notEmpty()
    .withMessage("El inventory_number no debe estar vacio")
    .isLength({ min: 3, max: 20 })
    .withMessage("El name debe contener 3 caracteres como minimo y 20 como maximo")
    .matches(/^\S+$/)
    .withMessage("El nombre no debe contener espacios")
    .custom(async (AssetModel) => {
        const nameExists = await AssetModel.findOne({ inventory_number: inventory_number });
        if (nameExists) throw new Error("El inventory_number ya existe");
      })
        .isAlphanumeric()
      .withMessage("El nombre de usuario solo puede contener letras y números"),

    body("description")
    .trim()
    .notEmpty()
    .withMessage("La description no debe estar vacio")
    .isLength({ min: 10, max: 500})
    .withMessage("La descripcion debe contener 10 caracteres como minimo y 500 como máximo"),

    body("brand")
    .trim()
    .notEmpty()
    .withMessage("La brand no debe estar vacia")
    .isLength({ min: 2, max: 100})
    .withMessage("La brand debe contener 2 caracteres como minimo y 100 como máximo"),
    ,
    body("model")
    .trim()
    .notEmpty()
    .withMessage("La model no debe estar vacia")
    .isLength({ min: 2, max: 100})
    .withMessage("La model debe contener 2 caracteres como minimo y 100 como máximo"),
    ,
    body("status")
    .trim()
    .notEmpty()
    .isIn(['good', 'regular', 'bad', 'out_of_service'])
    .withMessage("El role debe ser 'good', 'regular', 'bad', 'out_of_service'"),

    body("acquisition_date")
    .trim()
    .notEmpty()
      .custom(async (employee_number) => {
        const nameExists = await UserModel.findOne({ employee_number: employee_number });
        if (nameExists) throw new Error("El employee_number ya existe");
      })
      .matches(/[0-9]/)
      .withMessage("El employee_number debe tener al menos un número"),

    body("acquisition_value")
    .trim()
    .notEmpty()
    .custom(async (acquisition_value) => {
        const isLNumberPossitive = await AssetModel.findOne({ acquisition_value: acquisition_value });
        if (isLNumberPossitive < 0 || isLNumberPossitive === "" ) throw new Error("El acquisition_value debe ser un numero positivo");
      })
      ,

    body("responsible_id")
    .trim()
    .notEmpty()
    ,

    body("categories")
    .trim()
  // TODO: completar las validaciones para crear un recurso
];


// ● inventory_number: formato específico, único, obligatorio
// ● description: 10-500 caracteres, obligatorio
// ● brand y model: 2-100 caracteres, obligatorio
// ● status: valores permitidos ('good', 'regular', 'bad', 'out_of_service')
// ● acquisition_date: fecha válida, no futura, obligatorio
// ● acquisition_value: número positivo, obligatorio
// ● responsible_id: debe existir y ser funcionario activo
// ● categories: array de IDs válidos de categorías existentes
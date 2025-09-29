import { DataTypes } from "sequelize";
import { AssetModel } from "./asset.model.js";
import { CategoryModel } from "../mongoose/category.model.js";

export const AssetCategoryModel = sequelize.define("AssetCategory", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

//Relación muchos a muchos

AssetModel.belongsToMany(CategoryModel, {
  through: ArticleTag,
  foreignKey: "asset_id",
  as: "asset",
  onDelete: "CASCADE"
});

CategoryModel.belongsToMany(AssetModel, {
  through: ArticleTag,
  foreignKey: "category_id",
  as: "category",
  onDelete: "CASCADE  ",
});

CategoryModel.belongsTo(asset, {
  foreignKey: "asset_id",
  as: "asset",
  onDelete: "CASCADE",
});

CategoryModel.belongsTo(articles, {
  foreignKey: "category_id",
  as: "category",
  onDelete: "CASCADE"
});

// TODO: completar relaciones muchos a muchos entre Asset y Category mediante AssetCategory.
// * N:M Asset ↔ Category through AssetCategory
// * 'categories' (Asset) y 'assets' (Category)
// ! FALTA COMPLETAR ACA

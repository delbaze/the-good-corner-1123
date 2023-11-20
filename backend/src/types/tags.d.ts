import type Tag from "../entities/Tag.entity"; //on peut importer uniquement le type à partir d'une classe et non le type ET les valeurs

export type TagCreateInput = Omit<Category, "id">;

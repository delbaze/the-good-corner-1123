import type Category from "../entities/Category.entity"; //on peut importer uniquement le type à partir d'une classe et non le type ET les valeurs

export type CategoryCreateInput = Omit<Category, "id" | "ads">;// je fais le choix de ne pas permettre l'assignation d'annonce à l'ajout d'une catégorie

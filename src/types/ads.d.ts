import type Ad from "../entities/Ad.entity"; //on peut importer uniquement le type à partir d'une classe et non le type ET les valeurs

export type AdCreateInput = Omit<Ad, "id">;

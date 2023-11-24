import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Category } from "@/types/category";

const schema = yup.object({
  title: yup.string().required("Attention, le titre de l'annonce est requis"),
  price: yup.number().positive().required("Le prix est requis"),
  description: yup.string().required("La description est requise"),
  location: yup.string().required("La localité est requise"),
  owner: yup.string().required("Votre nom est requis"),
  picture: yup.string().url().required("Votre nom est requis"),
  category: yup.object({
    id: yup.number().required("La catégorie est requise"),
  }),
});

function CreateAd() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    // axiosInstance.post("/categories/create", data).then(() => {
    //     //rediriger vers la liste des catégories
    //     router.push("/categories/list")
    // }).catch((e) => {
    //   //prochaine étape, gérer les erreurs venant du back pour les afficher à l'emplacement dédié
    //   setError("name", {message: "Une erreur s'est produite"})

    // });
  };
  useEffect(() => {
    axiosInstance.get<Category[]>("/categories/list").then((response) => {
      console.log(response.data);
      setCategories(response.data);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      {loading ? (
        <div>Chargement en cours </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input {...register("title")} placeholder="Titre" />
          <p>{errors?.title?.message}</p>

          <input {...register("price")} placeholder="Prix" />
          <p>{errors?.price?.message}</p>

          <input {...register("description")} placeholder="Description" />
          <p>{errors?.description?.message}</p>

          <input {...register("location")} placeholder="Localité" />
          <p>{errors?.location?.message}</p>

          <input {...register("owner")} placeholder="Propriétaire" />
          <p>{errors?.owner?.message}</p>

          <input {...register("picture")} placeholder="Photo" />
          <p>{errors?.picture?.message}</p>

          <select {...register("category.id")}>
            <option>Choisissez votre catégorie</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
            {/**boucle sur les categories pour créer une option pour chacune d'entre elles */}
          </select>

          <input type="submit" />
        </form>
      )}
    </div>
  );
}

export default CreateAd;

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import { useCreateAdMutation, useListCategoriesQuery } from "@/types/graphql";

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

type FormType = {
  category: { id: number };
  description: string;
  location: string;
  owner: string;
  picture: string;
  price: number;
  title: string;
};

function CreateAd() {
  const router = useRouter();
  const [createAd, { loading: loadingAd }] = useCreateAdMutation();
  // const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { data, loading } = useListCategoriesQuery();

  const onSubmit = (data: FormType) => {
    createAd({
      variables: { infos: data },
      onCompleted(data) {
        router.push(`/categories/view/${data.createAd.category.id}`);
      },
    });
    //!penser à gérer les erreurs (setError);
  };

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
            {data?.listCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
            {/**boucle sur les categories pour créer une option pour chacune d'entre elles */}
          </select>

          <input type="submit" disabled={loadingAd} />
        </form>
      )}
    </div>
  );
}

export default CreateAd;

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import {  useCreateCategoryMutation } from "@/types/graphql";

const schema = yup.object({
  name: yup.string().required("Attention, le nom de la catégorie est requis"), //name doit être de type string et est requis
});

function CreateCategory() {
  const router = useRouter();
  // const [createCategory, {data, loading}] = useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CREATE_CATEGORY)
  const [createCategory, { loading }] = useCreateCategoryMutation()
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: {name: string}) => {
    console.log(data);
    createCategory({variables: {infos: {name: data.name}}, onCompleted(data) {
        console.log('%c⧭', 'color: #00a3cc', data);
        router.push("/categories/list")
    },})
    // axiosInstance.post("/categories/create", data).then(() => {
    //     //rediriger vers la liste des catégories
    //     router.push("/categories/list")
    // }).catch((e) => {
    //   //prochaine étape, gérer les erreurs venant du back pour les afficher à l'emplacement dédié
    //   setError("name", {message: "Une erreur s'est produite"})

    // });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("name")} />
        <p>{errors?.name?.message}</p>
        <input type="submit" disabled={loading} />
      </form>
    </div>
  );
}
export default CreateCategory;

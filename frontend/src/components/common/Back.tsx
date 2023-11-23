import { useRouter } from "next/router";

function Back() {
  const router = useRouter();
  return <div onClick={() => router.back()}>Revenir à la précédente</div>;
}

export default Back

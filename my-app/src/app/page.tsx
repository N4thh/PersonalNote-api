import { redirect } from "next/navigation";
import { getUser } from "@/lib/getUser";

export default function Home() {
  const user = getUser();

  if (!user) {
    redirect("/login");
  }
    redirect("/dashboard");
}
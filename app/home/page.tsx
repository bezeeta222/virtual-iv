"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Homes = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(
            `/api/listUser?email=${encodeURIComponent(session.user.email)}`
          );
          const data = await response.json();

          if (data.hasUser) {
            router.push("/user");
          } else {
            console.log("home");
            router.push("/form");
          }
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      } else {
        console.log("no session");
      }
    };

    checkUser();
  }, [session, router]);

  return (
    <section className="w-full flex-center flex-col mt-20">
      <p className="text-center m-10">Please sign in to access your account.</p>
    </section>
  );
};

export default Homes;

"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation"; // Import the useRouter hook
import { useEffect } from "react"; // Import the useEffect hook

const Homes = () => {
  const { data: session } = useSession(); // Get the user session

  useEffect(() => {
    // Check if there's no session user and route accordingly
    if (!session?.user) {
      redirect("/user/page"); // Redirect to the user page for non-signed-in users
    }
  }, [session]);

  return (
    <section className="w-full flex-center flex-col mt-20">
     
      <p className="text-center m-10">Please sign in to access your account.</p>
    </section>
  );
};

export default Homes;

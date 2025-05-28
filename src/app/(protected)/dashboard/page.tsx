import React from "react";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import SignOutButton from "./_components/sign-out-button";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { usersToClinicsTable } from "@/db/schema";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  return (
    <div>
      <h1>{session?.user.name}</h1>
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;

"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import React from "react";
import UpsertDoctorForm from "./upsert-doctor-form";

const CreateDoctorButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon />
          Novo médico
        </Button>
      </DialogTrigger>
      <UpsertDoctorForm />
    </Dialog>
  );
};

export default CreateDoctorButton;

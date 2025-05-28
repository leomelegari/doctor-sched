"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { createClinic } from "@/actions/create-clinic";
import { toast } from "sonner";
import { Loader2Icon } from "lucide-react";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { useRouter } from "next/navigation";

const clinicSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "O nome da clínica precisa ter pelo menos 3 caractere"),
});

const ClinicForm = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof clinicSchema>>({
    resolver: zodResolver(clinicSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof clinicSchema>) => {
    try {
      await createClinic(data.name);
      toast.success("Clínica adicionada com sucesso");
      form.reset();
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao adicionar a clínica");
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome da clínica</FormLabel>
                <FormControl>
                  <Input placeholder="Clínica de Saude" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting && (
                <Loader2Icon className="animate-spin" />
              )}
              Criar clínica
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  );
};

export default ClinicForm;

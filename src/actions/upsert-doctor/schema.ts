import { z } from "zod";

export const upsertDoctorSchema = z
  .object({
    id: z.string().uuid().optional(),
    name: z
      .string({ message: "O nome é obrigatório" })
      .trim()
      .min(3, "O nome precisa ter pelo menos 3 caracteres"),
    specialty: z
      .string({ message: "A especialidade é obrigatória" })
      .trim()
      .min(3, "A especialidade precisa ter pelo menos 3 caracteres"),
    appointmentPriceInCents: z
      .number()
      .min(1, "O valor da consulta precisa ser maior que zero"),
    availableFromWeekDay: z
      .number({
        message: "O dia da semana de inicio é obrigatório",
      })
      .min(0)
      .max(6),
    availableToWeekDay: z
      .number({
        message: "O dia da semana de fim é obrigatório",
      })
      .min(0)
      .max(6),
    availableFromTime: z.string({
      message: "O horário de inicio é obrigatório",
    }),
    availableToTime: z.string({ message: "O horário de fim é obrigatório" }),
  })
  .refine(
    (data) => {
      if (data.availableFromTime < data.availableToTime) {
        return true;
      }
    },
    {
      message: "O horário final não pode ser menor que o horário inicial",
      path: ["availableToTime"],
    },
  );

export type UpsertDoctorSchema = z.infer<typeof upsertDoctorSchema>;

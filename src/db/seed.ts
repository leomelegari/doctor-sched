import { uuid } from "drizzle-orm/pg-core";
import { db } from ".";
import {
  clinicsTable,
  doctorsTable,
  patientsTable,
  appointmentsTable,
  usersTable,
  usersToClinicsTable,
} from "./schema";
import { randomUUID } from "crypto";

// Função para gerar nomes aleatórios
function generateRandomName(type: "doctor" | "patient"): string {
  const firstNames = [
    "Alex",
    "Jordan",
    "Taylor",
    "Morgan",
    "Casey",
    "Riley",
    "Jamie",
    "Cameron",
    "Drew",
    "Quinn",
  ];
  const lastNames = [
    "Smith",
    "Johnson",
    "Brown",
    "Williams",
    "Jones",
    "Garcia",
    "Miller",
    "Davis",
    "Martinez",
    "Hernandez",
  ];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return type === "doctor"
    ? `Dr. ${firstName} ${lastName}`
    : `${firstName} ${lastName}`;
}

async function seed() {
  // Criar uma clínica
  const clinicId = randomUUID();
  await db.insert(clinicsTable).values({
    id: clinicId,
    name: "Health Clinic",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Criar 10 médicos com nomes aleatórios
  const doctors = Array.from({ length: 10 }).map(() => ({
    id: randomUUID(),
    clinicId,
    name: generateRandomName("doctor"),
    avatarImageUrl: `https://example.com/avatar${Math.floor(Math.random() * 100)}.png`,
    specialty: Math.random() > 0.5 ? "Cardiology" : "Dermatology",
    availableFromWeekDay: 1,
    availableToWeekDay: 5,
    availableFromTime: "08:00:00",
    availableToTime: "17:00:00",
    appointmentPriceInCents: 5000,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  await db.insert(doctorsTable).values(doctors);

  // Criar 10 pacientes com nomes aleatórios
  const patients = Array.from({ length: 3 }).map(() => ({
    id: randomUUID(),
    clinicId,
    name: generateRandomName("patient"),
    email: `patients${Math.floor(Math.random() * 1000)}@example.com`,
    phoneNumber: `+1234567880${Math.floor(Math.random() * 1000)}`,
    gender: "female",
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  await db.insert(patientsTable).values(patients);

  const appointments = Array.from({ length: 50 }).map((_, i) => ({
    id: randomUUID(),
    date: new Date(new Date().setDate(new Date().getDate() + i * 2)), // Agendamentos a cada 2 dias
    appointmentPriceInCents: 30000 + Math.floor(Math.random() * 50000), // Valores entre 3000 e 8000 centavos
    patientId: patients[i % patients.length].id,
    doctorId: doctors[i % doctors.length].id,
    clinicId,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  await db.insert(appointmentsTable).values(appointments);

  //   // Criar 1 usuário e associá-lo à clínica
  //   const user = {
  //     id: randomUUID(),
  //     name: "Admin User",
  //     email: "admin@example.com",
  //     emailVerified: true,
  //     image: "https://example.com/admin.png",
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   };
  //   await db.insert(usersTable).values(user);

  //   const userToClinic = {
  //     userId: user.id,
  //     clinicId,
  //     createdAt: new Date(),
  //     updatedAt: new Date(),
  //   };
  //   await db.insert(usersToClinicsTable).values(userToClinic);

  //   console.log("Seed data inserted successfully!");
}

seed().catch((error) => {
  console.error("Error seeding data:", error);
});

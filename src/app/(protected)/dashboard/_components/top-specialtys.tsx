import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  ClipboardList,
  Heart,
  Baby,
  Hand,
  Bone,
  Stethoscope,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface TopSpecialty {
  specialty: string;
  appointments: number;
}

interface TopSpecialtiesProps {
  topSpecialtys: TopSpecialty[];
}

export default function TopSpecialties({ topSpecialtys }: TopSpecialtiesProps) {
  // Function to get the appropriate icon for each specialty
  const getSpecialtyIcon = (specialty: string) => {
    console.log("specialty ", specialty);
    const iconClass = "w-5 h-5 text-blue-500";

    switch (specialty.toLowerCase()) {
      case "cardiologia":
        return <Heart className={iconClass} />;
      case "ginecologia":
        return <Stethoscope className={iconClass} />;
      case "pediatria":
        return <Baby className={iconClass} />;
      case "dermatologia":
        return <Hand className={iconClass} />;
      case "ortopedia":
        return <Bone className={iconClass} />;
      default:
        return <ClipboardList className={iconClass} />;
    }
  };

  // Function to calculate progress bar width based on appointments
  const calculateProgressWidth = (appointments: number) => {
    const maxAppointments = Math.max(
      ...topSpecialtys.map((s) => s.appointments),
    );
    return (appointments / maxAppointments) * 100;
  };

  return (
    <Card className="mx-auto w-full">
      <CardContent>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex w-full items-center justify-center gap-4">
              <ClipboardList className="text-muted-foreground" />
              <CardTitle className="text-base">Especialidades</CardTitle>
            </div>
          </div>
        </div>

        {/* Specialties List */}
        <div className="space-y-5">
          {topSpecialtys.map((specialty, index) => (
            <div key={index} className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
                    {getSpecialtyIcon(specialty.specialty)}
                  </div>
                  <span className="font-medium text-gray-900">
                    {specialty.specialty}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {specialty.appointments} agend.
                </span>
              </div>

              {/* Progress bar */}
              <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                <Progress
                  value={calculateProgressWidth(specialty.appointments)}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

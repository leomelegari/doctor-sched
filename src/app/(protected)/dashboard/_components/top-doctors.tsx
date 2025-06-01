import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";

interface TopDoctorsProps {
  topDoctors: {
    id: string;
    name: string;
    avatarImageUrl: string | null;
    specialty: string;
    appointments: number;
  }[];
}

export default function TopDoctors({ topDoctors }: TopDoctorsProps) {
  return (
    <Card className="mx-auto w-full">
      <CardContent>
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex w-full items-center justify-center gap-4">
              <Stethoscope className="text-muted-foreground" />
              <CardTitle className="text-base">Médicos</CardTitle>
            </div>
          </div>
        </div>

        {/* Doctors List */}
        <div className="space-y-4">
          {topDoctors.map((doctor) => (
            <div key={doctor.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-gray-100 text-gray-600">
                    {doctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-sm">{doctor.name}</h3>
                  <p className="text-muted-foreground text-sm">
                    {doctor.specialty}
                  </p>
                </div>
              </div>
              <div className="text-muted-foreground text-sm font-medium">
                {doctor.appointments} agend.
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

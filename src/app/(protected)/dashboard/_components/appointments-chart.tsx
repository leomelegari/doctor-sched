"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import dayjs from "dayjs";
import { formatCurrencyInCents } from "@/helpers/currency";
import { DollarSignIcon } from "lucide-react";

export const description = "An area chart with gradient fill";

interface RevenueChartProps {
  dailyAppointmentsData: {
    date: string;
    appointments: number;
    revenue: number;
  }[];
}

export function AppointmentsChart({
  dailyAppointmentsData,
}: RevenueChartProps) {
  const chartDays = Array.from({ length: 21 }).map((_, index) =>
    dayjs()
      .subtract(10 - index, "days")
      .format("YYYY-MM-DD"),
  );

  const chartData = chartDays.map((date) => {
    const dailyAppointments = dailyAppointmentsData.find(
      (d) => d.date === date,
    );
    return {
      date: dayjs(date).format("DD/MM"),
      fullDate: date,
      appointments: dailyAppointments?.appointments || 0,
      revenue: dailyAppointments?.revenue || 0,
    };
  });

  const chartConfig = {
    appointments: {
      label: "Agendamentos",
      color: "#0b68f7",
    },
    revenue: {
      label: "Faturamento",
      color: "#10b981",
    },
  } satisfies ChartConfig;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2">
        <DollarSignIcon />
        <CardTitle>Agendamentos e Faturamentos</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px]">
          <AreaChart
            data={chartData}
            margin={{
              top: 20,
              left: 20,
              right: 30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => formatCurrencyInCents(value)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value, name) => {
                    if (name === "revenue") {
                      return (
                        <>
                          <div className="size-3 rounded bg-[#10b981]">
                            <span className="text-muted-foreground">
                              Faturamento:
                            </span>
                            <span className="font-semibold">
                              {formatCurrencyInCents(Number(value))}
                            </span>
                          </div>
                        </>
                      );
                    }
                    return (
                      <>
                        <div className="size-3 rounded bg-[#0b68f7]">
                          <span className="text-muted-foreground">
                            Agendamentos:
                          </span>
                          <span className="font-semibold">{value}</span>
                        </div>
                      </>
                    );
                  }}
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return dayjs(payload[0].payload.fullDate).format(
                        "DD/MM/YYYY (dddd)",
                      );
                    }
                    return label;
                  }}
                />
              }
            />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="appointments"
              stroke="var(--color-appointments)"
              fill="var(--color-appointments)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-revenue)"
              fill="var(--color-revenue)"
              fillOpacity={0.2}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

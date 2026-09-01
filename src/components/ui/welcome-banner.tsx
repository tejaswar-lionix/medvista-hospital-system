import { Card, CardContent } from "@/components/ui/card";

interface WelcomeBannerProps {
  userName: string;
  date?: Date;
}

function getGreeting(hour: number): string {
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function WelcomeBanner({ userName, date }: WelcomeBannerProps) {
  const now = date ?? new Date();
  const greeting = getGreeting(now.getHours());
  const formattedDate = formatDate(now);

  return (
    <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-none text-white">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {greeting}, {userName}!
            </h2>
            <p className="mt-1 text-blue-100">{formattedDate}</p>
          </div>
          <div className="hidden sm:block">
            <div className="text-right">
              <p className="text-sm text-blue-100">Today&apos;s summary</p>
              <p className="text-3xl font-bold">
                {now.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SummaryCard({ title, value }: { title: string; value: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

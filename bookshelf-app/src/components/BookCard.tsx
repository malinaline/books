import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { coverUrl } from "@/lib/cover";

type Props = {
  id: string;
  title: string;
  authors: string[];
  year?: number;
  coverId?: number;
};

export default function BookCard({ id, title, authors, year, coverId }: Props) {
  return (
    <Link href={`/book/${id}`} aria-label={title}>
      <Card className="hover:shadow-lg transition">
        <CardHeader>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverUrl(coverId, "M")}
            alt=""
            className="w-full aspect-[3/4] object-cover rounded-md"
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="text-base">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">
            {authors?.join(", ") || "Okänd författare"}
          </p>
          <p className="text-xs text-muted-foreground">{year ?? "—"}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

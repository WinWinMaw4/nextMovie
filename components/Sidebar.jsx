import { Button } from "@/components/ui/button";
import Link from "next/link";

const token = process.env.TMDB_TOKEN;

async function fetchGenres() {
  const res = await fetch("https://api.themoviedb.org/3/genre/movie/list", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch genres");
  }

  return res.json();
}

const Sidebar = async () => {
  let genres = [];

  try {
    const data = await fetchGenres();
    genres = data.genres || [];
  } catch (error) {
    console.error("Error fetching genres:", error);
  }

  return (
    <aside className="w-[220px] flex flex-col gap-1">
      <Button className="justify-start" variant="outline" asChild>
        <Link href="/">All</Link>
      </Button>
      {genres.map((genre) => (
        <Button
          key={genre.id}
          className="justify-start"
          variant="outline"
          asChild
        >
          <Link href={`/genres/${genre.name}/${genre.id}`}>{genre.name}</Link>
        </Button>
      ))}
    </aside>
  );
};

export default Sidebar;

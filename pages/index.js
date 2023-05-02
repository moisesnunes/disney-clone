import Header from "@/components/Header";
import { useSession, getSession } from "next-auth/react";
import Hero from "@/components/Hero";
import Slider from "@/components/Slider";
import Brand from "@/components/Brand";
import Movies from "@/components/Movies";
import Shows from "@/components/Shows";

export default function Home({
  popularMovies,
  topRatedMovies,
  popularShows,
  topRatedShows,
}) {
  const { data: session } = useSession();
  return (
    <div className="">
      <Header />
      {!session ? (
        <Hero />
      ) : (
        <main
          className="relative min-h-screen after:bg-home after:bg-center after:bg-cover after:bg-no-repeat 
        after:bg-fixed after:absolute after:inset-0 after:z-[-1]"
        >
          <Slider />
          <Brand />
          <Movies results={popularMovies} title="Filmes Populares" />
          <Shows results={popularShows} title="Programs Populares" />
          <Movies results={topRatedMovies} title="Filmes mais bem avaliados" />
          <Shows results={topRatedShows} title="Programas mais bem avaliados" />
        </main>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const [
    popularMoviesRes,
    topRatedMoviesRes,
    popularShowsRes,
    topRatedShowsRes,
  ] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=pt-BR&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3//movie/top_rated?api_key=${process.env.API_KEY}&language=pt-BR&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.API_KEY}&language=pt-BR&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.API_KEY}&language=pt-BR&page=1`
    ),
  ]);
  const [popularMovies, topRatedMovies, popularShows, topRatedShows] =
    await Promise.all([
      popularMoviesRes.json(),
      topRatedMoviesRes.json(),
      popularShowsRes.json(),
      topRatedShowsRes.json(),
    ]);
  return {
    props: {
      session,
      popularMovies: popularMovies.results,
      topRatedMovies: topRatedMovies.results,
      popularShows: popularShows.results,
      topRatedShows: topRatedShows.results,
    },
  };
}

import Image from "next/image";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import ReactPlayer from "react-player";

export default function Movie({ result }) {
  const { data: session } = useSession();
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const [showPlayer, setShowPlayer] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  });

  const index = result.videos.results.findIndex(
    (element) => element.type === "Trailer"
  );

  return (
    <div>
      <Head>
        <title> {result.title || result.original_name} </title>
      </Head>
      <Header />
      {!session ? (
        <Hero />
      ) : (
        <section className="relative z-50">
          <div className="relative min-h-[calc(100vh-72px)]">
            <Image
              src={
                `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
                `${BASE_URL}${result.poster_path}`
              }
              fill
              objectFit="cover"
            />
          </div>
          <div className="absolute inset-y-28 md:inset-y-auto md:bottom-10 inset-x-4 md:inset-x-12 space-y-6 z-50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase">
              {" "}
              {result.title || result.original_name}
            </h1>
            <div className="flex items-center space-x-3 md:space-x-5">
              <button
                className="text-xs md:text-base bg-[#f9f9f9] text-black items-center flex justify-center py-2.5
            px-6 rounded hover:bg-[#c6c6c6]"
              >
                <img src="/images/play-icon-black.svg" className="h-6 md:h-8" />
                <span className="uppercase font-medium tracking-wide">
                  Play
                </span>
              </button>

              <button
                className="text-xs md:text-base bg-black/30 text-[#f9f9f9] border border-[#f9f9f9] 
                items-center flex justify-center py-2.5 px-6 rounded hover:bg-[#2d2727]"
                onClick={() => setShowPlayer(true)}
              >
                <img src="/images/play-icon-white.svg" className="h-6 md:h-8" />
                <span className="uppercase font-medium tracking-wide">
                  Trailer
                </span>
              </button>

              <div
                className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer
              bg-black/60 hover:bg-[#2d2727]"
              >
              </div>
              <div
                className="rounded-full border-2 border-white flex items-center justify-center w-11 h-11 cursor-pointer
              bg-black/60 hover:bg-[#2d2727]"
              >
                <img src="/images/group-icon.svg" alt="" />
              </div>
            </div>
            <p className="text-xs md:text-sm">
              Date: {result.release_date || result.first_air_date} / Time:{" "}
              {Math.floor(result.runtime / 60)}h {result.runtime % 60}m / Genre:{" "}
              {result.genres.map((genre) => genre.name + " ")} / Vote:{" "}
              {result.vote_average}
            </p>
            <h4 className="uppercase font-semibold text-sm md:text-lg max-w-4xl">
              {" "}
              {result.overview}{" "}
            </h4>
          </div>
          {showPlayer && (
            <div className="absolute inset-0 bg-black opacity-50 h-full w-full z-50" />
          )}
          <div
            className={`absolute top-3 inset-x-[7%] md:inset-x-[13%] rounded overflow-hidden transition duration-1000
      ${showPlayer ? "opacity-100 z-50" : "opacity-0"}`}
          >
            <div className="flex items-center justify-between bg-black text-[#f9f9f9] p-3.5">
              <span className="font-semibold uppercase">Play Trailer</span>
              <div
                className="cursor-pointer items-center rounded-lg opacity-50 justify-center hover:opacity-75 hover:bg-[#0f0f0f]
              "
                onClick={() => setShowPlayer(false)}
              >
              </div>
            </div>
            <div className="relative pt-[56.25%]">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${result.videos?.results[index]?.key}`}
                width="100%"
                height="100%"
                style={{ position: "absolute", top: "0", left: "0" }}
                controls={true}
                playing={showPlayer}
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { id } = context.query;

  const request = await fetch(`
https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US&append_to_response=videos`).then(
    (response) => response.json()
  );

  return {
    props: {
      session,
      result: request,
    },
  };
}

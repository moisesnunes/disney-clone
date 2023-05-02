import Image from "next/image";
import Link from "next/link";
import { signIn, useSession, signOut, getSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  return (
    <header className="sticky bg-[#040714] top-0 z-[1000] flex items-center px-10  h-[72px] md:px-12">
      <Link href="/">
        {" "}
        <Image
          src="/images/logo.svg"
          width={80}
          height={80}
          onClick={() => {
            router.push("/");
          }}
        />{" "}
      </Link>
      {session && (
        <div className="hidden ml-10 md:flex items-center space-x-6">
          <a className="header-link group-[]:">
            <span className="span">Home</span>
          </a>
          <a className="header-link group-[]:">
            <span className="span">Search</span>
          </a>
          <a className="header-link group-[]:">
            <span className="span">Watchlist</span>
          </a>
          <a className="header-link group-[]:">
            <span className="span">Originals</span>
          </a>
          <a className="header-link group">
            <img src="/images/movie-icon.svg" alt="" className="h-5" />
            <span className="span">Movies</span>
          </a>
          <a className="header-link group">
            <img src="/images/series-icon.svg" alt="" className="h-5" />
            <span className="span">Series</span>
          </a>
        </div>
      )}
      {!session ? (
        <button
          className="ml-auto uppercase border px-4 py-1.5 rounded font-medium tracking-wide hover:bg-white hover:text-black
      transition duration-200"
          onClick={signIn}
        >
          Login
        </button>
      ) : (
        <img
          src={session.user.image}
          alt="userImage"
          className="ml-auto h-12 w-12 rounded-full object-cover cursor-pointer"
          onClick={signOut}
        />
      )}
    </header>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}

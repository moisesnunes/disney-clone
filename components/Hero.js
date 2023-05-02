import Head from "next/head";
import Image from "next/image";

export default function Hero() {
  return (
    <section>
      <Head>
        <title>Login | Disney-clone</title>
      </Head>

      <div className="relative min-h-[calc(100vh-72px)]">
        <Image src="/images/hero-background.jpg" fill objectFit="cover" />
        <div className="flex justify-center items-center">
          <div
            className="absolute flex flex-col space-y-3 top-1/4 w-full justify-center items-center max-w-screen-sm
          mx-auto p-8 -mt-16"
          >
            <Image
              src="/images/cta-logo-one.svg"
              objectFit="contain"
              width="600"
              height="150"
            />
            <button
              className="bg-blue-600 uppercase text-xl tracking-wide font-extrabold
          py-4 px-6 w-full rounded hover:bg-[#0485ee]"
            >
              As melhores histórias em um só lugar.
            </button>
            <p className="text-xs text-center">
              {" "}
              Aproveite a tela grande da TV ou assista no tablet, laptop,
              celular e outros aparelhos. Nossa seleção de títulos em 4K não
              para de crescer. Além disso, para a felicidade de todos, é
              possível assistir em até 4 telas ao mesmo tempo.
            </p>
            <Image
              src="/images/cta-logo-two.png"
              width="600"
              height="70"
              objectFit="contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

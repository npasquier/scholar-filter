import Image from "next/image";
import Link from "next/link";
import journals from "../data/journals";
import JournalManager from "@/components/JournalManager";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center gap-9 px-24 py-20 bombay-bg-color cold-gray-color">
      <div>
        <Image className="mx-auto my-3" src="/search.svg" alt="search" width="100" height="100" />

        <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl ">
          Economic Scholar Filter
        </h1>

        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 ">
          Refine your reference research to the most adapted economic journals.
        </p>
      </div>

      <JournalManager journals={journals} />
    </main>
  );
}

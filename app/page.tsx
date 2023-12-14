import Image from "next/image";
import Link from "next/link";
import journals from "../data/journals";
import JournalManager from "@/components/JournalManager";

export default function Home() {
  return (
    <main className="flex flex-col items-center gap-9 px-4 md:px-24 py-20 bombay-bg-color cold-gray-color">
  <div className="text-center">
    <Image className="mx-auto my-3" src="/search.svg" alt="search" width="100" height="100" />

    <h1 className="mb-4 text-3xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight text-gray-900">
      Economic Scholar Filter
    </h1>

    <p className="mb-6 text-base md:text-lg lg:text-xl font-normal text-gray-500 px-4 lg:px-0">
      Refine your reference research to the most adapted economic journals.
    </p>
  </div>

  <JournalManager journals={journals} />
</main>
  );
}

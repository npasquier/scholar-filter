import journals from "../data/journals";
import JournalManager from "@/components/JournalManager";
import LottieSearch from "@/components/animation/LottieSearch";

export default function Home() {
  const sortedJournals = journals.sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (nameA < nameB) {
      return -1;
    } else if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <main className="flex flex-col items-center gap-4 md:gap-9 px-4 md:px-20  py-12 bombay-bg-color cold-gray-color">
      <div className="flex flex-col text-center w-full overflow-hidden ">
          <LottieSearch />
        <h1 className="mb-6 -mt-2 text-2xl md:text-4xl lg:text-5xl font-extrabold leading-none tracking-tight text-gray-900">
          Elevate Your Economic Research
        </h1>

        <p className="mb-6 text-base md:text-lg lg:text-xl font-normal text-gray-500 px-4 lg:px-0">
          Use a seamless filtering that allows you to focus on the most
          pertinent articles within economic journals.{" "}
        </p>
      </div>

      <JournalManager journals={sortedJournals} />
    </main>
  );
}

"use client";

import journals from "@/data/journals";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface Journal {
  name: string;
  issn: string;
  domain: string;
  category: number;
}
interface JournalDisplayProps {
  selectedJournals: Journal[];
  onAddJournal: (journal: Journal) => void;
  onRemoveJournal: (journal: Journal) => void;
}

const JournalDisplay: React.FC<JournalDisplayProps> = ({
  selectedJournals,
  onAddJournal,
  onRemoveJournal,
}) => {
  const { data: session, status } = useSession();

  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleUpdateFavorites = async (
    selectedJournals: {
      name: string;
      issn: string;
      domain: string;
      category: number;
    }[]
  ) => {
    const issnString = selectedJournals
      .map((journal) => journal.issn)
      .join(", ");

    const data = { email: session!.user!.email, list: issnString };

    setIsSaving(true);

    try {
      const response = await axios.put(
        "/api/favorite",
        data
      );

      if (response.status === 200) {
        setTimeout(() => {
          setIsSaved(true);
        }, 500);
        setTimeout(() => {
          setIsSaved(false);
          setIsSaving(false);
        }, 1000);
      } else {
        console.log("Updating failed. Please try again.");
      }
    } catch (error) {
      console.log("An error occurred during updating.");

      if (axios.isAxiosError(error)) {
        console.error(
          "There was a problem with the axios request:",
          error.response?.data
        );
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchFav = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/favorite");
      const issnString = response.data.favorites;
      const issnArray = issnString.split(", ").map((issn : string) => issn.trim());
      const userFavorites = journals.filter(obj => issnArray.includes(obj.issn));
      userFavorites.forEach((journal) => onAddJournal(journal));
      setTimeout(() => {
        setIsLoaded(true);
      }, 200);
      setTimeout(() => {
        setIsLoaded(false);
        setIsLoading(false);
      }, 400);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const baseStylesFavorites = `relative items-center justify-center rounded-full bg-slate-500 w-16 h-6 text-white text-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-opacity-50`;

  const columnStyles = {
    name: "w-3/6 px-4 py-2",
    domain: "w-1/6 px-4 py-2 text-center",
    category: "w-1/6 px-4 py-2 text-center",
    remove: "w-1/6 px-4 py-2 text-center",
  };

  return (
    <div className="mb-6 bg-gray-100 p-4 rounded-lg">
      <p className="font-semibold text-lg text-center mb-4  ">
        📚 Selected Journals
      </p>
      <div className="flex px-4">
        <div className="flex mr-auto mb-4  gap-3">
          Favorite:
          <div className="group relative">
            <button
              disabled={status !== "authenticated" || isSaved || isSaving}
              className={
                status !== "authenticated" || isSaved || isSaving
                  ? "opacity-30" + " " + baseStylesFavorites
                  : baseStylesFavorites
              }
              onClick={() => handleUpdateFavorites(selectedJournals)}
            >
              {!isSaving && !isSaved
                ? "Save"
                : isSaving && !isSaved
                ? "Saving..."
                : "✓"}
            </button>
            <span
              className={
                status !== "authenticated"
                  ? " group absolute bottom-0 z-10 mb-3 hidden group-hover:inline-block w-80 text-center text-sm bg-black text-white p-2 rounded-xl shadow-lg"
                  : "hidden"
              }
            >
              You must be logged in to access this feature.
            </span>
          </div>
          <div className="group relative">
            <button
              disabled={status !== "authenticated"}
              className={
                status !== "authenticated" || isLoaded || isLoading
                  ? "opacity-30" + " " + baseStylesFavorites
                  : baseStylesFavorites
              }
              onClick={() => handleFetchFav()}
            >
              {!isLoaded && !isLoading
                ? "Load"
                : isLoading && !isLoaded
                ? "Loading..."
                : "✓"}
            </button>
            <span
              className={
                status !== "authenticated"
                  ? " group absolute bottom-0 z-10 mb-3 hidden group-hover:inline-block w-80 text-center text-sm bg-black text-white p-2 rounded-xl shadow-lg"
                  : "hidden"
              }
            >
              You must be logged in to access this feature.
            </span>
          </div>
        </div>

        <button
          className="ml-auto relative inline-flex items-center justify-center rounded-lg bg-red-500 w-24 h-8 text-white text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50"
          onClick={() =>
            selectedJournals.forEach((journal) => onRemoveJournal(journal))
          }
        >
          Remove All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm md:text-base">
          <thead>
            <tr className="text-left border-b">
              <th className={columnStyles.name}>Journal Name</th>
              <th className={columnStyles.domain}>Domain</th>
              <th className={columnStyles.category}>Rank</th>
              <th className={columnStyles.remove}>Remove</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="overflow-x-auto relative max-h-[440px] overflow-y-auto">
        <table className="min-w-full text-sm md:text-base">
          <tbody>
            {selectedJournals.map((journal, index) => (
              <tr key={index} className="border-b">
                <td className={columnStyles.name}>{journal.name}</td>
                <td className={columnStyles.domain}>{journal.domain}</td>
                <td className={columnStyles.category}>{journal.category}</td>
                <td className={columnStyles.remove}>
                  <button
                    className="inline-flex items-center justify-center rounded-full bg-red-500 w-5 h-5 text-white font-bold text-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50"
                    onClick={() => onRemoveJournal(journal)}
                  >
                    -
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JournalDisplay;

"use client";

import { useState } from "react";
import JournalDisplay from "./JournalDisplay";
import JournalFilter from "./JournalFilter";

interface Journal {
  name: string;
  issn: string;
  domain: string;
  category: number;
}

interface JournalManagerProps {
  journals: Journal[];
}

const JournalManager: React.FC<JournalManagerProps> = ({ journals }) => {
  const [selectedJournals, setSelectedJournals] = useState<Journal[]>([]);

  const [query, setQuery] = useState("");

  const handleQueryChange = (e: any) => {
    setQuery(e.target.value);
  };
  const handleAddJournal = (journalToAdd: Journal) => {
    setSelectedJournals((prev) => {
      if (prev.find((j) => j.issn === journalToAdd.issn)) {
        return prev;
      }
      return [...prev, journalToAdd];
    });
  };

  const handleRemoveJournal = (journalToRemove: Journal) => {
    setSelectedJournals((prev) =>
      prev.filter((journal) => journal.issn !== journalToRemove.issn)
    );
  };

  const handleSubmit = () => {
    const baseUrl = "https://scholar.google.com/scholar?";
    const queryParam = `as_q=${encodeURIComponent(query)}`;
    const sourceParam = selectedJournals
      .map(
        (journal: any) =>
          `source%3A"${encodeURIComponent(journal.name).replace(/%20/g, "+")}"`
      )
      .join("+OR+");
    const finalUrl = `${baseUrl}${queryParam}+${sourceParam}`;
    window.open(finalUrl, "_blank");
  };

  return (
    <div className="w-full md:w-[80%] mx-auto"> {/* Adjust width for mobile */}
      <div className="mx-auto mt-0 mb-16 text-center">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Enter search query"
          className="w-full md:w-96 mr-6 px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm outline-none focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent" // Responsive width
        />

        <button
          className="elm-bg-color text-slate-100 py-2 px-4 font-semibold rounded-lg shadow-xl hover:bg-slate-200 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-opacity-75 max-md:mt-2"
          onClick={handleSubmit}
        >
          Search on Google Scholar
        </button>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-2 gap-6 mt-6"> {/* Responsive grid */}
        <div>
          <JournalFilter journals={journals} onAddJournal={handleAddJournal} />
        </div>
        <div className="max-md:order-first">
          <JournalDisplay
            selectedJournals={selectedJournals}
            onRemoveJournal={handleRemoveJournal}
          />
        </div>
      </div>
    </div>
  );
};

export default JournalManager;

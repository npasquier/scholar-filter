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
    <div className="w-[80%]">
      <div className="mx-auto my-12 text-center">
        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          placeholder="Enter search query"
        />

        <button onClick={handleSubmit}>Search on Google Scholar</button>
      </div>
      <div className="grid grid-cols-2 relative  gap-6">
        <div>
          <JournalFilter journals={journals} onAddJournal={handleAddJournal} />
        </div>
        <div>
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

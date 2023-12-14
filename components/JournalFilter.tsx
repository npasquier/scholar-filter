"use client";

import { useEffect, useMemo, useState } from "react";

interface Journal {
  name: string;
  issn: string;
  domain: string;
  category: number;
}

interface JournalFilterProps {
  journals: Journal[];
  onAddJournal: (journalToAdd: Journal) => void;
}

const JournalFilter: React.FC<JournalFilterProps> = ({
  journals,
  onAddJournal,
}) => {
  const [filterText, setFilterText] = useState("");
  const [filterRank, setFilterRank] = useState("");
  const [filterDomain, setFilterDomain] = useState("");
  const [filteredJournals, setFilteredJournals] = useState<Journal[]>([]);

  // Filetring journals
  useEffect(() => {
    const filtered = journals.filter(
      (journal) =>
        (filterText
          ? journal.name.toLowerCase().includes(filterText.toLowerCase())
          : true) &&
        (filterRank ? journal.category === parseInt(filterRank) : true) &&
        (filterDomain ? journal.domain === filterDomain : true)
    );
    setFilteredJournals(filtered);
  }, [filterText, filterRank, filterDomain, journals]);


  // Getting categories
  const categories = useMemo(() => {
    const allCategories = journals.map((journal) => journal.domain);
    return Array.from(new Set(allCategories)).sort();
  }, [journals]);

  return (
    <div className="relative top-0">
      <h3 className="font-semibold text-xl text-center my-3">Journal Filter</h3>
      <input
        type="text"
        placeholder="Search by name..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />
      <select
        value={filterRank}
        onChange={(e) => setFilterRank(e.target.value)}
      >
        <option value="">Filter by rank</option>
        <option value="1">Rank: 1</option>
        <option value="2">Rank: 2</option>
        <option value="3">Rank: 3</option>
        <option value="4">Rank: 4</option>
      </select>
      <select
        value={filterDomain}
        onChange={(e) => setFilterDomain(e.target.value)}
      >
        <option value="">Filter by domain</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
      <div className="mt-4">
        {filteredJournals.map((journal, index) => (
          <div key={index}>
            {/* <input
              type="checkbox"
              onChange={(e) => handleJournalCheck(journal, e.target.checked)}
            /> */}
            <button
              className="relative inline-flex items-center justify-center rounded-full bg-green-500 w-5 h-5 text-white font-bold text-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 mr-2"
              onClick={() => onAddJournal(journal)}
            >
              +
            </button>
            {journal.name} - {journal.domain} - Rank: {journal.category}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalFilter;

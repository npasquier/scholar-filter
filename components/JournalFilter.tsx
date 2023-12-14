"use client";

import { useEffect, useMemo, useState } from "react";
import CustomDropdown from "./custom-items/CustomDropdown";

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
  // const categories = useMemo(() => {
  //   const allCategories = journals.map((journal) => journal.domain);
  //   return Array.from(new Set(allCategories)).sort();
  // }, [journals]);

  const ranks = [
    { name: "Rank", value: "" },
    { name: "Rank: 1", value: "1" },
    { name: "Rank: 2", value: "2" },
    { name: "Rank: 3", value: "3" },
    { name: "Rank: 4", value: "4" },
  ];

  const categories = [
    { name: "Category", value: "" },
    { name: "AgrEnEnv", value: "AgrEnEnv" },
    { name: "CPT", value: "CPT" },
    { name: "DevTrans", value: "DevTrans" },
    { name: "EcoDroit", value: "EcoDroit" },
    { name: "EcoPub", value: "EcoPub" },
    { name: "Fin", value: "Fin" },
    { name: "GEN", value: "GEN" },
    { name: "GRH", value: "GRH" },
    { name: "HPEA", value: "HPEA" },
    { name: "Innov", value: "Innov" },
    { name: "LOG", value: "LOG" },
    { name: "MKG", value: "MKG" },
    { name: "Macro", value: "Macro" },
    { name: "Metrie", value: "Metrie" },
    { name: "MgPub", value: "MgPub" },
    { name: "OrgInd", value: "OrgInd" },
    { name: "RO", value: "RO" },
    { name: "SANT", value: "SANT" },
    { name: "SI", value: "SI" },
    { name: "Spatiale", value: "Spatiale" },
    { name: "StratOrg", value: "StratOrg" },
    { name: "ThEco", value: "ThEco" },
    { name: "TravPop", value: "TravPop" },
  ];

  return (
    <div className="relative top-0">
      <h3 className="font-semibold text-xl text-center my-3">Journal Filter</h3>
      <div className="flex">
        <input
          type="text"
          placeholder="Search by name..."
          value={filterText}
          className="w-64 mr-6 px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm outline-none focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent"
          onChange={(e) => setFilterText(e.target.value)}
        />
        {/* <select
        value={filterRank}
        onChange={(e) => setFilterRank(e.target.value)}
      >
        <option value="">Filter by rank</option>
        <option value="1">Rank: 1</option>
        <option value="2">Rank: 2</option>
        <option value="3">Rank: 3</option>
        <option value="4">Rank: 4</option>
      </select> */}

        <CustomDropdown
          setFilter={setFilterDomain}
          filter={filterDomain}
          items={categories}
        />

        <CustomDropdown
          setFilter={setFilterRank}
          filter={filterRank}
          items={ranks}
        />

        {/* <select
        value={filterDomain}
        onChange={(e) => setFilterDomain(e.target.value)}
      >
        <option value="">Filter by domain</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select> */}
      </div>
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

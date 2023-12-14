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
    <div className="relative top-0 p-4 md:p-0">
      {" "}
      {/* Added padding for mobile */}
      <h3 className="font-semibold text-xl text-center my-3">Journal Filter</h3>
      <div className="flex flex-col md:flex-row md:items-center max-md:gap-2">
        {" "}
        {/* Responsive flex container */}
        <input
          type="text"
          placeholder="Search by name..."
          value={filterText}
          className="w-full md:w-64 mb-4 md:mb-0 md:mr-6 px-3 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm outline-none focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent" // Responsive width and margin
          onChange={(e) => setFilterText(e.target.value)}
        />
        <div className="flex">
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
        </div>
      </div>
      <div className="mt-4">
        {filteredJournals.map((journal, index) => (
          <div key={index} className="mb-2">
            {" "}
            {/* Added margin between items */}
            <button
              className="relative inline-flex items-center justify-center rounded-full bg-green-500 w-5 h-5 text-white font-bold text-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 mr-2"
              onClick={() => onAddJournal(journal)}
            >
              +
            </button>
            <span className="text-sm md:text-base">
              {journal.name} - {journal.domain} - Rank: {journal.category}
            </span>{" "}
            {/* Responsive text size */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default JournalFilter;

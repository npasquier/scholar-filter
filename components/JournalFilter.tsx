"use client";

import { Fragment, useEffect, useState } from "react";
import CustomDropdown from "./custom-items/CustomDropdown";
import domains from "@/data/domains";

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

  const categoryHTML = domains
    .filter((domain) => domain.translation !== "") // Filter out categories with an empty value
    .map((domain, index) => (
      <Fragment key={index}>
        <strong>{domain.name}</strong>: <em>{domain.translation}</em>
        <br />
      </Fragment>
    ));

  const columnStyles = {
    name: "w-3/6 px-4 py-2",
    domain: "w-1/6 px-4 py-2 text-center",
    category: "w-1/6 px-4 py-2 text-center",
    add: "w-1/6 px-4 py-2 text-center",
  };

  return (
    <div className="relative top-0 p-4 md:p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center ">
        <h3 className="font-semibold text-2xl text-center mb-6">
          Available Journals
        </h3>
        <div className="group mb-auto">
          *
          <span className="absolute bottom-full max-md:left-6 z-10 -mb-6 hidden group-hover:inline-block w-80 text-center text-sm bg-black text-white p-2 rounded-xl shadow-lg">
            Based on the categorization of journals in economics and management
            by the CNRS in June 2020.
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={filterText}
          className="w-full md:w-1/3 px-4 py-3 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent"
          onChange={(e) => setFilterText(e.target.value)}
        />
        <div className="flex gap-2 max-md:mx-auto">
          <CustomDropdown
            setFilter={setFilterDomain}
            filter={filterDomain}
            items={domains}
          />
          <CustomDropdown
            setFilter={setFilterRank}
            filter={filterRank}
            items={ranks}
          />
        </div>

        <button
          className="max-md:mx-auto relative inline-flex items-center justify-center rounded-full bg-green-500 w-20 h-8 text-white text-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 my-2"
          onClick={() =>
            filteredJournals.forEach((journal) => onAddJournal(journal))
          }
        >
          Add All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm md:text-base">
          <thead>
            <tr className="text-left border-b">
              <th className={columnStyles.name}>Journal Name</th>
              <th className={columnStyles.domain}>
                Domain
                <span className="group mb-auto">
                  *{" "}
                  <span className="absolute hidden bottom-full max-md:left-0 z-10 -mb-40 group-hover:inline-block w-80 text-left text-sm bg-black text-white p-2 rounded-xl shadow-lg">
                    {categoryHTML}
                  </span>
                </span>
              </th>
              <th className={columnStyles.category}>Rank</th>
              <th className={columnStyles.add}>Add</th>
            </tr>
          </thead>
        </table>
      </div>
        <div className="overflow-x-auto relative max-h-[800px] overflow-y-auto">
          <table className="min-w-full text-sm md:text-base">
            <tbody>
              {filteredJournals.map((journal, index) => (
                <tr key={index} className="border-b">
                  <td className={columnStyles.name}>{journal.name}</td>
                  <td className={columnStyles.domain}>{journal.domain}</td>
                  <td className={columnStyles.category}>{journal.category}</td>
                  <td className={columnStyles.add}>
                    <button
                      className="inline-flex items-center justify-center rounded-full bg-green-500 w-5 h-5 text-white font-bold text-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50"
                      onClick={() => onAddJournal(journal)}
                    >
                      +
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

export default JournalFilter;

"use client";

import { Fragment, useEffect, useState } from "react";
import CustomDropdown from "./custom-items/CustomDropdown";
import domains from "@/data/domains";
import Image from "next/image";

interface Journal {
  name: string;
  issn: string;
  domain: string;
  category: number;
}

interface JournalFilterProps {
  journals: Journal[];
  passedSelectedJournals: Journal[];
  onAddJournal: (journalToAdd: Journal) => void;
}

const JournalFilter: React.FC<JournalFilterProps> = ({
  journals,
  passedSelectedJournals,
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
    name: "w-6/12 px-4 py-2",
    domain: "w-3/12 px-4 py-2 text-center",
    category: "w-2/12 px-4 py-2 text-center",
    add: "w-1/12 px-4 py-2 text-center",
  };

  return (
    <div className="relative top-0 p-4 md:p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center pb-6 gap-2">
        <h3 className="font-semibold text-2xl text-center my-auto">
          Available Journals
        </h3>
        <div className="group my-auto">
          <Image src="/info.svg" alt="info" width={20} height={20} />
          <span className="absolute bottom-full max-md:left-6 z-10 -mb-6 hidden group-hover:inline-block w-80 text-center text-sm bg-black text-white p-2 rounded-xl shadow-lg">
            Based on the categorization of journals in economics and management
            by the CNRS in June 2020.
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-wrap md:flex-row md:items-center gap-3 mb-6">
        <input
          type="text"
          placeholder="Search by name..."
          value={filterText}
          className="w-full  px-4 py-3 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent"
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
          className="ml-auto max-lg:mx-auto relative inline-flex items-center justify-center rounded-full bg-green-500 w-20 h-8 text-white text-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 my-2"
          onClick={() =>
            filteredJournals.forEach((journal) => onAddJournal(journal))
          }
        >
          Add All
        </button>
      </div>

      <div className="overflow-x-auto  max-h-[800px] overflow-y-auto">
        <table className="min-w-full text-sm md:text-base">
          <thead className="bg-gray-50 sticky top-0">
            <tr className="text-left border-b">
              <th className={columnStyles.name}>Journal Name</th>
              <th className={columnStyles.domain}>
                <div className="flex gap-2 w-24 mx-auto">
                  {" "}
                  Domain
                  <span className="group">
                    <Image src="/info.svg" alt="info" width={20} height={20} />
                    <span className="group absolute left-0 z-10 mt-2 hidden group-hover:inline-block w-80 text-center text-sm bg-black text-white p-2 rounded-xl shadow-lg">
                      {categoryHTML}
                    </span>
                  </span>
                </div>
              </th>
              <th className={columnStyles.category}>Rank</th>
              <th className={columnStyles.add}>Add</th>
            </tr>
          </thead>
          <tbody>
            {filteredJournals.map((journal, index) => (
              <tr key={index} className={`border-b ${passedSelectedJournals.some(j => j.issn === journal.issn) && "bg-gray-200 line-through opacity-20" }`}>
                <td className={columnStyles.name}>{journal.name}</td>
                <td className={columnStyles.domain}>{journal.domain}</td>
                <td className={columnStyles.category}>{journal.category}</td>
                <td className={columnStyles.add}>
                  <button
                  disabled={passedSelectedJournals.some(j => j.issn === journal.issn)}
                    className={`inline-flex items-center justify-center rounded-full w-5 h-5 text-white font-bold text-lg ${ !passedSelectedJournals.some(j => j.issn === journal.issn) ?  "bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50" : "cursor-not-allowed bg-gray-500 opacity-20" } }`}
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

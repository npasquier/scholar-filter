"use client";

import { useEffect, useState } from "react";
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

  const [authorQuery, setAuthorQuery] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const handleAuthorQuery = (e: any) => {
    setAuthorQuery(e.target.value);
  };

  const handleStartYear = (e: any) => {
    setStartYear(e.target.value);
  };

  const handleEndYear = (e: any) => {
    setEndYear(e.target.value);
  };

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

    const queryAuthor =
      authorQuery && `author%3A"${encodeURIComponent(authorQuery)}"`;
    const queryStartYear = startYear && `as_ylo=${startYear}`;
    const queryEndYear = endYear && `as_yhi=${endYear}`;

    const finalUrl = `${baseUrl}${queryParam}+${sourceParam}+${queryAuthor}&as_ylo=${queryStartYear}&as_yhi=${endYear}`;
    window.open(finalUrl, "_blank");
  };

  return (
    <div className="w-full md:w-[80%] mx-auto">
      {" "}
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
      <div className="grid grid-cols-1  md:grid-cols-2 gap-6 mt-6">
        {" "}
        <div>
          <JournalFilter journals={journals} onAddJournal={handleAddJournal} />
        </div>
        <div className="max-md:order-first">
          <div className="relative top-0 p-4 md:p-6 bg-white rounded-lg shadow-md">
            <h3 className="font-semibold text-2xl text-center mb-6">Filter</h3>
            <div className="mb-6 bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold text-lg text-center mb-4 ">🗓️ Date</p>
              <div className="flex justify-center items-center gap-2">
                <span>From</span>
                <input
                  type="text"
                  value={startYear}
                  placeholder="yyyy"
                  className="w-full md:w-1/6 px-4 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent"
                  onChange={handleStartYear}
                />

                <span>To</span>
                <input
                  type="text"
                  value={endYear}
                  placeholder="yyyy"
                  className="w-full md:w-1/6 px-4 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent"
                  onChange={handleEndYear}
                />
              </div>
            </div>

            <div className="mb-6 bg-gray-100 p-4 rounded-lg">
              <p className="font-semibold text-lg text-center mb-4 ">
                ✍️ Author
              </p>
              <div className="flex justify-center items-center">
                <input
                  type="text"
                  placeholder="Author name"
                  value={authorQuery}
                  className="w-full md:w-3/6 px-4 py-2 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-300 focus:border-transparent"
                  onChange={handleAuthorQuery}
                />
              </div>
            </div>

            <JournalDisplay
              selectedJournals={selectedJournals}
              onRemoveJournal={handleRemoveJournal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalManager;

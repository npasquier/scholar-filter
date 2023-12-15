import React, { useEffect } from "react";

interface Journal {
  name: string;
  issn: string;
  domain: string;
  category: number;
}
interface JournalDisplayProps {
  selectedJournals: Journal[];
  onRemoveJournal: (journal: Journal) => void;
}

const JournalDisplay: React.FC<JournalDisplayProps> = ({
  selectedJournals,
  onRemoveJournal,
}) => {
  return (
    <div className="mb-6 bg-gray-100 p-4 rounded-lg">
      <p className="font-semibold text-lg text-center mb-4  ">
        📚 Selected Journals
      </p>
      <div className="flex">
        <button
          className="mx-auto relative inline-flex items-center justify-center rounded-lg bg-red-500 w-24 h-8 text-white text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50 mb-4"
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
              <th className="px-4 py-2 w-2/3">Journal Name</th>
              <th className="px-4 py-2 w-1/6">Category</th>
              <th className="px-4 py-2 w-1/6">Rank</th>
              <th className="px-4 py-2 w-1/12">Remove</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="overflow-x-auto relative max-h-[440px] overflow-y-auto">
        <table className="min-w-full text-sm md:text-base">
          <tbody>
          {selectedJournals.map((journal, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2 w-2/3">{journal.name}</td>
                <td className="px-4 py-2 w-1/6">{journal.domain}</td>
                <td className="px-4 py-2 w-1/6">{journal.category}</td>
                <td className="px-4 py-2 text-center w-1/12">
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

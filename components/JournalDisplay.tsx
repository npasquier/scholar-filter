// components/JournalDisplay.tsx
import React from "react";

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
    <div className="relative top-0">
      <h3 className="font-semibold text-xl text-center my-3">
        Selected Journals
      </h3>
      {selectedJournals.map((journal, index) => (
        <div key={index}>
          <button
            className="relative inline-flex items-center justify-center rounded-full bg-red-500 w-5 h-5 text-white font-bold text-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-50 mr-2"
            onClick={() => onRemoveJournal(journal)}
          >
            -
          </button>
          {journal.name}
        </div>
      ))}
    </div>
  );
};

export default JournalDisplay;

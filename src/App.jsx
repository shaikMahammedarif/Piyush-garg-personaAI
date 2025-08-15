import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // <-- add this
import personaPrompt from "./personaPrompt";

function App() {
  const [search, setSearch] = useState("");
  const [openSections, setOpenSections] = useState(
    personaPrompt.sections.map(() => true)
  );

  const toggleSection = (index) => {
    setOpenSections((prev) =>
      prev.map((isOpen, i) => (i === index ? !isOpen : isOpen))
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Piyush Garg Persona AI</h1>

      <input
        type="text"
        placeholder="Search keyword..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-2 border rounded w-full"
      />

      {personaPrompt.sections.map((section, idx) => {
        const filteredLines = section.lines.filter((line) =>
          line.toLowerCase().includes(search.toLowerCase())
        );

        if (filteredLines.length === 0) return null;

        return (
          <div key={idx} className="mb-4 bg-white p-4 rounded shadow">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection(idx)}
            >
              <h2 className="text-xl font-semibold">{section.title}</h2>
              <span className="text-gray-500">{openSections[idx] ? "▼" : "▶"}</span>
            </div>

            <AnimatePresence initial={false}>
              {openSections[idx] && (
                <motion.ul
                  className="list-disc pl-5 mt-2 space-y-1"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredLines.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default App;

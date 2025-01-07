import { useEffect, useState } from "react";
import { Entry } from "./types";
import entriesService from "./services/entriesService";
import EntriesList from "./components/EntriesList";
import EntryForm from "./components/EntryForm";

function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  
  useEffect(() => {
    const fetchEntries = async () => {
      const response = await entriesService.getAll();
      console.log(response);
      setEntries(response);
    };
    fetchEntries();
  }, []);


  return (
    <>
    <EntriesList entries={entries} />
    <EntryForm entries={entries} setEntries={setEntries} />
    </>
  )
}

export default App;

import { useState } from "react";
import entriesService from "../services/entriesService";
import { Entry } from "../types";

const EntryForm = ({
  entries,
  setEntries,
}: {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
}) => {
  const style = {
    padding: 4,
    margin: 4,
  };

  const [date, setDate] = useState("");
  const [weather, setWeather] = useState("");
  const [visibility, setVisibility] = useState("");
  const [comment, setComment] = useState("");

  const createEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newObject = {
      date,
      weather,
      visibility,
      comment,
    };

    entriesService
      .createEntry(newObject)
      .then((res) => {
        setDate("");
        setWeather("");
        setVisibility("");
        setComment("");
        setEntries(entries.concat(res));
      })
      .catch((e) => {
        alert(e instanceof Error ? e.message : "An error occurred");
        console.log(e instanceof Error ? e.message : "An error occurred");
      });
  };
  
  return (
    <div style={style}>
      <h2>Create an Entry</h2>
      <form onSubmit={createEntry}>
        <input
          type='text'
          value={date}
          placeholder='date'
          onChange={(e) => setDate(e.target.value)}
        />
        <p>Weather: </p>
        <div>
          sunny{" "}
          <input
            type='radio'
            name='weather'
            value='sunny'
            checked={weather === "sunny"}
            onChange={(e) => setWeather(e.target.value)}
          />
          rainy{" "}
          <input
            type='radio'
            name='weather'
            value='rainy'
            checked={weather === "rainy"}
            onChange={(e) => setWeather(e.target.value)}
          />
          cloudy{" "}
          <input
            type='radio'
            name='weather'
            value='cloudy'
            checked={weather === "cloudy"}
            onChange={(e) => setWeather(e.target.value)}
          />
          stormy{" "}
          <input
            type='radio'
            name='weather'
            value='stormy'
            checked={weather === "stormy"}
            onChange={(e) => setWeather(e.target.value)}
          />
          windy{" "}
          <input
            type='radio'
            name='weather'
            value='windy'
            checked={weather === "windy"}
            onChange={(e) => setWeather(e.target.value)}
          />
        </div>
        <p>Visibility: </p>
        <div>
          great{" "}
          <input
            type='radio'
            name='visibility'
            value='great'
            checked={visibility === "great"}
            onChange={(e) => setVisibility(e.target.value)}
          />
          good{" "}
          <input
            type='radio'
            name='visibility'
            value='good'
            checked={visibility === "good"}
            onChange={(e) => setVisibility(e.target.value)}
          />
          ok{" "}
          <input
            type='radio'
            name='visibility'
            value='ok'
            checked={visibility === "ok"}
            onChange={(e) => setVisibility(e.target.value)}
          />
          poor{" "}
          <input
            type='radio'
            name='visibility'
            value='poor'
            checked={visibility === "poor"}
            onChange={(e) => setVisibility(e.target.value)}
          />
        </div>
        <input
          type='text'
          value={comment}
          placeholder='comment'
          style={style}
          onChange={(e) => setComment(e.target.value)}
        />
        <br />
        <button type='submit'>Add Entry</button>
      </form>
    </div>
  );
};
export default EntryForm;

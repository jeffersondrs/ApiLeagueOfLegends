import { useState } from "react";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [champions, setChampions] = useState();
  useEffect(() => {
    axios
      .get(
        "https://ddragon.leagueoflegends.com/cdn/12.19.1/data/en_US/champion.json"
      )
      .then((response) => {
        const object = response.data.data;
        const result = Object.keys(object).map((key) => {
          return String(key), object[key];
        });
        setChampions(result);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(champions);
  return (
    <div className="App flex flex-row flex-wrap justify-center">
      {champions?.map((char, index) => {
        const image = char.image.sprite;
        return (
          <div
            className="bg-slate-600/20 rounded-xl m-2 w-48 h-64 flex flex-col justify-evenly items-center text-white font-bold text-xl hover:scale-105"
            key={index}
          >
            <h1 className="text-black">{char.name}</h1>
            <img
              src={
                "http://ddragon.leagueoflegends.com/cdn/12.19.1/img/champion/" +
                char.image.full
              }
            />
            <div className="w-32 rounded-xl text-center bg-slate-800/30 h-16 flex flex-col justify-center">
              <p className="text-lg font-thin">{char.tags[0]}</p>
              <p className="text-lg font-thin">{char.tags[1]}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;

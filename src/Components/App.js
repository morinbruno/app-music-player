import PlayerMusic from "./PlayerMusic.js";
import ListMusic from "./ListMusic.js";
import AddMenu from "./AddMenu.js";
import { useState, useEffect } from "react";
import { getAllSongs, openDB } from "../models/dbIndexed";
import { API } from "../models/api";

function App() {
  const [URLMusic, setURLMusic] = useState("");
  const [pistes, setPistes] = useState([]);
  const [cover, setCover] = useState("");
  const [musicSelected, setMusicSelected] = useState({});

  useEffect(() => {
    (async () => {
      try {
        openDB()
          .then(() => {
            getAllSongs().then((songs) => {
              API.pistes = songs;
              setPistes(API.pistes);
            });
          })
          .catch((error) => {
            console.error("Erreur lors de l'ouverture de la base de données :", error);
          });
      } catch (error) {
        console.error("Erreur lors de la récupération des pistes :", error);
      }
    })();
  }, []);

  function openAddMenu(){
    const addMenu = document.getElementById("addMenu");
    addMenu.classList.replace("hidden", "flex");
  }

  function hideAddMenu(e){
    const addMenu = document.getElementById("addMenu");
    if(e.target.id === "addMenu"){
      addMenu.classList.replace("flex", "hidden");
    }
  }

  return (
    <div className="flex flex-col justify-between items-center h-full w-full">
      <AddMenu URLMusic={URLMusic} setURLMusic={setURLMusic} hideAddMenu={hideAddMenu} setPistes={setPistes} />
      <div className="grid grid-rows-1 w-full h-full">
        <ListMusic openAddMenu={openAddMenu} pistes={pistes} URLMusic={URLMusic} setURLMusic={setURLMusic} setCover={setCover} cover={cover} setMusicSelected={setMusicSelected} />
      </div>
      <PlayerMusic URLMusic={URLMusic} setURLMusic={setURLMusic} cover={cover} setCover={setCover} musicSelected={musicSelected} setMusicSelected={setMusicSelected} pistes={pistes}/>
    </div>
  );
}

export default App;

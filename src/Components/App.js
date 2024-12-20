import PlayerMusic from "./PlayerMusic.js";
import ListMusic from "./ListMusic.js";
import AddMenu from "./AddMenu.js";
import { useState } from "react";

function App() {
  const [URLMusic, setURLMusic] = useState("");

  function openAddMenu(){
    const addMenu = document.getElementById("addMenu");
    addMenu.classList.replace("hidden", "flex");
  }

  function hideAddMenu(e){
    if(e.target.id === "addMenu"){
      const addMenu = document.getElementById("addMenu");
      addMenu.classList.replace("flex", "hidden");
    }
  }

  return (
    <div className="flex flex-col justify-between items-center h-full w-full bg-gradient-to-br from-[#A33634] to-[#424290]">
      <AddMenu URLMusic={URLMusic} setURLMusic={setURLMusic} hideAddMenu={hideAddMenu} />
      <div className="grid grid-rows-1 w-full h-full">
        <ListMusic openAddMenu={openAddMenu} />
      </div>
      <PlayerMusic URLMusic={URLMusic} setURLMusic={setURLMusic} />
    </div>
  );
}

export default App;

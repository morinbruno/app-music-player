import PlayerMusic from "./PlayerMusic.js";
import FormMusic from './FormMusic.js';
import SelectAlbumSearch from "./SelectAlbumSearch.js";
import ListMusic from "./ListMusic.js";

function App() {
  return (
    <div className='flex flex-col justify-between items-center h-full w-full bg-gradient-to-br from-[#A33634] to-[#424290]'>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        <FormMusic />
        <SelectAlbumSearch />
      </div>
      <div className="grid grid-rows-1 w-full h-full">
        <ListMusic />
      </div>
      <PlayerMusic />
    </div>
  );
}

export default App;

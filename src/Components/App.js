import PlayerMusic from "./PlayerMusic.js";
import FormMusic from './FormMusic.js';

function App() {
  
  return (
    <div className='flex flex-col justify-between items-center h-full w-full bg-cyan-950'>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
        <FormMusic />
      </div>
      <PlayerMusic />
    </div>
  );
}

export default App;

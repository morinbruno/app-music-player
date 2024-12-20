import FormMusic from "./FormMusic";
import SelectAlbumSearch from "./SelectAlbumSearch";

const AddMenu = ({URLMusic, setURLMusic, hideAddMenu}) => {
    return (
        <div className="absolute h-screen w-screen z-50 bg-black bg-opacity-40 justify-center items-center hidden" id="addMenu" onClick={hideAddMenu}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
            <FormMusic URLMusic={URLMusic} setURLMusic={setURLMusic} />
            <SelectAlbumSearch />
          </div>
        </div>
      </div>
    );
}

export default AddMenu;
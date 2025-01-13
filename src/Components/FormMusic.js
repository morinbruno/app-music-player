import {Input, Button} from "@nextui-org/react";

const FormMusic = ({title, setTitle, artist, setArtist, album, mp3File, setAlbum, setMp3File, addMusic, cover, searchTrack}) => {

    const handleMusic = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "audio/mpeg" && file.size <= 15000000) {
            setMp3File(file);
          } else {
            alert("Veuillez sélectionner un fichier MP3 valide.");
          }
    }

    const handleTitle = (e) => {
        const titleValue = e.target.value;
        if(titleValue.length > 50){
            alert("Le titre de la musique ne doit pas dépasser 50 caractères.");
        } else {
            setTitle(titleValue);
        }
    }

    const handleAlbum = (e) => {
        const albumValue = e.target.value;
        if(albumValue.length > 50){
            alert("Le titre de l'album ne doit pas dépasser 50 caractères.");
        } else {
            setAlbum(albumValue);
        }
    }

    const handleArtist = (e) => {
        const artistValue = e.target.value;
        if(artistValue.length > 50){
            alert("Le nom de l'artist ne doit pas dépasser 50 caractères.");
        } else {
            setArtist(artistValue);
        }
    }

    return (
        <div className="p-4 backdrop-blur border-2 bg-[#A33634] rounded-lg shadow-lg border-warning bg-opacity-70 flex flex-col h-full overflow-auto">
            <h1 className="mb-4 text-xl">Ajouter une musique à la bibliothèque</h1>
            <form className="flex flex-col justify-between md:h-full">
                <div>
                    <div className="mb-2">
                        <Input 
                            color="warning"
                            type="text"
                            label="Titre de la musique"
                            value={title}
                            onChange={handleTitle}
                        />
                    </div>
                    <div className="mb-2">
                        <Input 
                            color="warning"
                            type="text"
                            label="Titre de l'album"
                            value={album}
                            onChange={handleAlbum}
                        />
                    </div>
                    <div className="mb-4">
                        <Input 
                            color="warning"
                            type="text"
                            label="Nom de l'artiste"
                            value={artist}
                            onChange={handleArtist}
                        />
                    </div>
                    <div className="mb-4">
                        <Input 
                            color="warning"
                            type="file"
                            description="Format MP3 et poid égal/inférieur à 15 Mo"
                            classNames={{
                                description: "text-white"
                            }}
                            onChange={handleMusic}
                            id={"mp3File"}
                        />
                    </div>
                </div>
                <div>
                    <div className="mb-4">
                        <Button
                            color="warning"
                            className="w-full"
                            onClick={searchTrack}
                        >
                            Rechercher
                        </Button>
                    </div>
                    <div>
                        <Button
                            color="warning"
                            className="w-full"
                            onClick={addMusic}
                            isDisabled={title === "" || album === "" || artist === "" || mp3File === "" || !cover}
                        >
                            Ajouter
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FormMusic;
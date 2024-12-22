import {Input, Button} from "@nextui-org/react";

const FormMusic = ({title, setTitle, artist, setArtist, album, mp3File, setAlbum, setMp3File, addMusic, cover}) => {

    const handleMusic = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "audio/mpeg") {
            setMp3File(file);
          } else {
            alert("Veuillez sélectionner un fichier MP3 valide.");
          }
    }

    const handleTitle = (e) => {
        const titleValue = e.target.value;
        if(/\d/.test(titleValue)){
            alert("Le titre de la musique ne doit pas contenir de chiffres.");
        } else if(titleValue.length > 50){
            alert("Le titre de la musique ne doit pas dépasser 50 caractères.");
        } else {
            setTitle(titleValue);
        }
    }

    const handleAlbum = (e) => {
        const albumValue = e.target.value;
        if(/\d/.test(albumValue)){
            alert("Le titre de l'album ne doit pas contenir de chiffres.");
        } else if(albumValue.length > 50){
            alert("Le titre de l'album ne doit pas dépasser 50 caractères.");
        } else {
            setAlbum(albumValue);
        }
    }

    const handleArtist = (e) => {
        const artistValue = e.target.value;
        if(/\d/.test(artistValue)){
            alert("Le nom de l'artist ne doit pas contenir de chiffres.");
        } else if(artistValue.length > 50){
            alert("Le nom de l'artist ne doit pas dépasser 50 caractères.");
        } else {
            setArtist(artistValue);
        }
    }

    return (
        <div className="p-4 backdrop-blur m-2 border-2 bg-[#A33634] rounded-lg shadow-lg border-warning bg-opacity-70 h-full">
            <h1 className="mb-4 text-xl">Ajouter une musique à la bibliothèque</h1>
            <form className="max-full">
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
                        description="Format MP3"
                        classNames={{
                            description: "text-white"
                        }}
                        onChange={handleMusic}
                    />
                </div>
                <div>
                    <Button
                        color="warning"
                        className="w-full"
                        onClick={addMusic}
                        isDisabled={title === "" || album === "" || artist === "" || mp3File === "" || cover === ""}
                    >
                        Ajouter
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default FormMusic;
import FormMusic from "./FormMusic";
import SelectAlbumSearch from "./SelectAlbumSearch";
import { useState, useEffect } from "react";
import { API } from "../models/api";
import {Button} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { openDB, addSong, getAllSongs } from "../models/dbIndexed";

const AddMenu = ({ hideAddMenu, hideAddMenuBtn, setPistes }) => {
  const [album, setAlbum] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [cover, setCover] = useState("");
  const [mp3File, setMp3File] = useState("");

  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    (async () => {
      if (artist === "" || album === "") {
        setAlbums([]);
      } else {
        try {
          const getAlbums = await API.getAlbum(album, artist);
  
          // Récupérer toutes les couvertures en parallèle
          const albumsWithCovers = await Promise.all(
            getAlbums.map(async (album) => {
              album.cover = await API.getAlbumCover(album.id);
              return album; // Retourner l'album avec la couverture
            })
          );
  
          setAlbums(albumsWithCovers); // Mettre à jour albums après avoir récupéré les couvertures
        } catch (error) {
          console.error("Erreur lors de la récupération des albums :", error);
          setAlbums([]); // En cas d'erreur, réinitialiser les albums
        }
      }
    })();
  }, [album, title, artist]);

  const addMusic = async () => {
    const song = {
      title: title,
      albumTitle: album,
      artistName: artist,
      mp3File: new Blob([mp3File]),
      coverUrl: cover
    };

    openDB();
    addSong(song)
      .then(() => {
        console.log("Musique ajoutée avec succès");
        setCover("");
        setTitle("");
        setAlbum("");
        setArtist("");
        setMp3File("");
        hideAddMenuBtn();
      })
      .catch((error) => {
        console.error("Erreur lors de l'ajout de la musique :", error);
      });

      API.pistes = await getAllSongs();
      setPistes(API.pistes);
      console.log(API.pistes);
  }

  return (
    <div className="absolute h-screen w-screen z-50 bg-black bg-opacity-40 justify-center items-center hidden" id="addMenu" onClick={hideAddMenu}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          <FormMusic
            title={title}
            setTitle={setTitle}
            artist={artist}
            setArtist={setArtist}
            album={album}
            setAlbum={setAlbum}
            cover={cover}
            addMusic={addMusic}
            mp3File={mp3File}
            setMp3File={setMp3File}
          />
          <SelectAlbumSearch albums={albums} setCover={setCover} />
        </div>
      </div>
      <Button
        isIconOnly={true} 
        disableAnimation={true} 
        className="absolute top-2 right-2" 
        onClick={hideAddMenuBtn}
        color={"warning"}
        id={"btnCloseAddMenu"}
      >
        <FontAwesomeIcon icon={faXmark} />
      </Button>
    </div>
  );
}

export default AddMenu;
import FormMusic from "./FormMusic";
import SelectAlbumSearch from "./SelectAlbumSearch";
import { useState, useEffect } from "react";
import { API } from "../models/api";
import { openDB, addSong, getAllSongs } from "../models/dbIndexed";

const AddMenu = ({ hideAddMenu, setPistes }) => {
  const [album, setAlbum] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [cover, setCover] = useState("");
  const [mp3File, setMp3File] = useState("");

  const [albums, setAlbums] = useState([]);

  const searchTrack = async () => {
    const loadingSearchAlbumsID = document.getElementById('loadingSearchAlbums');

    if (artist.length === 0 || album.length === 0 || title.length === 0) {
      setAlbums([]);
      alert("Veuillez compléter le formulaire.")
    } else {
      try {
        const getAlbums = await API.getAlbum(album, artist);

        loadingSearchAlbumsID.classList.replace('hidden', 'flex')
        // Récupérer toutes les couvertures en parallèle
        const albumsWithCovers = await Promise.all(
          await getAlbums.map(async (album) => {
            let cover = await API.getAlbumCover(album.id);
            const matching = {
              id: album.id,
              cover: cover,
              title: album.title,
              date: await API.getAlbumInfo(album.id).then((info) => info.date),
              "artist-credit": album["artist-credit"],
              tracks: await API.getAlbumInfo(album.id).then((info) => info.media[0].tracks.filter((track) => track.title.toLowerCase() === title.toLowerCase()))
            };
            if (!Array.isArray(matching.tracks)) matching.tracks = [matching.tracks];
            return matching;
          })
        );
        if(albumsWithCovers.length === 0) {
          alert("Aucune correspondance de trouvée.")
        }
        loadingSearchAlbumsID.classList.replace('flex', 'hidden')
        setAlbums(albumsWithCovers); // Mettre à jour albums après avoir récupéré les couvertures
      } catch (error) {
        loadingSearchAlbumsID.classList.replace('flex', 'hidden');
        alert('Une erreur est survenue lors de la récupération des albums.');
        console.error("Erreur lors de la récupération des albums :", error);
        setAlbums([]); // En cas d'erreur, réinitialiser les albums
      }
    }
  };

  const addMusic = async () => {
    const inputMp3File = document.getElementById("mp3File");
    const addMenu = document.getElementById("addMenu");

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
        inputMp3File.value = "";
        addMenu.classList.replace("flex", "hidden");
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
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-2 px-5">
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
            searchTrack={searchTrack}
          />
          <SelectAlbumSearch albums={albums} setCover={setCover} />
        </div>
      </div>
    </div>
  );
}

export default AddMenu;
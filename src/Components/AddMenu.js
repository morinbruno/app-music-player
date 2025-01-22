import FormMusic from "./FormMusic";
import SelectAlbumSearch from "./SelectAlbumSearch";
import { useState, useCallback } from "react";
import { API } from "../models/api";
import { openDB, addSong, getAllSongs } from "../models/dbIndexed";

const AddMenu = ({ hideAddMenu, setPistes }) => {
  const [album, setAlbum] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [cover, setCover] = useState("");
  const [mp3File, setMp3File] = useState("");

  const [albums, setAlbums] = useState([]);
  const [albumIDSelected, setAlbumIDSelected] = useState()

  const searchTrack = async () => {
    const loadingSearchAlbumsID = document.getElementById('loadingSearchAlbums');
    setCover()

    if (!artist || !album || !title) {
      setAlbums([]);
      alert("Veuillez compléter le formulaire.")
    } else {
      try {
        const getAlbums = await API.getAlbum(album, artist);

        loadingSearchAlbumsID.classList.replace('hidden', 'flex')
        // Récupérer toutes les couvertures en parallèle
        const albumsWithCovers = await Promise.all(
          await getAlbums.map(async (albm) => {
            let cover = await API.getAlbumCover(albm.id);
            const matching = {
              id: albm.id,
              cover: cover,
              title: albm.title,
              date: await API.getAlbumInfo(albm.id).then((info) => info.date),
              "artist-credit": albm["artist-credit"],
              tracks: await API.getAlbumInfo(albm.id).then((info) => info.media[0].tracks.filter((track) => track.title.toLowerCase() === title.toLowerCase()))
            };
            if (!Array.isArray(matching.tracks)) matching.tracks = [matching.tracks];
            return matching;
          })
        );
        if (albumsWithCovers.length === 0) {
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
      title: await API.getAlbumInfo(albumIDSelected).then((info) => info.media[0].tracks.find((track) => track.title.toLowerCase() === title.toLowerCase())).then((track) => track.title),
      albumTitle: await API.getAlbumInfo(albumIDSelected).then((info) => info.title),
      artistName: await API.getAlbumInfo(albumIDSelected).then((info) => info["artist-credit"][0].name),
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
        setAlbums([])
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
  }

  const selectAlbum = useCallback(async (e, idAlbum) => {
    const album = e.currentTarget;
    const listAlbums = document.getElementById("listAlbums");
    let cover = null;

    setAlbumIDSelected(idAlbum)

    if (!listAlbums) {
        album.classList.replace("border-warning", "border-danger");
    } else {
        const listAlbumsChildren = listAlbums.children;
        for (let i = 0; i < listAlbumsChildren.length; i++) {
            listAlbumsChildren[i].classList.replace("border-danger", "border-warning");
        }
        album.classList.replace("border-warning", "border-danger");

        cover = await API.getAlbumCover(idAlbum);
    }
    setCover(cover ? cover.image : null);
}, [setCover]);

  return (
    <div className="absolute h-screen w-screen z-50 bg-black bg-opacity-40 justify-center items-center hidden" id="addMenu" onClick={hideAddMenu}>
      <div className="container h-[60vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-2 px-5 h-full">
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
          <SelectAlbumSearch albums={albums} setCover={setCover} selectAlbum={selectAlbum} />
        </div>
      </div>
    </div>
  );
}

export default AddMenu;
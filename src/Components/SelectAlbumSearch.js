import { Image, ScrollShadow } from '@nextui-org/react';
import { API } from '../models/api';
import { useCallback } from 'react';

const SelectAlbumSearch = ({ albums, setCover }) => {
    const selectAlbum = useCallback(async (e, id) => {
        const album = e.currentTarget;
        const listAlbums = document.getElementById("listAlbums");
        let cover = null;
        
        
        if(!listAlbums) {
            album.classList.replace("border-warning", "border-danger");
        } else {
            const listAlbumsChildren = listAlbums.children;
            for (let i = 0; i < listAlbumsChildren.length; i++) {
                listAlbumsChildren[i].classList.replace("border-danger", "border-warning");
            }
            album.classList.replace("border-warning", "border-danger");
    
            cover = await API.getAlbumCover(id);
        }
        setCover(cover ? cover.image : null);
    }, [setCover]);

    return (
        <div className="m-2 border-2 bg-[#A33634] rounded-lg shadow-lg border-warning p-5 overflow-hidden flex flex-col h-full">
            <h1 className='mb-4 text-xl'>Résultat de la recherche</h1>
            <div className='relative h-full'>
                {!albums || albums.length === 0 ? (
                    <div className="flex rounded-lg overflow-hidden mb-4 shadow-lg border-warning bg-warning font-mono text-lg border-2 cursor-pointer items-center justify-center" style={{height:100}} onClick={(e) => selectAlbum(e)} >
                        Ajouter la musique sans recherche
                    </div>
                ) : (
                    <ScrollShadow className="absolute h-full w-full top-0 bottom-0 overflow-auto" hideScrollBar={true} id={"listAlbums"}>
                        <div className="flex rounded-lg overflow-hidden mb-4 shadow-lg border-warning bg-warning font-mono text-lg border-2 cursor-pointer items-center justify-center" style={{height:100}} onClick={(e) => selectAlbum(e)} >
                            Ajouter la musique sans recherche
                        </div>
                        {albums.every(album => album.tracks.length === 0) ? (
                            <div className="text-center text-lg text-warning-500">Aucun morceau trouvé</div>
                        ) : (
                            albums.map((album) => (
                                album.tracks.length !== 0 && (
                                    album.tracks.map((track) => (
                                        <div className="flex rounded-lg overflow-hidden mb-4 shadow-lg border-warning border-2 cursor-pointer" key={track.id} onClick={(e) => selectAlbum(e, album.id)} >
                                            {album.cover ? (
                                                <div className='me-2 overflow-hidden aspect-square'>
                                                    <Image
                                                        height={100}
                                                        src={album.cover.image}
                                                        alt={album.title} title={album.title}
                                                        className="aspect-square"
                                                        radius={"none"}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="bg-warning me-2">
                                                    <div className='flex justify-center items-center text-center' style={{ height: "100px", width: "100px" }}>Cover non trouvé</div>
                                                </div>
                                            )}
                                            <div className='flex flex-col flex-1 justify-center'>
                                                <h1 className='text-lg font-bold mb-2'>
                                                    {track.title} {album.date ? `(${album.date.slice(0, 4)})` : ""}
                                                </h1>
                                                <h2 className='text-sm font-semibold mb-2'>
                                                    {album.title} - {album["artist-credit"][0].name}
                                                </h2>
                                            </div>
                                        </div>
                                    ))
                                )
                            ))
                        )}
                    </ScrollShadow>
                )}
            </div>
        </div>
    );
};

export default SelectAlbumSearch;
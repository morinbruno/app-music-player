import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faMusic, 
    faPlus, 
    faEllipsisVertical, 
    faTrash ,
    faCircleInfo
} from "@fortawesome/free-solid-svg-icons";
import {
    ScrollShadow,
    Button,
    Image,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownSection,
    DropdownItem
} from "@nextui-org/react";
import { useEffect,useState } from "react";
import { Vibrant } from "node-vibrant/browser";
import { 
    openDB, 
    deleteSong, 
    getAllSongs 
} from "../models/dbIndexed";
import { API } from "../models/api";

const ListMusic = ({ openAddMenu, setPistes, pistes, setCover, cover, setURLMusic, URLMusic, setMusicSelected }) => {  
    const selectTrack = async (id) => {
        const result = pistes.find((piste) => piste.id === id)
        URLMusic && URL.revokeObjectURL(URLMusic);
        const url = URL.createObjectURL(result.mp3File);
        const cover = result.coverUrl ? result.coverUrl : null;

        console.log("Musique sélectionnée :", result);
        document.title = result.title + " - " + result.artistName;
        setMusicSelected(result);
        setCover(cover);
        setURLMusic(url);
    };

    // Changement de couleur de fond en fonction de la pochette de l'album
    useEffect(() => {
        (async () => {
            const listMusic = document.getElementById("listMusic");
            const playerMusic = document.getElementById("playerMusic");
            if (cover) {
                Vibrant.from(cover).getPalette()
                    .then(palette => {
                        const dominantColor = palette.Vibrant.rgb;
                        const gradient = `linear-gradient(to bottom right, rgb(${dominantColor.join(',')}), rgb(${palette.Muted.rgb.join(',')}))`;
                        console.log("Dégradé CSS :", gradient);
                        listMusic.style.background = gradient;
                        playerMusic.style.backgroundColor = `rgb(${palette.DarkVibrant.rgb.join(',')})`;
                    })
                    .catch(err => {
                        console.error("Erreur :", err);
                    });
            }
        })();
    }, [cover]);

    const deleteTrack = async (id) => {
        openDB();
        deleteSong(id)
            .then(() => {
                console.log("Musique supprimer avec succès");
            })
            .catch((error) => {
                console.error("Erreur lors de la supression de la musique :", error);
            });

        API.pistes = await getAllSongs();
        setPistes(API.pistes);
        console.log(API.pistes);
    }

    function openInfoMenu() {
        const infoMenu = document.getElementById("infoMenu");
        infoMenu.classList.replace("hidden", "flex");
    }

    return (
        <div className="px-4 py-3 flex flex-col flex-1 bg-gradient-to-br from-[#A33634] to-[#6e5352] bg-opacity-70" id="listMusic">
            <div className="text-xl border-b-2 border-warning pb-2 flex justify-between items-center mb-3">
                <h1 className=""><FontAwesomeIcon icon={faMusic} className="me-2" />Bibliothèque musical</h1>
                <div className="flex gap-3">
                    <Button
                        color="warning"
                        className="ms-auto"
                        onClick={openAddMenu}
                    >
                        Ajouter un titre <FontAwesomeIcon icon={faPlus} />
                    </Button>
                    <Button
                        isIconOnly={true}
                        color="warning"
                        title="Informations sur la bibliothèque musicale"
                        onClick={openInfoMenu}
                    >
                        <FontAwesomeIcon icon={faCircleInfo} size="lg" />
                    </Button>
                </div>
            </div>
            <div className="relative h-full">
                <ScrollShadow
                    // hideScrollBar 
                    className="w-full absolute top-0 bottom-0"
                    style={{
                        scrollbarColor: "#f5a524 rgba(163, 54, 52, 0)",
                        scrollbarGutter: "none"
                    }}
                >
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    >
                        {pistes.length === 0 ? (
                            <div className="flex rounded-lg overflow-hidden mb-4 shadow-lg border-warning bg-warning font-mono select-none text-lg border-2 items-center justify-center" style={{ height: 100 }} >
                                Aucune musique de trouvée
                            </div>
                        ) : pistes.map((piste) => (
                            <div
                                className="flex rounded-lg overflow-hidden shadow-lg border-warning border-2 cursor-pointer select-none relative"
                                key={piste.id}
                                onClick={() => { selectTrack(piste.id) }}
                            >
                                <img
                                    src={piste.coverUrl}
                                    title={piste.title}
                                    alt={""}
                                    className="absolute top-0 left-0 w-full h-full object-cover blur-md"
                                />
                                {piste.coverUrl ?
                                    <div className='me-2 overflow-hidden aspect-square'>
                                        <Image
                                            height={100}
                                            src={piste.coverUrl}
                                            alt={piste.title} title={piste.title}
                                            className="aspect-square"
                                            radius={"none"}
                                        />
                                    </div> :
                                    <div className="bg-warning me-2" >
                                        <div className='flex justify-center items-center text-center text-[32pt] font-semibold bg-warning' style={{ height: "100px", width: "100px" }}>{piste.title[0].toUpperCase()}</div>
                                    </div>
                                }
                                <div
                                    className='flex flex-col flex-1 justify-center z-10'
                                >
                                    <h1
                                        className='text-lg font-bold mb-2'
                                    >
                                        {piste.title} - {piste.albumTitle}
                                    </h1>
                                    <h2
                                        className='text-sm font-semibold mb-2 capitalize'
                                    >
                                        {piste.artistName}
                                    </h2>
                                </div>
                                <div>
                                    <Dropdown className="border-warning border-2">
                                        <DropdownTrigger>
                                            <Button
                                                isIconOnly={true}
                                                className="bg-transparent text-warning"
                                            >
                                                <FontAwesomeIcon icon={faEllipsisVertical} size="lg" />
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu>
                                            <DropdownSection title="Actions">
                                                <DropdownItem
                                                    key={`delete-${piste.id}`}
                                                    className="text-danger"
                                                    color="danger"
                                                    description="Supprimer ce titre de votre bibliothèque"
                                                    startContent={<FontAwesomeIcon icon={faTrash} />}
                                                    onClick={() => { deleteTrack(piste.id) }}
                                                >
                                                    Supprimer
                                                </DropdownItem>
                                            </DropdownSection>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollShadow>
            </div>
        </div>
    )
}

export default ListMusic;
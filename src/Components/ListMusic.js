import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic, faPlus } from "@fortawesome/free-solid-svg-icons";
import {ScrollShadow, Button, Image} from "@nextui-org/react";

const ListMusic = ({openAddMenu, pistes}) => {
    return (
        <div className="px-4 py-3 flex flex-col flex-1 m-2 border-2 bg-[#A33634] rounded-lg shadow-lg border-warning bg-opacity-70">
            <div className="text-xl border-b-2 border-warning pb-2 inline-flex items-center mb-3">
                <h1 className=""><FontAwesomeIcon icon={faMusic} className="me-2"/>Bibliothèque musical</h1>
                <Button 
                    color="warning" 
                    className="ms-auto"
                    onClick={openAddMenu}
                >
                    Ajouter un titre <FontAwesomeIcon icon={faPlus} />
                </Button>
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
                    {pistes.map((piste) => (
                        <div className="flex rounded-lg overflow-hidden mb-4 shadow-lg border-warning border-2 cursor-pointer" key={piste.id} >
                            {piste.coverUrl?
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
                                    <div className='flex justify-center items-center text-center' style={{height: "100px", width: "100px"}}>Cover non trouvé</div>
                                </div>
                            }
                            <div
                                className='flex flex-col flex-1 justify-center'
                            >
                                <h1
                                    className='text-lg font-bold mb-2'
                                >
                                    {piste.title} - {piste.albumTitle}
                                </h1>
                                <h2
                                    className='text-sm font-semibold mb-2'
                                >
                                    {piste.artistName}
                                </h2>
                            </div>
                        </div>
                    ))}
                </ScrollShadow>
            </div>
        </div>
    )
}

export default ListMusic;
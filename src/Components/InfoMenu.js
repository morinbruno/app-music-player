import { Link } from "@nextui-org/react"

function InfoMenu() {
    function hideInfoMenu(e) {
        const infoMenu = document.getElementById("infoMenu");
        if (e.target.id === "infoMenu") {
          infoMenu.classList.replace("flex", "hidden");
        }
    }

    return (
        <div 
            className="absolute h-screen w-screen z-50 bg-black bg-opacity-40 justify-center items-center hidden" 
            id="infoMenu" 
            onClick={hideInfoMenu}
        >
            <div className="rounded border-warning border-2 w-3/4 h-[80vh] overflow-auto bg-[#A33634] flex flex-col">
                <div className="flex-1 p-2">
                    <div>
                        <h1 className="text-center font-bold text-xl mb-4 border-b-2 w-fit mx-auto">Informations sur l'application</h1>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-1">Fonctionnement</h2>
                        <ol className="list-decimal list-inside ms-3 mb-2 text-sm">
                            <li>Cliquer sur <span className="font-bold">Ajouter un titre</span>.</li>
                            <li>Remplir les champs du formulaire.</li>
                            <li>Sélectionner l'album/single dans la section de recherche</li>
                            <li>Uploader le fichier MP3 de la musique.</li>
                            <li>Valider l'ajout de la musique.</li>
                        </ol>
                        <span>Et voilà vous avez uploadé votre musique à votre bibliothèque musical! :D</span>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-1">Disclaimer</h2>
                        <p className="text-sm ms-3">
                            Cette application respecte les droits d'auteurs. 
                            Les musiques ajoutées sont stockées localement et ne sont pas partagées sur internet.
                            Et l'application ne télécharge pas de musique depuis internet.
                        </p>
                    </div>
                    <div className="mb-4">
                        <h2 className="text-lg font-semibold mb-1">Ressources utilisées</h2>
                        <div className="text-sm ms-3 mb-2">
                            Cette application utilise les dépendances suivantes
                            <ul className="list-disc list-inside ms-3">
                                <li>
                                    <Link href="https://fr.react.dev/" isExternal showAnchorIcon color="warning">
                                        React.js
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://nextui.org" isExternal showAnchorIcon color="warning">
                                        NextUI
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://tailwindcss.com/" isExternal showAnchorIcon color="warning">
                                        TailwindCSS
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://vibrant.dev/" isExternal showAnchorIcon color="warning">
                                        Vibrant
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://fontawesome.com/" isExternal showAnchorIcon color="warning">
                                        FontAwesome
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="text-sm ms-3">
                            API utilisées
                            <ul className="list-disc list-inside ms-3">
                                <li>
                                    <Link href="https://musicbrainz.org/doc/MusicBrainz_API" isExternal showAnchorIcon color="warning">
                                        MusicBrainz API
                                    </Link>
                                </li>
                                <li>
                                    <Link href="https://musicbrainz.org/doc/Cover_Art_Archive/API" isExternal showAnchorIcon color="warning">
                                        Cover Art Archive
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="border-t-2 border-warning">
                    <p className="text-center p-2 font-semibold">Pour me soutenir, n'hésitez pas à m'offrir un café <a href="https://www.paypal.com/paypalme/MorinBruno2002" target="_blank" rel="noreferrer" className="text-warning hover:underline">ici</a> ☕️</p>
                </div>
            </div>
        </div>
    )
}

export default InfoMenu;
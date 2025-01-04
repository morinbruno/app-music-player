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
            <div className="rounded p-2 border-warning border-2 w-11/12 md:w-1/2 lg:w-1/3 bg-[#A33634] flex flex-col">
                <div>
                    <h1 className="text-center font-bold text-lg mb-4 border-b-2 w-fit mx-auto">Informations sur l'application</h1>
                </div>
                <div>
                    <ul>
                        <li>Test</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default InfoMenu;
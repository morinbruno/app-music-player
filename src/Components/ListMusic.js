import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";
import {ScrollShadow} from "@nextui-org/react";

const ListMusic = () => {
    const divs = Array.from({ length: 50 }, (_, index) => `Text${index}`);

    return (
        <div className="px-4 py-3 flex flex-col flex-1 m-2 border-2 bg-[#A33634] rounded-lg shadow-lg border-warning bg-opacity-70">
            <h1 className="text-xl border-b-2 border-warning pb-2 inline-flex items-center mb-3"><FontAwesomeIcon icon={faMusic} className="me-2"/>Bibliothèque musical</h1>
            <div className="relative h-full">
            <ScrollShadow 
                // hideScrollBar 
                className="w-full absolute top-0 bottom-0"
                style={{
                    scrollbarColor: "#f5a524 rgba(163, 54, 52, 0)",
                    scrollbarGutter: "none"
                }}
            >
                {divs.map((div, index) => (
                    <div key={index}>
                        {div}
                    </div>
                ))}
            </ScrollShadow>
            </div>
        </div>
    )
}

export default ListMusic;
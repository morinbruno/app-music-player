import { Slider, Button, Image } from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRepeat, faForwardStep, faBackwardStep } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useRef } from "react";

const PlayerMusic = ({URLMusic, titleMusic, titleAlbum, nameArtist, cover}) => {
    const [isRepeated, setRepeated] = useState(false);
    const [isPaused, setPaused] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1)

    const audioRef = useRef(null); // Utilisation de useRef pour le lecteur audio

    // Met à jour la durée totale et gère le temps actuel
    useEffect(() => {
        const audio = audioRef.current;

        // Vérifie et initialise la durée lorsque l'audio est chargé
        const onLoadedMetadata = () => setDuration(audio.duration || 0);
            // Met à jour le temps actuel à intervalles réguliers
            const interval = setInterval(() => {
                if (!audio.paused) setCurrentTime(audio.currentTime || 0);
                if(audio.currentTime === audio.duration) setPaused(false);
            }, 1000);
    
            audio.addEventListener("loadedmetadata", onLoadedMetadata);
    
            return () => {
                clearInterval(interval); // Nettoyage de l'intervalle
                audio.removeEventListener("loadedmetadata", onLoadedMetadata);
            };
    }, []);

    // Formate la durée (minutes:secondes)
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    // Lecture et pause de la musique
    const togglePlayPause = () => {
        const audio = audioRef.current;
        document.title = audio.title;
        if (isPaused) {
            audio.pause();
        } else {
            audio.play();
        }
        setPaused(!isPaused);
    };

    // Activer/désactiver le mode boucle
    const toggleRepeat = () => {
        const audio = audioRef.current;
        audio.loop = !isRepeated;
        setRepeated(!isRepeated);
    };

    // Mise à jour du slider
    const updateSlider = (value) => {
        const audio = audioRef.current;
        audio.currentTime = value;
        setCurrentTime(value);
    };

    const updateVolume = (value) => {
        const audio = audioRef.current;
        audio.volume = value;
        setVolume(value);
    }

    return (
        <div className="flex flex-col w-full shadow z-40">
            {/* Slider */}
            <Slider
                aria-label="Music progress"
                classNames={{
                    track: "bg-default-500/30 rounded-none m-0 cursor-pointer border-none",
                    thumb: "w-4 h-4 after:w-4 after:h-4 after:bg-foreground opacity-0 hover:opacity-100 duration-100 hover:duration-100",
                }}
                color="warning"
                size="sm"
                value={currentTime}
                minValue={0}
                maxValue={duration}
                onChangeEnd={updateSlider}
            />

            {/* Boutons du lecteur */}
            <div className="flex bg-[#A33634] px-4 py-2">
                <div className="grid grid-cols-3 w-full">
                    {/* Affichage temps */}
                    <div className="flex justify-start h-full items-center flex-wrap ">
                        {cover ? (
                            <Image
                                src={cover}
                                isBlurred
                                height={84}
                                width={84}
                                radius="md"
                                shadow="sm"
                                className="bg-warning"
                            />
                            ) : (
                                <div className="bg-warning rounded-lg h-[84px] aspect-square flex justify-center items-center text-[32pt] font-semibold">{titleMusic[0]}</div>
                            )
                        }
                        <div className="md:ms-4 text-nowrap flex flex-col">
                            <span className="mb-2 text-warning-500 font-semibold">{titleMusic}</span>
                            {formatTime(currentTime)} / {duration > 0 ? formatTime(duration) : "--:--"}
                        </div>
                    </div>
                    {/* Bouton lecture/pause */}
                    <div className="flex justify-center items-center gap-5">
                        <Button
                            isIconOnly
                            className="rounded-full bg-transparant"
                            disableRipple={false}
                            disableAnimation={true}
                        >
                            <FontAwesomeIcon icon={faBackwardStep} size="xl" />
                        </Button>
                        <Button
                            isIconOnly
                            className="rounded-full bg-opacity-50"
                            onClick={togglePlayPause}
                            disableRipple={false}
                            disableAnimation={true}
                        >
                            {isPaused ? <FontAwesomeIcon icon={faPause} size="xl" /> : <FontAwesomeIcon icon={faPlay} size="xl"/>}
                        </Button>
                        <Button
                            isIconOnly
                            className="rounded-full bg-transparant"
                            disableRipple={false}
                            disableAnimation={true}
                        >
                            <FontAwesomeIcon icon={faForwardStep} size="xl" />
                        </Button>
                    </div>
                    {/* Bouton boucle */}
                    <div className="flex justify-end items-center">
                        <Button isIconOnly className="bg-transparent" onClick={toggleRepeat}>
                              <FontAwesomeIcon icon={faRepeat} 
                                className={isRepeated ? "text-warning" : ""}
                                title={isRepeated ? "Mode boucle" : "Mode simple"}
                                size="xl"
                            />
                        </Button>
                        <Slider
                            size="sm"
                            step={0.01}
                            maxValue={0.7}
                            minValue={0}
                            color="warning"
                            orientation="vertical"
                            aria-label="Volume"
                            value={volume}
                            onChange={updateVolume}
                            classNames={{
                                thumb: "w-2 h-2 after:w-2 after:h-2 after:bg-foreground",
                                track: "border-none"
                            }}
                        />
                    </div>
                </div>
            </div>
            {/* Lecteur audio */}
            <audio ref={audioRef} src={URLMusic} preload="metadata" />
        </div>
    );
};

export default PlayerMusic;

import { Slider, Button } from "@nextui-org/react";
import { PauseIcon, PlayIcon, ArrowPathRoundedSquareIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import music from "../assets/music-test/music.mp3";

const PlayerMusic = () => {
    const [isRepeated, setRepeat] = useState(false);
    const [isPaused, setPause] = useState(false);
    const [duration, setDuration] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);
    const mediaPlayer = document.querySelector('audio');

    useEffect(() => {
        const mediaPlayer = document.querySelector('audio');

        setInterval(() => {
            setCurrentTime(mediaPlayer.currentTime)
        }, 1000)
    })

    function calculDuration(time) {
        let minutes = parseInt(time/60)
        let secondes = (time%60).toFixed(0)

        if(minutes.length === 1){
            minutes = "0"+minutes
        }

        if(secondes.length === 1){
            secondes = "0"+secondes
        }

        return minutes + ":" + secondes
    }

    function pausePlay() {
        const mediaPlayer = document.querySelector('audio');

        mediaPlayer.volume = 0.3
        setDuration(mediaPlayer.duration)
        
        if(isPaused){
            mediaPlayer.pause()
        } else {
            mediaPlayer.play()
        }
        setPause(!isPaused)
    }

    function repeat() {
        const mediaPlayer = document.querySelector('audio');

        if(!isRepeated){
            mediaPlayer.setAttribute('loop', true)
        } else {
            mediaPlayer.setAttribute('loop', false)
        }
        setRepeat(!isRepeated)
    }

    function setSlider(value){
        const mediaPlayer = document.querySelector('audio');

        mediaPlayer.currentTime = value
        setCurrentTime(value)
    }

    return (
        <div className='flex flex-col w-full h-20 shadow z-50 overflow-hidden'>
            {/* Slider */}
            <Slider
                aria-label="Music progress"
                classNames={{
                    track: "bg-default-500/30 rounded-none mb-0 cursor-pointer border-none",
                    thumb: "w-4 h-4 after:w-4 after:h-4 after:bg-foreground opacity-0 hover:opacity-100 duration-100 hover:duraction-100 ",
                }}
                color="warning"
                size="sm"
                value={currentTime !== null ? mediaPlayer.currentTime : ""}
                maxValue={duration !== null ? mediaPlayer.duration : ""}
                onChange={setSlider}
                step={1}
            />

            {/* Boutons du lecteur */}
            <div className="flex h-full bg-gray-700 px-4 py-2">
                <div className='grid grid-cols-3 w-full'>
                    <div
                        className='flex justify-start items-center'
                    >
                        {mediaPlayer != null ? calculDuration(currentTime) : "--:--"} / {duration ? calculDuration(duration) : "--:--"}
                    </div>
                    <div
                        className='flex justify-center items-center'
                    >
                        <Button
                            isIconOnly
                            className='bg-gray-800 rounded-full'
                            onClick={pausePlay}
                            disableRipple={false}
                            disableAnimation={true}
                        >
                            {isPaused ? <PauseIcon width={24} /> : <PlayIcon width={24} />}
                        </Button>
                    </div>
                    <div
                        className='flex justify-end items-center'
                    >
                        <div>
                            <Button
                                isIconOnly
                                className='bg-transparent'
                                onClick={repeat}
                            >
                                <ArrowPathRoundedSquareIcon
                                    className={isRepeated ? "text-warning size-6" : "size-6"}
                                    title={isRepeated ? "Mode boucle" : "Mode simple"}
                                />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <audio 
                src={music}
                preload=""
            />
        </div>
    )
};

export default PlayerMusic;
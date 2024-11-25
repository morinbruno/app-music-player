import {Input, Button} from "@nextui-org/react";
import {useState} from 'react'

const FormMusic = () => {
    return (
        <div className="p-4 backdrop-blur m-2 border-2 bg-[#A33634] rounded-lg shadow-lg border-warning bg-opacity-70">
            <h1 className="mb-4 text-xl">Ajouter une musique à la bibliothèque</h1>
            <form className="max-full">
                <div className="mb-2">
                    <Input 
                        color="warning"
                        type="text"
                        label="Titre de la musique"
                    />
                </div>
                <div className="mb-2">
                    <Input 
                        color="warning"
                        type="text"
                        label="Titre de l'album"
                    />
                </div>
                <div className="mb-4">
                    <Input 
                        color="warning"
                        type="text"
                        label="Nom de l'artiste"
                    />
                </div>
                <div className="mb-4">
                    <Input 
                        color="warning"
                        type="file"
                        description="Format MP3"
                        classNames={{
                            description: "text-white"
                        }}
                    />
                </div>
                <div>
                    <Button
                        color="warning"
                        className="w-full"
                    >
                        Ajouter
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default FormMusic;
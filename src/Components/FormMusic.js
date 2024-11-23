import {Input, Button} from "@nextui-org/react";
import {useState} from 'react'

const FormMusic = () => {
    return (
        <div className="border-3 m-3 p-4 rounded-lg backdrop-blur bg-cyan-950 border-cyan-700 shadow-lg">
            <form className="max-full">
                <div className="mb-2">
                    <Input 
                        color="primary"
                        type="text"
                        label="Titre de la musique"
                    />
                </div>
                <div className="mb-2">
                    <Input 
                        color="primary"
                        type="text"
                        label="Titre de l'album"
                    />
                </div>
                <div className="mb-4">
                    <Input 
                        color="primary"
                        type="text"
                        label="Nom de l'artiste"
                    />
                </div>
                <div className="mb-4">
                    <Input 
                        color="primary"
                        type="file"
                        description="Format MP3"
                    />
                </div>
                <div>
                    <Button
                        color="primary"
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
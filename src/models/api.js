const API = {
    baseURL: "https://musicbrainz.org/ws/2",
    pistes: []
}

API.getAlbum = async (nameAbulm, nameArtist) => {
    const reponse = await fetch(`${API.baseURL}/release/?query=artist:${nameArtist} AND release:"${nameAbulm}"?inc=aliases%2Bartist-credits%2Blabels%2Bdiscids%2Brecordings&fmt=json`);
    const data = await reponse.json();
    return data.releases;
}

API.getAlbumId = async (nameAbulm, nameArtist) => {
    const reponse = await fetch(`${API.baseURL}/release/?query=artist:${nameArtist} AND release:"${nameAbulm}"?inc=aliases%2Bartist-credits%2Blabels%2Bdiscids%2Brecordings&fmt=json`);
    const data = await reponse.json();
    return data.releases[0].id;
}

// Renvoie les informations d'un album par son ID.
API.getAlbumInfo = async (albumId) => {
    const reponse = await fetch(`${API.baseURL}/release/${albumId}?inc=aliases%2Bartist-credits%2Blabels%2Bdiscids%2Brecordings%2Bmedia&fmt=json`);
    const data = await reponse.json();
    return data;
}

API.getAlbumCover = async (albumId) => {
    try {
        const reponse = await fetch(`https://coverartarchive.org/release/${albumId}`);

        if(!reponse) {
            throw new Error("Cover non trouvé")
        }
        const data = await reponse.json();
        console.log("Cover trouvé")
        return data.images[0];
    } catch(e){
        console.error(e)
        return null;
    }

}

export { API };
const API = {
    baseURL: "https://musicbrainz.org/ws/2",
    albums: []
}

API.getListSearch = async (nameAbulm, nameArtist) => {
    const reponse = await fetch(`${API.baseURL}/release/?query=primarytype:"album" AND artist:${nameArtist} AND release:"${nameAbulm}"?inc=aliases%2Bartist-credits%2Blabels%2Bdiscids%2Brecordings&fmt=json`);
    const data = await reponse.json();
    console.log(data)
    return data.releases;
}

API.getAlbumId = async (nameAbulm, nameArtist, index) => {
    const reponse = await fetch(`${API.baseURL}/release/?query=primarytype:"album" AND artist:${nameArtist} AND release:"${nameAbulm}"?inc=aliases%2Bartist-credits%2Blabels%2Bdiscids%2Brecordings&fmt=json`);
    const data = await reponse.json();
    console.log(data)
    return data.releases[0].id;
}

// Renvoie les informations d'un album par son ID.
API.getAlbumInfo = async (albumId) => {
    const reponse = await fetch(`${API.baseURL}/release/${albumId}?inc=aliases%2Bartist-credits%2Blabels%2Bdiscids%2Brecordings%2Bmedia&fmt=json`);
    const data = await reponse.json();
    console.log(data)
    return data;
}

API.getAlbumCover = async (albumId) => {
    try {
        const reponse = await fetch(`${API.baseURL}/release/${albumId}`);

        if(!reponse.ok) {
            throw new Error("Cover non trouvé")
        }
        const data = await reponse.json();
        console.log("Cover trouvé")
        console.log(data)
        return data.images[0];
    } catch(e){
        console.error(e)
        return null
    }

}

export default API;
const API = {
    baseURL: "https://musicbrainz.org/ws/2",
    pistes: []
}

const baseURL = "https://musicbrainz.org/ws/2"

const config = {
    headers: {
        Accept: "application/json"
    },
    mode: "cors",
    method: "GET",
    referrerPolicy: "strict-origin-when-cross-origin",
    redirect: "follow"
};

API.getAlbum = async (nameAbulm, nameArtist) => {
    const reponse = await fetch(`${API.baseURL}/release/?query=artist:${nameArtist} AND release:"${nameAbulm}"&inc=artists+collections+labels+recordings+release-groups&fmt=json`, config);
    const data = await reponse.json();
    return data.releases;
}

API.getAlbumId = async (nameAbulm, nameArtist) => {
    const reponse = await fetch(`${API.baseURL}/release/?query=artist:${nameArtist} AND release:"${nameAbulm}"&inc=artists+collections+labels+recordings+release-groups&fmt=json`, config);
    const data = await reponse.json();
    return data.releases[0].id;
}

// Renvoie les informations d'un album par son ID.
API.getAlbumInfo = async (albumId) => {
    const reponse = await fetch(`${API.baseURL}/release/${albumId}?inc=artists+collections+labels+recordings+release-groups%2Bmedia&fmt=json`, config);
    const data = await reponse.json();
    return data;
}

API.getAlbumCover = async (albumId) => {
    try {
        const reponse = await fetch(`https://coverartarchive.org/release/${albumId}`, config);
        
        if(!reponse.ok) throw new Error("Cover non trouvé")

        const data = await reponse.json();
        console.log("Cover trouvé")
        return data.images[0];
    } catch(e){
        console.error(e)
        return null;
    }

}

export { API };
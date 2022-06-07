import Innertube from 'youtubei.js';
class YTAPI {
    constructor() {
        (async () => {
            this.yt = await new Innertube({ gl: 'ID' });
            console.log('creating new instance')
        })()
    }
    async getSearchSuggestions(query, mode) {
        return this.yt.getSearchSuggestions(query, { client: mode })
    }
    async search(query, mode) {
        return this.yt.search(query, { client: mode })
    }
    async detail(ids) {
        return this.yt.getDetails(ids)
    }
    async playlist(ids, mode) {
        return this.yt.getPlaylist(ids, { client: mode })
    }
    async stream(ids) {
        return this.yt.getStreamingData(ids, {
            format: 'mp4', // defaults to mp4
            quality: '720p', // falls back to 360p if a specific quality isn't available
            type: 'video'
        })
    }
    async translate(txt, lang) {
        return this.yt.interact.translate(txt, lang)
    }
}
exports.YTAPI = new YTAPI();
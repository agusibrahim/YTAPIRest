const {YTAPI} = require('../class/ytapi');

exports.getSearchSuggestions = async (req, res) => {
    const yt = YTAPI
    const {q} = req.query
    const {type}=req.params
    const resp = await yt.getSearchSuggestions(q, type=='yt'?"YOUTUBE": "YTMUSIC" )
    res.json(resp)
}
exports.search = async (req, res) => {
    const yt = YTAPI
    const {q} = req.query
    const {type}=req.params
    const resp = await yt.search(q, type=='yt'?"YOUTUBE": "YTMUSIC" )
    res.json(resp)
}
exports.detail=async (req,res)=>{
    const yt = YTAPI
    const {id} = req.query
    const resp = await yt.detail(id)
    res.json(resp)
}
exports.stream=async (req,res)=>{
    const yt = YTAPI
    const {id} = req.query
    const resp = await yt.stream(id)
    res.json(resp)
}
exports.playlist=async (req,res)=>{
    const yt = YTAPI
    const {id} = req.query
    const {type}=req.params
    const resp = await yt.playlist(id,type=='yt'?"YOUTUBE": "YTMUSIC" )
    res.json(resp)
}
exports.translate=async (req,res)=>{
    const yt = YTAPI
    const {txt,lang} = req.query
    const resp = await yt.translate(txt,lang)
    res.json(resp)
}
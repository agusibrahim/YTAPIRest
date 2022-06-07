const express=require('express');
const controller=require('../controllers/yt.controller');

const router=express.Router();
router.route('/suggestion/:type').get(controller.getSearchSuggestions);
router.route('/search/:type').get(controller.search);
router.route('/playlist/:type').get(controller.playlist);
router.route('/detail').get(controller.detail);
router.route('/stream').get(controller.stream);
router.route('/translate').get(controller.translate);

module.exports=router
import express from 'express';
import { createLike } from './LikeService.js';

const router = express.Router();

router.post('/createlike',async(req, res) => {
    try{
        const like = await createLike(req, res);
        res.status(200).json({ message: 'Liked successfully!!!'});
    }catch(err){
        res.status(500).json({ message: 'Internal Server Error'});
    }
});

export default router;
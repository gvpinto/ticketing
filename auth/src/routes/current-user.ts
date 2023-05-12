import express from 'express';

const router = express.Router();

router.get('/api/users/currentuser', (req, res) => {
    res.send('Hi I am the currentuser');
});

export { router as currentUserRouter };
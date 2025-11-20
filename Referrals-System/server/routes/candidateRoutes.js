const { getMetrics, createCandidate, getCandidates, updateStatus, deleteCandidate } = require('../controllers/candidateController');
const authMiddleware = require('../middlewares/authMiddleware');

const candidateRouter = require('express').Router();

candidateRouter.get('/metrics',authMiddleware,getMetrics);
candidateRouter.post('/create',authMiddleware,createCandidate);
candidateRouter.get('/get-candidates',authMiddleware,getCandidates)
candidateRouter.put('/edit-candidates/:id',authMiddleware,updateStatus)
candidateRouter.delete('/delete-candidates/:id',authMiddleware,deleteCandidate)
module.exports = candidateRouter;
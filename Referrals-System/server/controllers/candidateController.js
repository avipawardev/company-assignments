const candidatesModel = require("../models/candidate.model");

const createCandidate = async(req,res)=>{
    try {
        const {name, email, phone, jobTitle } = req.body;
        if (!name || !email || !phone || !jobTitle) {
      return res.status(400).json({ message: 'All fields except resume are required' });
    }
    let candidateCheck = await candidatesModel.findOne({email})
    if(candidateCheck) return res.status(400).json({ message: 'User Already exists!' });
    let resumeUrl = '';
    if (req.file) {
      // file saved to /uploads; expose via /uploads/<filename>
      resumeUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }
      const candidate = await candidatesModel.create({
      name, email, phone, jobTitle, resumeUrl, referredBy: req.user.id
    });
       return res.status(201).json(candidate);
    } catch (error) {
        console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const getCandidates = async (req, res) => {
  try {
    const candidates = await candidatesModel.find({ referredBy: req.user.id }).sort({ createdAt: -1 });
    res.json(candidates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['Pending','Reviewed','Hired'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const candidate = await candidatesModel.findOne({ _id: id, referredBy: req.user.id });
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    candidate.status = status;
    await candidate.save();
    return res.json(candidate);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteCandidate = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await candidatesModel.findOneAndDelete({ _id: id, referredBy: req.user.id });
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });
    return res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const getMetrics = async (req,res)=>{
    try {
        const match = {referredBy:req.user.id}
        const total = await candidatesModel.countDocuments(match);
        const pending = await candidatesModel.countDocuments({ ...match, status: 'Pending' });
        const reviewed = await candidatesModel.countDocuments({ ...match, status: 'Reviewed' });
        const hired = await candidatesModel.countDocuments({ ...match, status: 'Hired' });

        return res.json({total,pending,reviewed,hired});

    } catch (error) {
        console.error(error.message);
    return res.status(500).json({ message: error.message });
    }
}

module.exports = {createCandidate,getCandidates,updateStatus,deleteCandidate,getMetrics}
const {catchAsync} = require('../../utils/catchAsync');

module.exports.heartbeat = catchAsync(async (req , res) => {
    try {
        res.status(200).json({message: 'hello'});
    } catch (err) {
        res.status(500).json(err);
    }
});
const History = require('../models/History');
const { successResponse, errorResponse } = require('../utils/response');

const getHistory = async (req, res) => {
  try {
    const { type, limit = 50, page = 1 } = req.query;
    const query = { user: req.user._id };
    if (type) query.type = type;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const history = await History.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await History.countDocuments(query);

    successResponse(res, {
      items: history,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    }, 'History retrieved');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

const clearHistory = async (req, res) => {
  try {
    await History.deleteMany({ user: req.user._id });
    successResponse(res, null, 'History cleared');
  } catch (error) {
    errorResponse(res, error.message);
  }
};

module.exports = { getHistory, clearHistory };

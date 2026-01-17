"use strict";

const ReS = (res, data, code = 200) => {
  return res.status(code).json({
    success: true,
    data,
  });
};

const ReE = (res, error, code = 500) => {
  return res.status(code).json({
    success: false,
    error,
  });
};

module.exports = {
  ReS,
  ReE,
};

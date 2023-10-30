const express = require("express");
const expressError = require("./expressError");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("The server got a request");
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to Express Calculator");
});

function getMean(nums) {
  const total = nums.reduce((acc, cv) => acc + cv);
  const mean = total / nums.length;
  return mean;
}

function getMedian(nums) {
    const mid = Math.floor(nums.length / 2);
    return nums[mid];
}

function getMode(nums) {
    const numMap = new Map();
    let max = 0;

    for (let num of nums) {
        numMap.set(num, (numMap.get(num) || 0) + 1);
        if (numMap.get(num) > max) {
          max = numMap.get(num);
          mode = num;
        }
      }
      return mode;
}

app.get("/mean", (req, res, next) => {
  console.log(req.query);
  if (req.query["arr"]) {
    const arr = req.query.arr.split(",");
    const checkNum = arr.forEach((num) => {
      if (isNaN(num))
        throw new expressError(`${num} is not a valid number`, 400);
    });
    try {
      const nums = arr.map((num) => parseFloat(num));
      const result = getMean(nums);
      res.json({
        operation: "mean",
        value: result,
      });
    } catch (e) {
      next(e);
    }
  } else {
    throw new expressError("Numbers are required", 400);
  }
});

app.get("/median", (req, res) => {
  console.log(req.query);
  if (req.query["arr"]) {
    const arr = req.query.arr.split(",");
    arr.sort((a, b) => a - b);
    const checkNum = arr.forEach((num) => {
      if (isNaN(num))
        throw new expressError(`${num} is not a valid number`, 400);
    });
    try {
      const nums = arr.map((num) => parseFloat(num));
      const result = getMedian(nums);
    
      res.json({
        operation: "median",
        value: result,
      });
    } catch (e) {
        next(e);
    }
  } else {
    throw new expressError("Numbers are required", 400);
  }
});

app.get("/mode", (req, res) => {
  console.log(req.query);
  if (req.query["arr"]) {
    const arr = req.query.arr.split(",");
    const checkNum = arr.forEach((num) => {
      if (isNaN(num))
        throw new expressError(`${num} is not a valid number`, 400);
    });
    const nums = arr.map((num) => parseFloat(num));
    const result = getMode(nums);

    res.json({
      operation: "mode",
      value: result,
    });
  } else {
    throw new expressError("Numbers are required", 400);
  }
});

app.use((error, req, res, next) => {
  let status = error.status || 500;
  let message = error.message;

  return res.status(error.status).send(error.message);
});

app.listen(3000, function () {
  console.log("App on port 3000");
});

module.exports = { getMean, getMedian, getMode };

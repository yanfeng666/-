const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { Manager } = require("../../../models/index");

router.get("/", async (req, res, next) => {
  const models = await Manager.find().populate("role").sort({ _id: -1 });
  res.json(models);
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = await Manager.findById(id).populate("role");
    res.json(model);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const slat = bcrypt.genSaltSync(10);
    const pwd = bcrypt.hashSync(req.body.password, slat); // 对密码进行加密
    const model = new Manager({ ...req.body, password: pwd });
    const modelSave = await model.save();
    res.json(modelSave);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const slat = bcrypt.genSaltSync(10);
    const pwd = bcrypt.hashSync(req.body.password, slat); // 对密码进行加密
    const updateResult = await Manager.findByIdAndUpdate(id, {
      ...req.body,
      password: pwd
    });
    res.json(updateResult);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = await Manager.findById(id);
    if (model.userName == "admin") {
      res.json({
        code: 0,
        message: "超级管理员，不能删除"
      });
    } else {
      const delResult = await Manager.findByIdAndDelete(id);
      res.json(delResult);
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;

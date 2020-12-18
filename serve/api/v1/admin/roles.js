const router = require("express").Router();
const { Role } = require("../../../models/index");

router.get("/", async (req, res, next) => {
  const models = await Role.find().sort({ _id: -1 });
  res.json(models);
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const model = await Role.findById(id);
    res.json(model);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const model = new Role(req.body);
    const modelSave = await model.save();
    res.json(modelSave);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateResult = await Role.findByIdAndUpdate(id, req.body);
    res.json(updateResult);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const delResult = await Role.findByIdAndDelete(id);
    res.json(delResult);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

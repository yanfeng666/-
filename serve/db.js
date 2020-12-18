const mongoose = require("mongoose");
const { ShopCart, Product } = require("./models");

mongoose
  .connect("mongodb://localhost:27017/cat-shop", {
    useNewUrlParser: true
  })
  .then((res) => {
    // console.log(res);
    console.log("数据库连接成功");
    // Book.find({ id: "5def3ddcdf4b140e30dab5df" })
    //   .populate({
    //     path: "bookChapterCount"
    //   })
    //   .then(res => {
    //     console.log(res);
    //   });
    Product.find({}, function (err, data) {
      var arrs = data.map((item) => item.id);
      console.log(arrs);
      ShopCart.find({ product: { $in: arrs } })
        .populate("product")
        .then((d) => {
          console.log(d);
        });
    });
  })
  .catch((err) => {
    console.log(err);
  });

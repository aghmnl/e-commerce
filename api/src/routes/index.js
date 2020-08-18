const { Router } = require("express");
// import all routers;
const productRouter = require("./product.js");
const categoryRouter = require("./category.js");
const strainRouter = require("./strain.js");
const cellarRouter = require("./cellar.js");
const userRouter = require ("./user.js");
const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/strain", strainRouter);
router.use("/cellar", cellarRouter);
router.use("/user", userRouter);


module.exports = router;

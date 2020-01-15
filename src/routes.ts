import * as Express from "express";
import { UserController } from "./controllers/UserController";
import { ProductController } from "./controllers/ProductController";
import { CartController } from "./controllers/CartController";
import { ReportsController } from './controllers/ReportsController';

const router = Express.Router();
const userController = new UserController();
const productController = new ProductController();
const cartController = new CartController();
const reportsController = new ReportsController();

router.get("/users", userController.index.bind(userController));
router.get("/user/:id", userController.show.bind(userController));
router.post("/users", userController.store.bind(userController));
router.put("/user/:id", userController.update.bind(userController));
router.delete("/user/:id", userController.delete.bind(userController));

router.get("/products", productController.index.bind(productController));
router.get("/products/:query", productController.getByQuery.bind(productController));
router.get("/product/:query", productController.show.bind(productController));
router.post("/products", productController.store.bind(productController));
router.put("/product/:id", productController.update.bind(productController));
router.delete("/product/:id", productController.delete.bind(productController));

router.post('/cart', cartController.store.bind(cartController));
router.get('/reports/top', reportsController.getTopSeller.bind(reportsController));

export default router;
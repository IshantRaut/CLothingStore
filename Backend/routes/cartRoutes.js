import express from 'express'
import { addToCart } from '../controllers/cartControllers'

const cartRouter = express.Router();

cartRouter.post('/', addToCart);

export default cartRouter;
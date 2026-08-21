import { Router } from 'express';
import * as itemsController from '../controllers/itemsController';

const router = Router();

router.get('/items', itemsController.getItems);
router.get('/items/:id', itemsController.getItemById);
router.post('/items', itemsController.createItem);
router.put('/items/:id', itemsController.updateItem);
router.delete('/items/:id', itemsController.deleteItem);

export default router;
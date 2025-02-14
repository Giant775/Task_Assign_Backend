import express from 'express';
import tasksController from '../controllers/tasks.controller.js';
import { requireAuth } from '../middleware/authMiddleware.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const taskRouter = express.Router();

// Create task (admin only)
taskRouter.post('/', requireAuth, requireAdmin, tasksController.createTask);

// Get all tasks
taskRouter.get('/', requireAuth, tasksController.getTasks);

// Update task
taskRouter.patch('/:id', requireAuth, tasksController.updateTask);

// Delete task (admin only)
taskRouter.delete('/:id', requireAuth, requireAdmin, tasksController.deleteTask);

// Assign task
taskRouter.post('/:id/assign', requireAuth, tasksController.assignTask);

export default taskRouter;
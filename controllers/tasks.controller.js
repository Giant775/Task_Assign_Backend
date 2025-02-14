import Task from '../models/tasks.model.js';

class TaskController {
  async createTask(req, res) {
    const { title, description, status, dueDate, labels, assignee } = req.body;
    const user = req.currentUser;
    console.log("create task request received.")
    try {
      const task = new Task({
        title,
        description,
        status: status || 'todo',
        dueDate: dueDate ? new Date(dueDate) : undefined,
        labels: labels || [],
        createdBy: user._id,
        // assignee: assignee | null,
      });
      if(assignee)
        task.assignee = assignee;
      console.log("task in creaeTask:", task);
      await task.save();
      console.log("task saved:", task);
      req.io.emit('taskCreated', task);
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Error creating task', error: error.message });
    }
  }

  async getTasks(req, res) {
    try {
      console.log("Get Task request received.");
      const tasks = await Task.find()
        .populate({ path: "assignee", select: "name email", strictPopulate: false })
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 });
      console.log("tasks in getTasks:",tasks);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
  }

  async updateTask(req, res) {
    const { id } = req.params;
    const updates = req.body;
    const user = req.currentUser;
    const assignee = {_id: user.id};
    console.log("Update request received:");
    console.log("User in updates:", updates);
    console.log("User in req.currentUser:", user);
    try {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      // // Only admin or task creator can update
      // if (task.createdBy.toString() !== user.id) {
      //   return res.status(403).json({ message: 'Not authorized' });
      // }
      if(updates.assignee)
        updates.assignee = updates.assignee._id;
      // const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      const updatedTask = await Task.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      })
        .populate('assignee', 'name email')
        .populate('createdBy', 'name email');
      req.io.emit('taskUpdated', updatedTask);
      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: 'Error updating task', error: error.message });
    }
  }

  async deleteTask(req, res) {
    const { id } = req.params;
    const user = req.currentUser;

    try {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      // Only admin or task creator can delete
      if (user.grade !== 0 && task.createdBy.toString() !== user.id) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      await Task.findByIdAndDelete(id);
      req.io.emit('taskDeleted', id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task', error: error.message });
    }
  }

  async assignTask(req, res) {
    const { id } = req.params;
    const { assignee } = req.body;
    const user = req.currentUser;

    try {
      const task = await Task.findById(id);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      // Only admin or task creator can assign
      if (user.grade !== 0 && task.createdBy.toString() !== user.id) {
        return res.status(403).json({ message: 'Not authorized' });
      }

      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { assignee },
        { new: true }
      )
        .populate('assignee', 'name email')
        .populate('createdBy', 'name email');

      res.json(updatedTask);
    } catch (error) {
      res.status(500).json({ message: 'Error assigning task', error: error.message });
    }
  }
}

export default new TaskController();

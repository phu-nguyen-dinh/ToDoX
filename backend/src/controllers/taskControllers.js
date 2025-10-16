import Task from "../models/Task.js";

export const getAllTasks = async (req, res) => {
    try {
        const result = await Task.aggregate([
        {
            $facet: {
            tasks: [{ $sort: { createdAt: -1 } }],
            activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
            completeCount: [{ $match: { status: "completed" } }, { $count: "count" }],
            },
        },
        ]);

        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completeCount = result[0].completeCount[0]?.count || 0;

        res.status(200).json({ tasks, activeCount, completeCount });
    } catch (error) {
        console.error("Failed to get all tasks: ", error);
        res.status(500).json({message: "Server error"});
    }
};

export const createTask = async (req, res) => {
    try {
        const {title} = req.body;
        const task = new Task({title});
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Failed to create a new task: ", error);
        res.status(500).json({message: "Server error"});
    }
};

export const updateTask = async (req, res) => {
    try {
        const {title, status, completedAt} = req.body;
        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                title,
                status,
                completedAt
            },
            {new: true}
        );
        if(!updateTask){
            res.status(404).json({message: "Task does not exist"});
        }
        res.status(200).json(updateTask);
    } catch (error) {
        console.error("Failed to create a new task: ", error);
        res.status(500).json({message: "Server error"});
    }
};

export const deleteTask = async (req, res) => {
    try {
        const deleteTask = await Task.findByIdAndDelete(req.params.id);
        if(!deleteTask){
            res.status(404).json({message: "Task does not exist"});
        }
        res.status(200).json({deleteTask});
    } catch (error) {
        console.error("Failed to create a new task: ", error);
        res.status(500).json({message: "Server error"});
    }
};
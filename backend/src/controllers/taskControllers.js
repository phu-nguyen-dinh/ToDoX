export const getAllTasks = (req, res) => {
    res.status(200).send("get")
};

export const createTask = (req, res) => {
    res.status(201).json({message: "post"});
};

export const updateTask = (req, res) => {
    res.status(200).json({message: "put"});
};

export const deleteTask = (req, res) => {
    res.status(200).json({message: "delete"});
};
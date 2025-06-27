import mongoose from "mongoose";

const { Schema, model } = mongoose;

const todoSchema = new Schema(
	{
		id: {
			type: mongoose.Schema.Types.ObjectId,
			auto: true,
		},
		text: {
			type: String,
			required: true,
		},
		completed: {
			type: Boolean,
			default: false,
		},
	},
	{
		collection: "todo",
	},
);

//! Check if model already exists before creating it
const Todo = mongoose.models.Todo || model("Todo", todoSchema);

export { Todo };

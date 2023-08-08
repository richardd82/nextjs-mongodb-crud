import { Schema, model, models } from "mongoose";

const taskSchema = new Schema({
    title:{
        type: String,
        required: [true, 'El titulo es requerido'],
        unique: true,
        trim: true,        
    },
    description:{
        type: String,
        required: [true, 'La descripción es requerida'],
        trim: true,
    }   
}, {
    timestamps: true,
})

export default models.Task || model('Task', taskSchema) //Si ya existe el modelo lo usa, si no lo crea
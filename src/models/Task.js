import {Schema, model, models} from 'mongoose'

const taskSchema = new Schema ({
    title: {
        type: String,
        required: [true, 'Title is required'],
        unique: true,
        trim: true,
        maxlegth: [40, 'Ttile must be less than 40 characters']
    },
    description: {
        type: String,
        required: true,
        trim: true,
        maxlegth: [200, 'Description must be less than 200 characters']
    }
}, 
{
        timestamps: true,
        versionKey: false
}
);

export default models.Task || model('Task', taskSchema);
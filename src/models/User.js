import {Schema, model, models} from 'mongoose'

const userSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'name is required'],
        unique: true,
        trim: true,
        maxlegth: [40, 'name must be less than 40 characters']
    },
}, 
{
        timestamps: true,
        versionKey: false
}
);

export default models.User || model('User', userSchema);
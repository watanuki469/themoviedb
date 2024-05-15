import mongoose, {Schema, Document, Model} from "mongoose";

type NotesType = Document & {
    title: string;
    note: string
}

const notesSchema: Schema<NotesType> = new Schema({
    title: String,
    note: String
})

const Notes2: Model<NotesType> = mongoose.model<NotesType>('Note6', notesSchema);

export default Notes2
// src/models/Team.ts
import mongoose, { Document, Schema } from 'mongoose';

interface ITeam extends Document {
  name: string;
  players: string[];
}

const TeamSchema: Schema = new Schema({
  name: { type: String, required: true },
  players: { type: [String]},
});

export default mongoose.models.Team || mongoose.model<ITeam>('Team', TeamSchema);

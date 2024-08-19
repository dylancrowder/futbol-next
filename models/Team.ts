import mongoose, { Document, Schema } from "mongoose";

// Define el esquema para un jugador
const PlayerSchema: Schema = new Schema({
  player_name: { type: String, required: true },
  player_id: { type: String, required: true },
  player_image: { type: String },
  player_country: { type: String },
  player_age: { type: String },
});

// Define el esquema para un equipo
const TeamSchema: Schema = new Schema({
  name: { type: String, required: true },
  players: { type: [PlayerSchema], default: [] },
});

interface IPlayer {
  player_name: string;
  player_id: string;
  player_image?: string;
  player_country?: string;
  player_age?: string;
}

interface ITeam extends Document {
  name: string;
  players: IPlayer[];
}

export default mongoose.models.Team ||
  mongoose.model<ITeam>("Team", TeamSchema);

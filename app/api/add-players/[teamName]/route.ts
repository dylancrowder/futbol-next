import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Team from "@/models/Team";

// Define tipos para los parámetros de la función POST
interface Params {
  teamName: string;
}

interface Player {
  player_name: string;
  player_id: string;
  player_image?: string;
  player_country?: string;
  player_age?: string;
}

export async function POST(request: Request, { params }: { params: Params }) {
  try {
    await dbConnect();
   
    const newPlayer: Player = await request.json();

    
    console.log("este es el player", newPlayer);


    // Busca el equipo por el nombre proporcionado en los parámetros
    const team = await Team.findOne({ name: params.teamName }).exec();

    if (!team) {
      return NextResponse.json({
        message: `No se encontró el equipo con el nombre ${params.teamName}`,
      });
    }

    // Verifica si el equipo ya tiene 5 jugadores
    if (team.players.length >= 5) {
      return NextResponse.json({
        message: `El equipo ${params.teamName} ya tiene 5 jugadores.`,
      });
    }

    // Agrega el nuevo jugador al array de jugadores del equipo
    team.players.push(newPlayer);

    // Guarda los cambios en el equipo
    await team.save();

    return NextResponse.json({
      message: `Jugador añadido al equipo ${params.teamName}`,
      team,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: "Ocurrió un error al añadir el jugador.",
      error: error.message,
    });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Team from "@/models/Team";

interface Params {
  teamName: string;
}

interface Player {
  name: string;
  position?: string;
}

export async function POST(req: NextRequest, { params }: { params: Params }) {
  await dbConnect();

  try {
    const newPlayer: Player = await req.json();
    console.log("este es el player", newPlayer);

    const team = await Team.findOne({ name: params.teamName }).exec();

    if (!team) {
      return NextResponse.json({
        message: `No se encontró el equipo con el nombre ${params.teamName}`,
      });
    }

    if (team.players.length >= 5) {
      return NextResponse.json({
        message: `El equipo ${params.teamName} ya tiene 5 jugadores.`,
      });
    }

    team.players.push(newPlayer);

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

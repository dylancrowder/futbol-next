import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Team from "@/models/Team";

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

    const team = await Team.findOne({ name: params.teamName }).exec();

    if (!team) {
      return NextResponse.json(
        {
          message: `No se encontró el equipo con el nombre ${params.teamName}`,
        },
        { status: 404 }
      );
    }

    if (team.players.length >= 5) {
      return NextResponse.json(
        {
          message: `El equipo ${params.teamName} ya tiene 5 jugadores.`,
        },
        { status: 400 }
      );
    }

    const playerExists = team.players.some(
      (player: { player_id: string }) =>
        player.player_id === newPlayer.player_id
    );

    if (playerExists) {
      return NextResponse.json(
        {
          message: `El jugador ${newPlayer.player_name} ya está en el equipo ${params.teamName}.`,
        },
        { status: 409 }
      );
    }

    team.players.push(newPlayer);

    await team.save();

    return NextResponse.json(
      {
        message: `Jugador añadido al equipo ${params.teamName}`,
        team,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Ocurrió un error al añadir el jugador.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

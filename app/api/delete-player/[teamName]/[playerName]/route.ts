import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Team from "@/models/Team";

interface Params {
  teamName: string;
  playerName: string;
}

export async function DELETE(request: Request, { params }: { params: Params }) {
  try {
    await dbConnect();

    const { playerName } = params;
    console.log("este es el player del delete", playerName);
    console.log("este es el param", params);

    const team = await Team.findOne({ name: params.teamName }).exec();

    if (!team) {
      return NextResponse.json({
        message: `No se encontró el equipo con el nombre ${params.teamName}`,
      });
    }

    const playerIndex = team.players.findIndex(
      (player: { player_name: string }) => player.player_name === playerName
    );

    if (playerIndex === -1) {
      return NextResponse.json({
        message: `No se encontró el jugador ${playerName} en el equipo ${params.teamName}.`,
      });
    }

    team.players.splice(playerIndex, 1);

    await team.save();

    return NextResponse.json({
      message: `Jugador ${playerName} eliminado del equipo ${params.teamName}`,
      team,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      message: "Ocurrió un error al eliminar el jugador.",
      error: error.message,
    });
  }
}

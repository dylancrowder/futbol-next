import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Team from "@/models/Team";

interface Params {
  teamName: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Params }
) {
  await dbConnect();

  try {
    const team = await Team.findOne({ name: params.teamName }).exec();

    if (!team) {
      return NextResponse.json(
        { message: "Equipo no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(team, { status: 200 });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      { message: "Error al recuperar el equipo", error: error.message },
      { status: 500 }
    );
  }
}

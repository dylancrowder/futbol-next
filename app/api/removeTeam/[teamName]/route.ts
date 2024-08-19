import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Team from "@/models/Team";

interface Params {
  teamName: string;
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  await dbConnect();

  try {
    const { teamName } = params;

    const existingTeam = await Team.findOne({ name: teamName }).exec();
    if (!existingTeam) {
      return NextResponse.json(
        { message: "Equipo no encontrado" },
        { status: 404 }
      );
    }

    await Team.deleteOne({ name: teamName });

    return NextResponse.json(
      { message: "Equipo eliminado correctamente" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error al eliminar el equipo",
        error: error.message,
      },
      { status: 400 }
    );
  }
}

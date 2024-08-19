import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Team from "@/models/Team";

interface Params {
  teamName: string;
}

// Maneja la actualización del nombre de un equipo
export async function PUT(req: NextRequest, { params }: { params: Params }) {
  await dbConnect();

  try {
    const body = await req.json();
    const { teamName } = params;

    // Buscar el equipo por su nombre
    const existingTeam = await Team.findOne({ name: teamName }).exec();
    if (!existingTeam) {
      return NextResponse.json(
        { message: "Equipo no encontrado" },
        { status: 404 }
      );
    }

    // Actualizar el nombre del equipo
    existingTeam.name = body.name;
    await existingTeam.save();

    return NextResponse.json(existingTeam, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error al actualizar el nombre del equipo",
        error: error.message,
      },
      { status: 400 }
    );
  }
}

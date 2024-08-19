import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Team from "@/models/Team";

interface Params {
  teamName: string;
}


export async function PUT(req: NextRequest, { params }: { params: Params }) {
  await dbConnect();

  try {
    const body = await req.json();
    const { teamName } = params;
    const { newName } = body;

   
    const existingTeam = await Team.findOne({ name: teamName }).exec();
    if (!existingTeam) {
      return NextResponse.json(
        { message: "Equipo no encontrado" },
        { status: 404 }
      );
    }

  
    const teamWithNewName = await Team.findOne({ name: newName }).exec();
    if (teamWithNewName && teamWithNewName.name !== teamName) {
      return NextResponse.json(
        { message: "El nombre del equipo ya está en uso" },
        { status: 400 }
      );
    }


    existingTeam.name = newName;
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

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Team from "@/models/Team";

// Maneja la creación de un equipo
export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const body = await req.json();
    console.log(body);

    // Verificar si el nombre del equipo ya existe
    const existingTeam = await Team.findOne({ name: body.name }).exec();
    if (existingTeam) {
      return NextResponse.json(
        { message: `El equipo con el nombre ${body.name} ya existe` },
        { status: 400 }
      );
    }

    // Contar el número actual de equipos
    const teamCount = await Team.countDocuments();

    // Verificar si ya hay dos equipos
    if (teamCount >= 2) {
      return NextResponse.json(
        { message: "No se pueden crear más de dos equipos" },
        { status: 400 }
      );
    }

    // Crear y guardar el nuevo equipo
    const team = new Team(body);
    await team.save();
    return NextResponse.json(team, { status: 201 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al crear el equipo", error: error.message },
      { status: 400 }
    );
  }
}

// Maneja la obtención de los equipos
export async function GET() {
  await dbConnect();

  try {
    // Obtener los dos equipos de la base de datos
    const teams = await Team.find().limit(2);
    return NextResponse.json(teams, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al recuperar los equipos", error: error.message },
      { status: 500 }
    );
  }
}

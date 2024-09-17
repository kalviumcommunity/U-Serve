import {NextResponse} from "next/server";
import { ConnectDb } from "../../lib/config/db";

const LoadDB = async()=>{
    await ConnectDb();
}

LoadDB();

export async function GET(){
    return NextResponse.json({msg:"get method hit"})

}
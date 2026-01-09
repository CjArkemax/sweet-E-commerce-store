import {neon} from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();


const{PGHOST,PGDATABASE,PGUSER,PGPASSWORD} = process.env;

//create SQL connection  using env variables

export const sql = neon(`postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`)

//this sql function we export is used as tagged template literal,which allow us to write sql queries safely
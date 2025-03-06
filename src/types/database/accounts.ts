import { Database } from "../../../database.types";

export type AccountRow = Database["public"]["Tables"]["accounts"]["Row"];
export type AccountInsert = Database["public"]["Tables"]["accounts"]["Insert"];
export type AccountUpdate = Database["public"]["Tables"]["accounts"]["Update"];

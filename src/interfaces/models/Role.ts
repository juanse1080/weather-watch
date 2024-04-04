import { Action } from "@prisma/client";

export interface RolePrisma {
  code: string;
  actions: Action[];
}

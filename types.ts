//types.ts

import {ObjectId } from "mongodb"


export type Personas = {
    id: string;
    name: string;
    email: string;
    telefono: string;
    amigos: Personas[];
};
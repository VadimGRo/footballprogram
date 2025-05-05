import { z } from "zod";
export const TeamSchema = z.object({
    id: z.number(),
    name: z.string(),
    shortName: z.string(),
    tla: z.string(),
    crest: z.string(),
});
export const PlayerSchema = z.object({
    id: z.number(),
    name: z.string(),
    position: z.string().optional(),
    dateOfBirth: z.string(),
    nationality: z.string() 
});
export const TeamsSchema = z.object({
    teams: z.array(TeamSchema),
});
export const TeamDetailSchema = z.object({
    squad: z.array(PlayerSchema),
});
export const ResultSetSchema = z.object({
    played: z.number(),
    wins: z.number(),
    losses: z.number(),
    draws: z.number(),
});
export const TeamMatchSchema = z.object({
    resultSet: ResultSetSchema.optional(),
});

import { TeamsSchema, TeamDetailSchema, TeamMatchSchema, PlayerSchema } from "./schemas";

const url = "https://api.football-data.org/v4/teams/";
const TOKEN = process.env.tOKEN;

class ApiManager {
    constructor() {}

    async getData() {
        const response = await fetch(url, {
            headers: {
                "X-Auth-Token": TOKEN as string,
            },
        });

        const json = await response.json();
        return TeamsSchema.parse(json);
    }

    async getTeamNames() {
        const data = await this.getData();
        return data.teams.map((team) => team.name);
    }

    async getTeamDataByName(teamName: string) {
        const data = await this.getData();
        const team = data.teams.find((team) => team.name === teamName);
        if (!team) throw new Error("Team not found");
        return team;
    }

    async getPlayers(teamId: number) {
        const response = await fetch(`${url}${teamId}`, {
            headers: {
                "X-Auth-Token": TOKEN as string,
            },
        });
    
        const teamData = await response.json();
        const parsed = TeamDetailSchema.parse(teamData);
        if (parsed.squad && Array.isArray(parsed.squad)) {
            return parsed.squad;
        } else {
            return [];
        }
    }
    
    

    async getTeamStatistics(teamId: number) {
        const response = await fetch(`${url}${teamId}/matches`, {
            headers: {
                "X-Auth-Token": TOKEN as string,
            },
        });

        const json = await response.json();
        const parsed = TeamMatchSchema.parse(json);
        return parsed.resultSet;
    }
}

export const apiManager = new ApiManager();

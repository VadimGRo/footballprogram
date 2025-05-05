import inquirer from "inquirer";
import { config } from "dotenv";
config({ path: ".env.local" });
import ora from "ora";

import { apiManager } from "./apimanager";

const spinner = ora("Loading");

async function getTeamNames(): Promise<void> {
        spinner.start();
        const teamNames = await apiManager.getTeamNames();
        spinner.stop();
        console.log("\nTeam names:");
        teamNames.forEach((name) => console.log(name));
   
}

async function getTeamInfo(): Promise<void> {
        spinner.start();
        const data = await apiManager.getData();
        spinner.stop();
        const answers = await inquirer.prompt([
            {
                type: "list",
                name: "choose",
                message: "About what team do you want to know information?\n",
                choices: data.teams.map((team) => team.name),
            },
        ]);

        const team = await apiManager.getTeamDataByName(answers.choose);
        console.log("\nInformation about your team:");
        console.log(`id: ${team.id}`);
        console.log(`name: ${team.name}`);
        console.log(`shortName: ${team.shortName}`);
        console.log(`tla: ${team.tla}`);
        console.log(`crest: ${team.crest}`);
    
}

async function getPlayers(): Promise<void> {
        spinner.start();
        const data = await apiManager.getData();
        spinner.stop();
        const answers = await inquirer.prompt([
            {
                type: "list",
                name: "choose",
                message: "Choose a team to view its players:\n",
                choices: data.teams.map((team) => ({
                    name: team.name,
                    value: team.id,
                })),
            },
        ]);

        spinner.start();
        const players = await apiManager.getPlayers(answers.choose);
        spinner.stop();

        console.log("\nPlayers of the team:");
        players.forEach((player: any) => {
            console.log(`${player.name} - ${player.position}`);
        });
    
}

async function getTeamStatistics(): Promise<void> {
        spinner.start();
        const data = await apiManager.getData();
        spinner.stop();
        const answers = await inquirer.prompt([
            {
                type: "list",
                name: "choose",
                message: "Choose a team to view its statistics:\n",
                choices: data.teams.map((team) => ({
                    name: team.name,
                    value: team.id,
                })),
            },
        ]);

        spinner.start();
        const stats = await apiManager.getTeamStatistics(answers.choose);
        spinner.stop();

        if (stats) {
            console.log("\nTeam statistics:");
            console.log(`Matches: ${stats.played}`);
            console.log(`Wins: ${stats.wins}`);
            console.log(`Losses: ${stats.losses}`);
            console.log(`Draws: ${stats.draws}`);
        } else {
            console.log("No statistics found.");
        }
     
}

async function promptUser(): Promise<void> {
        const answers = await inquirer.prompt([
            {
                type: "list",
                name: "action",
                message: "What do you want to do?",
                choices: [
                    "Team names",
                    "Information about teams",
                    "Players from the team",
                    "Statistic of the team",
                    "Exit",
                ],
            },
        ]);

        switch (answers.action) {
            case "Team names":
                await getTeamNames();
                break;
            case "Information about teams":
                await getTeamInfo();
                break;
            case "Players from the team":
                await getPlayers();
                break;
            case "Statistic of the team":
                await getTeamStatistics();
                break;
            case "Exit":
                console.log("Goodbye!");
                process.exit(0);
        }
}

promptUser();

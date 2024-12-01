import { DependencyContainer } from "tsyringe";

import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";

class Mod implements IPreSptLoadMod, IPostDBLoadMod 
{
    private static container: DependencyContainer;

    public preSptLoad(container: DependencyContainer): void
    {
        // QUESTS
        // Save depedency container to resolve dependencies later
        Mod.container = container;

        //  Override method and always return false
        container.afterResolution("RepeatableQuestController", (_t, result: any) =>
        {
            result.playerHasDailyScavQuestsUnlocked = () =>
            {
                return false
            }
        }, {frequency: "Always"});
    }



    public postDBLoad(container: DependencyContainer): void 
    {
        // HIDEOUT
        // Get database from server
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");

        // Get all the in-memory json found in /assets/database
        const tables: IDatabaseTables = databaseServer.getTables();

        // Get intel centre hideout area and shift bounus arrays
        for (const val of tables.hideout.areas) 
        {
            if (val._id == "5d484fdf654e7600691aadf8")
            {
                for (const stage in val.stages)
                {
                    if (Number(stage) % 2 == 1)
                    {
                        val.stages[stage].bonuses.shift()
                    }
                }
                break;
            }
        }

    }
}

export const mod = new Mod();

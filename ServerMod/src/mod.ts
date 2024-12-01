import { DependencyContainer } from "tsyringe";

import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IDatabaseTables } from "@spt/models/spt/server/IDatabaseTables";

class Mod implements IPostDBLoadMod 
{
    public postDBLoad(container: DependencyContainer): void 
    {
        // get database from server
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");

        // Get all the in-memory json found in /assets/database
        const tables: IDatabaseTables = databaseServer.getTables();

        // ----------------------------------------------------------
        // Get intelCentre hideout area from Id
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

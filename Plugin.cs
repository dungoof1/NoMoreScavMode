using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BepInEx.Logging;
using BepInEx;

namespace NoMoreScavMode
{
    [BepInPlugin("dev.dungoof.NoMoreScav", "NoMoreScav", "1.0.0")]
    public class Plugin : BaseUnityPlugin
    {
        public void Awake()
        {
            Plugin.LogSource = base.Logger;
            Plugin.LogSource.LogInfo("NoMoreScav enabled.");
            new NoScavButtonPatch().Enable();
        }
        public static ManualLogSource LogSource;
    }
}

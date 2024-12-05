using BepInEx.Logging;
using BepInEx;
using NoMoreScavMode.Patches;

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

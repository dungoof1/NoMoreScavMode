using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using EFT.UI.Matchmaker;
using HarmonyLib;
using SPT.Reflection.Patching;
using UnityEngine.UI;
using UnityEngine;

namespace NoMoreScavMode.Patches
{
    internal class NoScavButtonPatch : ModulePatch
    {
        protected override MethodBase GetTargetMethod()
        {
            return AccessTools.Method(typeof(MatchMakerSideSelectionScreen), "Awake");
        }
        [PatchPostfix]
        private static void Postfix(MatchMakerSideSelectionScreen __instance, Button ____savagesBigButton, Button ____pmcBigButton)
        {
            ____savagesBigButton.transform.parent.gameObject.SetActive(false);
            ____pmcBigButton.transform.parent.transform.localPosition = new Vector3(-220f, 520f, 0f);
        }
    }
}

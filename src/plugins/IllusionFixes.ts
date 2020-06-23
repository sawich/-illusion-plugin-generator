import { PackageBuilder, PluginGameType, PluginResolver } from "../package-builder";

import { GitPartialPluginBuilder } from "../plugin-builder";

export class IllusionFixesBuilder extends GitPartialPluginBuilder {
  public build() {
    this.addCameraTarget();
    this.addCardImport();
    this.addCharacterListOptimizations();
    this.addCenteredHSceneCursor();
    this.addDownloadRenamer();
    this.addExpandShaderDropdown();
    this.addHeterochromiaFix();
    this.addInvalidSceneFileProtection();
    this.addLoadingFixes();
    this.addMainGameOptimizations();
    this.addMakerOptimizations();
    this.addManifestCorrector();
    this.addModdedHeadEyeliner();
    this.addNewGameShowAllCards();
    this.addNodeEditorUnlock();
    this.addNullChecks();
    this.addPartyCardCompatibility();
    this.addPersonalityCorrector();
    this.addPoseLoad();
    this.addResourceUnloadOptimizations();
    this.addSettingsVerifier();
    this.addShowerAccessories();
    this.addUnlimitedMapLights();
  }

  public constructor(builder: PackageBuilder) {
    super(builder, "https://github.com/IllusionMods/IllusionFixes");
  }

  private addCameraTarget() {
    const lang = this.builder.lang(
      "CameraTargetFix",
      "Hides the cursor when the camera target is disabled in Studio. In AI Girl, also makes the camera target option in the game settings work properly for the character maker"
    );
    this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_Fix_CameraTarget");
    this.plugin.addProject(lang, [PluginGameType.PH], PluginResolver.VSCSP, "PH_Fix_CameraTarget");
    this.plugin.addProject(lang, [PluginGameType.AI], PluginResolver.VSCSP, "AI_Fix_CameraTarget");
    this.plugin.addProject(lang, [PluginGameType.HS2], PluginResolver.VSCSP, "HS2_Fix_CameraTarget");
  }

  private addCardImport() {
    // const lang = this.builder.lang("CardImport", "Prevents the game from crashing or stripping some modded data when importing KK cards");
  }

  private addCharacterListOptimizations() {
    const lang = this.builder.lang("CharacterListOptimizations", "Makes character lists load faster");
    this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_Fix_CharacterListOptimizations");
  }

  private addCenteredHSceneCursor() {
    const lang = this.builder.lang(
      "CenteredHSceneCursor",
      "Fixes the cursor texture not being properly centeres in H scenes, so it's easier to click on things"
    );
    this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_Fix_CenteredHSceneCursor");
  }

  private addDownloadRenamer() {
    // const lang = this.builder.lang("DownloadRenamer", "Maps, scenes, poses, and characters downloaded in game will have their file names changed to match the ones on the Illusion website");
  }

  private addExpandShaderDropdown() {
    const lang = this.builder.lang(
      "ExpandShaderDropdown",
      "Makes the shader drop down menu extend down instaed of up and expands it. Necessary to select modded shaders since they run off the screen by default"
    );
    this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_Fix_ExpandShaderDropdown");
  }

  private addHeterochromiaFix() {
    const lang = this.builder.lang(
      "HeterochromiaFix",
      "Allows you to load characters with different iris types without them being reset"
    );
    this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_Fix_HeterochromiaFix");
  }

  private addInvalidSceneFileProtection() {
    const lang = this.builder.lang(
      "InvalidSceneFileProtection",
      "Adds error handling to scene loading and importing. If a scene is invalid or from the wrong game version then a message is shown and the studio doesn't crash"
    );
    this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_Fix_InvalidSceneFileProtection");
    this.plugin.addProject(lang, [PluginGameType.AI], PluginResolver.VSCSP, "AI_Fix_InvalidSceneFileProtection");
  }

  private addLoadingFixes() {
    const lang = this.builder.lang(
      "LoadingFixes",
      "Fixes some studio scenes failing to load (sometimes you can't load the scene you've just saved with the stock game, many scenes on uploader are like this). Also fixes color picker breaking in maker because of a similar issue"
    );
    this.plugin.addProject(lang, [PluginGameType.AI], PluginResolver.VSCSP, "AI_Fix_LoadingFixes");
    this.plugin.addProject(lang, [PluginGameType.HS2], PluginResolver.VSCSP, "HS2_Fix_LoadingFixes");
  }

  private addMainGameOptimizations() {
    const lang = this.builder.lang(
      "MainGameOptimizations",
      "Multiple performance optimizations for the story mode. Aimed to reduce stutter and random FPS drops"
    );
    this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_Fix_MainGameOptimizations");
  }

  private addMakerOptimizations() {
    const lang = this.builder.lang(
      "MakerOptimizations",
      "Multiple performance optimizations for the character maker. Can greatly increase FPSMultiple performance optimizations for the character maker. Can greatly increase FPS, makes turning on/off the interface in maker by pressing space much faster (after the 1st press), and more"
    );
    this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_Fix_MakerOptimizations");
  }

  private addManifestCorrector() {
    const lang = this.builder.lang(
      "ManifestCorrector",
      "Prevents mods that use incorrect data in the MainManifest column of item lists from locking up the game in story mode"
    );
    this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_Fix_ManifestCorrector");
    this.plugin.addProject(lang, [PluginGameType.AI], PluginResolver.VSCSP, "AI_Fix_ManifestCorrector");
    this.plugin.addProject(lang, [PluginGameType.HS2], PluginResolver.VSCSP, "HS2_Fix_ManifestCorrector");
  }

  private addModdedHeadEyeliner() {
    const lang = this.builder.lang(
      "ModdedHeadEyeliner",
      "Fixes modded head eyeliners not working on other head types than default"
    );
    this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_Fix_ModdedHeadEyeliner");
  }

  private addNewGameShowAllCards() {
    const lang = this.builder.lang(
      "NewGameShowAllCards",
      "Fixes downloaded character cards not appearing in the New Game character selection (so you don't have to go to maker and re-save them)"
    );
    this.plugin.addProject(lang, [PluginGameType.AI], PluginResolver.VSCSP, "AI_Fix_NewGameShowAllCards");
  }

  private addNodeEditorUnlock() {
    // const lang = this.builder.lang("NodeEditorUnlock", "");
  }

  private addNullChecks() {
    const lang = this.builder.lang("NullChecks", "Fixes for some questionably made mods causing issues");
    this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_Fix_NullChecks");
    this.plugin.addProject(lang, [PluginGameType.AI], PluginResolver.VSCSP, "AI_Fix_NullChecks");
    this.plugin.addProject(lang, [PluginGameType.HS2], PluginResolver.VSCSP, "HS2_Fix_NullChecks");
  }

  private addPartyCardCompatibility() {
    const lang = this.builder.lang(
      "PartyCardCompatibility",
      "Allows loading of cards saved in Koikatsu Party (Steam release) in Koikatu and Studio"
    );
    this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_Fix_PartyCardCompatibility");
  }

  private addPersonalityCorrector() {
    const lang = this.builder.lang(
      "PersonalityCorrector",
      "Prevents cards with invalid or missing personalities from crashing the game. A default personality is set instead"
    );
    this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_Fix_PersonalityCorrector");
  }

  private addPoseLoad() {
    const lang = this.builder.lang("PoseLoad", "Corrects Honey Select poses loaded in Koikatsu and prevents errors");
    this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_Fix_PoseLoad");
    this.plugin.addProject(lang, [PluginGameType.AI], PluginResolver.VSCSP, "AI_Fix_PoseLoad");
    this.plugin.addProject(lang, [PluginGameType.HS2], PluginResolver.VSCSP, "HS2_Fix_PoseLoad");
  }

  private addResourceUnloadOptimizations() {
    const lang = this.builder.lang(
      "ResourceUnloadOptimizations",
      'Improves loading times and eliminates stutter after loading was "finished"'
    );
    this.plugin.addProject(lang, [PluginGameType.PH], PluginResolver.VSCSP, "PH_Fix_ResourceUnloadOptimizations");
    this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_Fix_ResourceUnloadOptimizations");
    this.plugin.addProject(lang, [PluginGameType.HS1], PluginResolver.VSCSP, "HS_Fix_ResourceUnloadOptimizations");
    this.plugin.addProject(lang, [PluginGameType.AI], PluginResolver.VSCSP, "AI_Fix_ResourceUnloadOptimizations");
    this.plugin.addProject(lang, [PluginGameType.HS2], PluginResolver.VSCSP, "HS2_Fix_ResourceUnloadOptimizations");
  }

  private addSettingsVerifier() {
    const lang = this.builder.lang(
      "SettingsVerifier",
      "Prevents corrupted setting from causing issues and forces studio to use the settings.xml file instead of registry"
    );
    this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_Fix_SettingsVerifier");
    this.plugin.addProject(lang, [PluginGameType.AI], PluginResolver.VSCSP, "AI_Fix_SettingsVerifier");
    this.plugin.addProject(lang, [PluginGameType.HS2], PluginResolver.VSCSP, "HS2_Fix_SettingsVerifier");
  }

  private addShowerAccessories() {
    const lang = this.builder.lang(
      "ShowerAccessories",
      "Prevents accessories from being removed in shower peeping mode. No more gaping holes in the head when using hair accessories"
    );
    this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_Fix_ShowerAccessories");
  }

  private addUnlimitedMapLights() {
    const lang = this.builder.lang(
      "UnlimitedMapLights",
      "Allows using an unlimited amount of map lights in studio. Not all items support more than 3 lights"
    );
    this.plugin.addProject(lang, [PluginGameType.KK], PluginResolver.VSCSP, "KK_Fix_UnlimitedMapLights");
  }
}

// https://youtu.be/oZ_hW1E3q74?list=RDMMZJ__TExqiQk

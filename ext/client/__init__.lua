require('config')
require('CachedJsExecutor')
require('__shared/utils')

local CompassClient = class('CompassClient')

function CompassClient:__init()
  self:RegisterVars()
  self:RegisterEvents()
end

function CompassClient:RegisterVars()
  self.uiEnabled = CachedJsExecutor('vext.enable(%s)', false)
  self.uiYaw = CachedJsExecutor('vext.setYaw(%s)', 0)

  self.isHudOn = false
  self.isKillScreen = false
end

function CompassClient:RegisterEvents()
  Events:Subscribe('Extension:Loaded', self, self.OnExtensionLoaded)
  Events:Subscribe('UI:DrawHud', self, self.OnDrawHud)
  Events:Subscribe('Level:Loaded', self, self.ResetVars)
  Events:Subscribe('Level:Destroy', self, self.ResetVars)
  Events:Subscribe('Compass:Config', self, self.OnConfigReceived)

  Hooks:Install('UI:PushScreen', 999, self, self.OnPushScreen)
  NetEvents:Subscribe('Compass:Config-Net', self, self.OnConfigReceived)
end

function CompassClient:ResetVars()
  self.isHudOn = false
  self.isKillScreen = false
end

-- Validates and syncs config options with the WebUI
function CompassClient:SyncConfig()
  -- position
  if not IsValidConfigValue('position', Config.position) then
    Config.position = 'top'
  end
  WebUI:ExecuteJS(string.format('vext.setBottom(%s)', tostring(Config.position == 'bottom')))

  -- indicator
  if not IsValidConfigValue('indicator', Config.indicator) then
    Config.indicator = 'arrow'
  end
  WebUI:ExecuteJS(string.format('vext.setIndicator("%s")', Config.indicator))

  -- showDegrees
  Config.showDegrees = not (not Config.showDegrees)
  WebUI:ExecuteJS(string.format('vext.showDegrees(%s)', tostring(Config.showDegrees)))
end

-- Validates & syncs the config options that are received from other mods or RCON
function CompassClient:OnConfigReceived(userConfig)
  -- validate each passed option
  for option, value in pairs(userConfig) do
    if IsValidConfigValue(option, value) then
      Config[option] = value
    end
  end

  self:SyncConfig()
end

function CompassClient:OnExtensionLoaded()
  WebUI:Init()
  self:SyncConfig()
end

function CompassClient:OnDrawHud()
  -- get player
  local player = PlayerManager:GetLocalPlayer()

  if player == nil or (player.soldier == nil and player.corpse == nil) then
    self.uiEnabled:Update(false)
    return
  end

  if self.isHudOn then
    self.uiEnabled:Update(not self.isKillScreen)

    -- get yaw
    local camera = ClientUtils:GetCameraTransform()
    local yawRad = YawFromForward(camera.forward)

    -- convert to degrees and display it
    self.uiYaw:Update(rad2deg(yawRad))
  else
    self.uiEnabled:Update(false)
  end
end

function CompassClient:OnPushScreen(hook, screen, graphPriority, parentGraph)
  local screen = UIGraphAsset(screen)

  -- only for debug
  if g_IsDebug then
    print(screen.name)

    if screen.name == 'UI/Flow/Screen/PreRoundWaitingScreen' then
      hook:Return(nil)
    end
  end

  if screen.name == 'UI/Flow/Screen/HudMPScreen' then
    self.uiEnabled:Update(true)
    self.isHudOn = true
  end

  if screen.name == 'UI/Flow/Screen/KillScreen' then
    self.isKillScreen = true
  end

  if screen.name == 'UI/Flow/Screen/IngameMenuMP' then
    self.uiEnabled:Update(false)
    self.isHudOn = false
  end

  if screen.name == 'UI/Flow/Screen/SpawnScreenPC' then
    self.uiEnabled:Update(false)
    self.isHudOn = false
    self.isKillScreen = false
  end
end

CompassClient()

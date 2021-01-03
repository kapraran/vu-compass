require('config')
require('ui')
require('utils')
require('__shared/utils')

-- syncs the config options with the UI
function SyncConfig()
  -- position
  local isBottom = false
  if Config.position == 'bottom' then
    isBottom = true
  end
  WebUI:ExecuteJS(string.format('vext.setBottom(%s)', tostring(isBottom)))

  -- indicator
  local indicator = 'arrow'
  if Config.indicator == 'needle' then
    indicator = 'needle'
  end
  WebUI:ExecuteJS(string.format('vext.setIndicator("%s")', indicator))

  -- showDegrees
  local showDegrees = not (not Config.showDegrees)
  WebUI:ExecuteJS(string.format('vext.showDegrees(%s)', tostring(showDegrees)))
end

-- syncs the config options that are received from 
-- other mods or RCON
function OnConfigReceived(userConfig)
  for option, value in pairs(userConfig) do
    if IsValidConfigValue(option, value) then
      Config[option] = value
    end
  end

  SyncConfig()
end

-- draw compass
function OnDrawHud()
  -- get player
  local player = PlayerManager:GetLocalPlayer()
  if player == nil or player.soldier == nil then
    if isKilled then
      uiEnabled:Update(false)
      return
    end
  else
    isKilled = false
  end

  uiEnabled:Update(isHud and true)

  -- get yaw
  local camera = ClientUtils:GetCameraTransform()
  local yaw = MathUtils:GetYPRFromULF(camera.up, camera.left, camera.forward).x

  -- convert to degrees and display it
  local yawDeg = rad2deg(2 * math.pi - yaw)
  uiYaw:Update(yawDeg)
end

-- 
function OnExtensionLoaded()
  WebUI:Init()
  SyncConfig()
end

-- register events
Events:Subscribe('Extension:Loaded', OnExtensionLoaded)
Events:Subscribe('UI:DrawHud', OnDrawHud)
Events:Subscribe('Compass:Config', OnConfigReceived)
NetEvents:Subscribe('Compass:Config-Net', OnConfigReceived)

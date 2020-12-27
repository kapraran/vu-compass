require('config')
require('utils')
require('ui')

-- todo some validation
function SyncConfig()
  local isBottom = false
  if Config.position == 'bottom' then
    isBottom = true
  end
  WebUI:ExecuteJS(string.format('vext.setBottom(%s)', tostring(isBottom)))

  local indicator = 'needle'
  if Config.indicator == 'arrow' then
    indicator = 'arrow'
  end
  WebUI:ExecuteJS(string.format('vext.setIndicator("%s")', indicator))
end

--
function OnConfigReceived(userConfig)
  for k, v in pairs(userConfig) do
    Config[k] = v
  end

  SyncConfig()
end

-- use other mods or RCON to update compass' config
Events:Subscribe('Compass:Config', OnConfigReceived)
NetEvents:Subscribe('Compass:Config-Net', OnConfigReceived)

Events:Subscribe('Extension:Loaded', function()
  WebUI:Init()
  SyncConfig()
end)

Events:Subscribe('UI:DrawHud', function()
  -- get player
  local player = PlayerManager:GetLocalPlayer()
  if player == nil or player.soldier == nil then
    uiEnabled:Update(false)
    return
  end

  uiEnabled:Update(isHud and true)

  -- get yaw
  local camera = ClientUtils:GetCameraTransform()
  local yaw = MathUtils:GetYPRFromULF(camera.up, camera.left, camera.forward).x

  -- convert to degrees and display it
  local yawDeg = rad2deg(2 * math.pi - yaw)
  uiYaw:Update(yawDeg)
end)

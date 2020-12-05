require('config')
require('utils')
require('ui')

function SyncConfig()
  local isBottom = false
  if Config.position == 'bottom' then
    isBottom = true
  end

  WebUI:ExecuteJS(string.format('vext.setBottom(%s)', tostring(isBottom)))
end

-- this event can be used from other mods to update compass' config
Events:Subscribe('Compass:Config', function(userConfig)
  for k, v in pairs(userConfig) do
    Config[k] = v
  end

  SyncConfig()
end)

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
  local yaw = player.input.authoritativeAimingYaw
  if player.inVehicle then
    yaw = player.soldier.authoritativeYaw
  end

  -- convert to degrees and display it
  local yawDeg = rad2deg(yaw)
  uiYaw:Update(yawDeg)
end)

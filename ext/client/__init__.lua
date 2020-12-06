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

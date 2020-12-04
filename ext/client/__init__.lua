require('config')
require('utils')
require('ui')

Events:Subscribe('Extension:Loaded', function()
  WebUI:Init()
end)

Events:Subscribe('Compass:Config', function(userConfig)
  for k, v in pairs(userConfig) do
    Config[k] = v
  end
end)

local uiYaw = CachedJsExecutor('vext.setYaw', 0)

Events:Subscribe('UI:DrawHud', function()
  -- get player
  local player = PlayerManager:GetLocalPlayer()
  if player == nil or player.soldier == nil then
    uiEnabled:Update(false)
    return
  end

  -- get yaw
  local yaw = player.input.authoritativeAimingYaw
  if player.inVehicle then
    yaw = player.soldier.authoritativeYaw
  end

  -- convert to degrees and display it
  local yawDeg = rad2deg(yaw)
  uiYaw:Update(yawDeg)
end)

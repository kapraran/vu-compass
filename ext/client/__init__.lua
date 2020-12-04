require('config')
require('utils')

Events:Subscribe('Compass:Config', function(userConfig)
  for k, v in pairs(userConfig) do
    Config[k] = v
  end
end)

local uiYaw = CachedJsExecutor('updateYaw', 0)

Events:Subscribe('UI:DrawHud', function()
  local player = PlayerManager:GetLocalPlayer()

  if player == nil or player.soldier == nil then
    return
  end

  local yaw = player.input.authoritativeAimingYaw
  local yawDeg = rad2deg(yaw)

  uiYaw:Update(yawDeg)

  Events:Dispatch('Debug:Info', {
    ['yaw'] = yaw,
    ['deg'] = yawDeg
  })
end)

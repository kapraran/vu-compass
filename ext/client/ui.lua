uiYaw = CachedJsExecutor('vext.setYaw', 0)
uiEnabled = CachedJsExecutor('vext.setEnabled', false)

Hooks:Install('UI:PushScreen', 999, function(hook, screen, graphPriority, parentGraph)
  local screen = UIGraphAsset(screen)

  -- only for debug
  -- print(screen.name)
  -- if screen.name == 'UI/Flow/Screen/PreRoundWaitingScreen' then
  --   hook:Return(nil)
  --   return
  -- end

  if screen.name == 'UI/Flow/Screen/IngameMenuMP' or
     screen.name == 'UI/Flow/Screen/SpawnScreenPC' then
    uiEnabled:Update(false)
  end

  if screen.name == 'UI/Flow/Screen/HudMPScreen' then
    uiEnabled:Update(true)
  end
end)

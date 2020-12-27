RCON:RegisterCommand('compass.SetPosition', RemoteCommandFlag.RequiresLogin, function(command, args, loggedIn)
  local position = args[1]

  if position == 'top' or position == 'bottom' then
    local config = {
      ['position'] = position
    }

    NetEvents:BroadcastLocal('Compass:Config-Net', config)

    return { 'OK' }
  else
    return { 'InvalidPosition' }
  end
end)

RCON:RegisterCommand('compass.SetIndicator', RemoteCommandFlag.RequiresLogin, function(command, args, loggedIn)
  local indicator = args[1]

  if indicator == 'arrow' or indicator == 'needle' then
    local config = {
      ['indicator'] = indicator
    }

    NetEvents:BroadcastLocal('Compass:Config-Net', config)

    return { 'OK' }
  else
    return { 'InvalidIndicator' }
  end
end)

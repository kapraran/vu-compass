require('__shared/utils')

function OnConfigOptionReceived(option, value, isBool, isNumeric)
  if not IsValidConfigValue(option, value) then
    return { 'Invalid' .. firstToUpper(option) }
  end

  if isNumeric then
    value = tonumber(value)
  elseif isBool then
    value = (value:lower() == 'true')
  end

  NetEvents:BroadcastLocal('Compass:Config-Net', {
    [option] = value
  })

  return { 'OK' }
end

RCON:RegisterCommand('compass.SetTheme', RemoteCommandFlag.RequiresLogin, function(command, args, loggedIn)
  return OnConfigOptionReceived('theme', args[1])
end)

RCON:RegisterCommand('compass.SetScale', RemoteCommandFlag.RequiresLogin, function(command, args, loggedIn)
  return OnConfigOptionReceived('scale', args[1], false, true)
end)

RCON:RegisterCommand('compass.SetPosition', RemoteCommandFlag.RequiresLogin, function(command, args, loggedIn)
  return OnConfigOptionReceived('position', args[1])
end)

RCON:RegisterCommand('compass.SetIndicator', RemoteCommandFlag.RequiresLogin, function(command, args, loggedIn)
  return OnConfigOptionReceived('indicator', args[1])
end)

RCON:RegisterCommand('compass.ShowDegrees', RemoteCommandFlag.RequiresLogin, function(command, args, loggedIn)
  return OnConfigOptionReceived('showDegrees', args[1], true)
end)

g_Version = '1.4.0'
g_IsDebug = false

g_2PI = 2 * math.pi
g_PI2 = math.pi / 2
g_R2DC = 180 / math.pi

-- The valid values for each config option
local validConfigOptions = {
  ['theme'] = {'classic', 'warzone'},
  ['position'] = {'top', 'bottom'},
  ['indicator'] = {'arrow', 'needle'},
  ['showDegrees'] = {'true', 'false'}
}

-- Returns the yaw from the forward vector
function YawFromForward(forward)
  return (math.atan(forward.z, forward.x) + g_PI2) % g_2PI;
end

-- First letter to uppercase
function firstToUpper(str)
  return (str:gsub("^%l", string.upper))
end

-- Converts rads to degrees (fractional, 2 decimals for smooth UI)
function rad2deg(rad)
  return tonumber(string.format("%.2f", g_R2DC * rad))
end

-- Searches a table for a certain value
function table.indexOf(t, object)
  if type(t) ~= "table" then error("table expected, got " .. type(t), 2) end

  for i, v in pairs(t) do
      if object == v then
          return i
      end
  end
end

-- Checks if a config value for a certain option is valid
function IsValidConfigValue(option, value)
  if option == 'scale' then
    local num = tonumber(value)
    return num ~= nil and num >= 0.5 and num <= 2.0
  end

  if option == 'showDegrees' then
    value = tostring(value):lower()
  end

  return validConfigOptions[option] ~= nil and table.indexOf(validConfigOptions[option], value) ~= nil
end

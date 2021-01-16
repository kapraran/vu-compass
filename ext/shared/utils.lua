g_Version = '1.2.1'
g_IsDebug = false

g_2PI = 2 * math.pi
g_PI2 = math.pi / 2
g_R2DC = 180 / math.pi

-- The valid values for each config option
local validConfigOptions = {
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

-- Converts rads to degrees
function rad2deg(rad)
  return math.floor(g_R2DC * rad)
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
  -- make sure showDegrees is a string
  if option == 'showDegrees' then
    value = tostring(value):lower()
  end

  -- check if option exists and value is valid
  return validConfigOptions[option] ~= nil and table.indexOf(validConfigOptions[option], value) ~= nil
end

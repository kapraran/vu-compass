local validConfigOptions = {
  ['position'] = {'top', 'bottom'},
  ['indicator'] = {'arrow', 'needle'}
}

function firstToUpper(str)
  return (str:gsub("^%l", string.upper))
end

function table.indexOf(t, object)
  if type(t) ~= "table" then error("table expected, got " .. type(t), 2) end

  for i, v in pairs(t) do
      if object == v then
          return i
      end
  end
end

function IsValidConfigValue(option, value)
  if option == 'showDegrees' then
    local str = tostring(value):lower()
    return str == 'true' or str == 'false'
  end

  return table.indexOf(validConfigOptions[option], value) ~= nil

  -- if table.indexOf(validConfigOptions[option], value) then
  --   return value
  -- else
  --   return validConfigOptions[option][1]
  -- end
end

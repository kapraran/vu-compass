CachedJsExecutor = class('CachedJsExecutor')

function CachedJsExecutor:__init(funcName, initialValue)
  self.funcName = funcName
  self.prev = nil

  self:Update(initialValue)
end

function CachedJsExecutor:Update(value)
  if self.prev == value then
    return
  end
  self.prev = value

  WebUI:ExecuteJS(string.format('%s(%s)', self.funcName, value))
end

local __r2dc = 180/math.pi
function rad2deg(rad)
  return math.floor(__r2dc * rad)
end

g_2PI = 2 * math.pi
g_PI2 = math.pi / 2

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

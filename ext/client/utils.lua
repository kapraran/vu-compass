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
  return __r2dc * rad
end

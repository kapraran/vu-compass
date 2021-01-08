CachedJsExecutor = class('CachedJsExecutor')

function CachedJsExecutor:__init(funcTemplate, initialValue)
  self.funcTemplate = funcTemplate
  self.prev = nil

  self:Update(initialValue)
end

function CachedJsExecutor:Update(value)
  if self.prev == value then
    return
  end
  self.prev = value

  WebUI:ExecuteJS(string.format(self.funcTemplate, value))
end

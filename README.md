![vu-compass](./assets/vu-compass.small.png)

# vu-compass
A compass UI mod for Venice Unleashed

### About

The compass widget that we all know and love 😜 from games like PR, PUBG, Squad, etc. is now available as a standalone mod for Venice Unleashed. Just add it to your ModList and it should work out of the box with any other mod or on any vanilla server.

[See it in action](https://www.youtube.com/watch?v=lqQGXFswomc)

### Config

You can check the `ext/client/config.lua` file for the available config options. You can change those options:
1. by directly changing the config file
2. using the RCON commands `compass.SetPosition`, `compass.SetIndicator` and `compass.ShowDegrees`
3. by dispatching an event from another mod, passing your preferred values
```lua
-- update the config from another mod example
Events:Dispatch('Compass:Config', {
  ['position'] = 'bottom'
})
```

### Warzone Compass

![vu-compass warzone](./assets/vu-compass.warzone.small.png)

I also added a Warzone styled compass as a *bonus*. You can use it by downloading the contents of the [warzone branch](https://github.com/kapraran/vu-compass/tree/warzone). It doesn't support any config options though.

![vu-compass](./assets/vu-ccompass.small.png)

# vu-compass
A compass ui-mod for Venice Unleashed

### About

The compass widget that we all know and love 😜 from games like PR, PUBG, Squad, etc it's now available as a standalone mod for Venice Unleashed. Just add it in your ModList and it should work out of the box with any other mod or for any vanilla server.

[Check it in action](https://www.youtube.com/watch?v=lqQGXFswomc)

### Config

You can check the `config.lua` file for the available config options. You can directly change the config file or you can dispatch an event from another mod, passing your preferred values.

```lua
Events:Dispatch('Compass:Config', {
  ['position'] = 'bottom'
})
```

### Warzone Compass

![vu-compass warzone](./assets/vu-ccompass.warzone.small.png)

I also added a Warzone styled compass as a *bonus*. You can use it by downloading the contents of the [warzone branch](https://github.com/kapraran/vu-compass/tree/warzone). It doesn't support any config option though.

![vu-compass](./assets/vu-compass.small.png)

# vu-compass
A compass UI mod for Venice Unleashed, rewritten as a lightweight Canvas 2D TypeScript app with Vite.

### About

The compass widget that we all know and love from games like PR, PUBG, Squad, etc. is now available as a standalone mod for Venice Unleashed. Just add it to your ModList and it should work out of the box with any other mod or on any vanilla server.

### Themes

Two themes are built in:

| Theme     | Default | Step | Font       | Indicator       | Notes                          |
|-----------|---------|------|------------|-----------------|--------------------------------|
| `warzone` | yes     | 15°  | Unica One  | Center panel    | No extra configs               |
| `classic` |         | 5°   | Poppins    | Arrow or needle | Supports position/indicator/showDegrees |

Change theme at runtime: `compass.SetTheme classic`

### Config

Config lives in `ext/shared/config.lua`. Options:

| Option         | Values                 | Default     | Theme     |
|----------------|------------------------|-------------|-----------|
| `theme`        | `'classic'`, `'warzone'` | `'warzone'` | both      |
| `scale`        | `0.5` – `2.0`          | `1.0`       | both      |
| `position`     | `'top'`, `'bottom'`    | `'top'`     | classic   |
| `indicator`    | `'arrow'`, `'needle'`  | `'arrow'`   | classic   |
| `showDegrees`  | `true`, `false`        | `true`      | classic   |

You can change config:
1. by directly editing `ext/shared/config.lua`
2. using RCON commands: `compass.SetTheme`, `compass.SetScale`, `compass.SetPosition`, `compass.SetIndicator`, `compass.ShowDegrees`
3. by dispatching an event from another mod:
```lua
Events:Dispatch('Compass:Config', {
  ['theme'] = 'classic',
  ['scale'] = 1.0,
  ['position'] = 'bottom'
})
```

### Build

Requires Node.js. From the `ui/` directory:

```sh
npm install
npm run lint       
npm run fmt 
npm run build      # typecheck + bundle + compile ui.vuic
```

The compiled `ui.vuic` is generated at the repo root and is gitignored.

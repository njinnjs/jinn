# Open Architecture

## Preface

TBD

## Code

- Async as possible.
- Functional as possible.
- Module isolation (`Deno` requirement).
- No support for circular dependencies (solved using module isolation).
- Reflection and None-Reflection APIs.

## Requirements

TBD

### Dependency Management

While most of DI frameworks support common architecture, the following impl was designed with its own purpose.

#### `ModuleRef`

A scoped logical container (`IoC` container) for resolving dependencies.

- Resolves provided dependencies.
- Resolves imported dependencies.

#### `Provider`

A precipice for resolving an entity.

- Global scope (singleton)
- Module scope (new instance per resolving module)
- Transient scope (new instance each time)

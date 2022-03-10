# Architecture Blog

## Why Another Application Framework

## What Is The Purpose

## Injection

This framework inspired from `Angular` & `NestJS`. The `Angular` _DI_ designed for the browser and `NestJS` _DI_ for
`NodeJS`.

Both implementation rely on unimplemented feature of `Typescript`/`Javascript` - `Reflection`

ADD LINK TO REFLECTION PROPOSAL

`Jinn` will provide `Refelction` based DI and non-reflection based DI.

Some rules I put in front of my mind while designing the `Njinn` DI:

#### No globals

While `Angular` & `NestJS` have the `root injector` or `global scope`, `Jinn` will not support any global scope. The
only way to get access to an auto created dependency is to have its provider or to import a module that export this
provider.

#### No circular dependencies

There are 2 types of circular dependencies, the first one is class that require in its constructor class that need the
first one. This is an antipattern and not supported.

The second circular dependency resolved by isolated modules.

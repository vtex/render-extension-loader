# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- Include origin to requests in order to bypass cache and avoid CORS issue.

## [0.2.1] - 2020-06-23
### Fixed
- Add global `__RUNTIME__` data local `runtime`.

## [0.2.0] - 2019-12-19

### Added

- `getRuntimeContext` function to load only runtime information and assets links before actually loading assets.

## [0.1.8] - 2019-04-22

### Added

- Retry for ajax requests.

# Unreleased changes

Use [the changelog guidelines](https://git.io/polaris-changelog-guidelines) to format new entries. 💜

---

### Enhancements

- Update build toolchain to use Babel v7, PostCSS v7 and Rollup v1. Update our build targets match our [supported browsers](https://help.shopify.com/en/manual/intro-to-shopify/shopify-admin/supported-browsers), leading to a reduction in bundle size ([#837](https://github.com/Shopify/polaris-react/pull/837))
- `TextField` accepts a `showCharacterCount` prop to enable the display of character count ([#709](https://github.com/Shopify/polaris-react/pull/709))

### Bug fixes

### Documentation

### Development workflow

- Replaced our home-grown playground with Storybook (still acccessed through `yarn dev`) ([#768](https://github.com/Shopify/polaris-react/pull/768))
- Removed our usage of babel-node for build scripts - use plain node instead ([#836](https://github.com/Shopify/polaris-react/pull/836))

### Dependency upgrades

### Code quality

- Upgraded the `Banner`, `Card`, and `Modal` components from legacy context API to use createContext ([#786](https://github.com/Shopify/polaris-react/pull/786))

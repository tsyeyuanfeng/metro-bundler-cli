# metro-bundler-cli
A command line tool of metro bundler

## INSTALLATION

Install with npm globally:

```bash
npm install --global metro-bundler-cli
```

or as a dependency for your project:

```bash
npm install --save metro-bundler-cli
```

## USAGE
### Bundle base package
```bash
metro-bundler bundle \
--entry-file base.js  \
--bundle-output dist/base.jsbundle  \
--assets-dest dist \
--manifest-output dist/base.manifest.json  \
--platform ios  \
--dev true
```

### Bundle business package
```bash
metro-bundler bundle  \
--entry-file index.js  \
--bundle-output dist/business.jsbundle  \
--manifest-output dist/business.manifest.json  \
--assets-dest dist \
--exclude dist/base.manifest.json   \
--platform ios  \
--dev true
```

### Bundle full package
```bash
metro-bundler bundle  \
--entry-file index.js  \
--bundle-output dist/business.jsbundle  \
--assets-dest dist \
--platform ios  \
--dev true
```
# metro-bundler-cli
`metro-bundler-cli` is a command line tool to bundle react native project. This project is created mainly for bundle splitting. There is another similar project [rn-packger](https://github.com/react-component/rn-packager), but it uses module name as module id, which is not stable enough and not unique enough across projects. Moreover, bundles generated using rn-packager under `DEV` mode are not able to run. So I made this tool to provide better bundle experience.   

## FEATURE
- More stable and more unique module id \
Official metro-bundler uses incremental number as module id, which has some defects when splitting bundle. You can refer to this issue [[Discuss]Problems about unstable numeric module ID.](https://github.com/facebook/metro-bundler/issues/6) for more details. [rn-packger](https://github.com/react-component/rn-packager) made some improvements over module id creator. It uses module name which will downgrade to a relative path included project name when no module name is provided as module id, but project name is also unstable enough, for developers may rename a repo when cloning it to local. Two different projects may also have the same name, which is likely to case module conflicts. `metro-bundler-cli` uses hash of local path and module content as module id, which is more stable and more unique. Project name won't affect module id. Even two modules of two different projects have the some path, they will have different id as they have different content. By the way, stable module id is just an alternative and is not default. You must set `use-stable-id` flag to be `true` when you want to use stable id.

- Support bundle splitting \
You can split your bundle into base bundle and business bundle with 'metro-bundler-cli'. React native base bundle is stable and it's size is much bigger than business bundle usually. Splitting bundle into base bundle and business bundle is benefit of reducing business bundle downloading time and accelerating business bundle loading time.

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
`metro-bundler-cli` extends the officail bundle command line tool rather than change it, so you can bundle as usual with `metro-bundler-cli`.

```bash
metro-bundler bundle  \
--entry-file index.js  \
--bundle-output dist/business.jsbundle  \
--assets-dest dist \
--platform ios  \
--dev false
```

`metro-bundler-cli` exposes three more options.
- use-stable-id: If `true`, use stable module id;
- manifest-output: Manifest file path, if set, modules' information will be output to it;
- exclude: Manifest file path, if set, modules in this file will be excluded from bundle.


### Generate base bundle 
```bash
metro-bundler bundle \
--entry-file base.js  \
--bundle-output dist/base.jsbundle  \
--assets-dest dist \
--manifest-output dist/base.manifest.json  \
--platform ios  \
--dev false
--use-stable-id true
```

### Generate business bundle
```bash
metro-bundler bundle  \
--entry-file index.js  \
--bundle-output dist/business.jsbundle  \
--manifest-output dist/business.manifest.json  \
--assets-dest dist \
--exclude dist/base.manifest.json   \
--platform ios  \
--dev false
--use-stable-id true
```
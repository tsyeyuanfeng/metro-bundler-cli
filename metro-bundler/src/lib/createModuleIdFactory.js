/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @format
 */

'use strict';
const crypto = require('crypto');


function createModuleIdFactory(useStableId) {
  const fileToIdMap = new Map();
  let nextId = 0;
  return module => {
    if (!fileToIdMap.has(module.path)) {
      if (useStableId) {
        fileToIdMap.set(
        module.path,
        crypto.createHash('md5').
        update(module.localPath).
        update(module._readSourceCode()).
        digest('hex'));

      } else
      {
        fileToIdMap.set(module.path, nextId);
        nextId += 1;
      }
    }
    return fileToIdMap.get(module.path);
  };
}

module.exports = createModuleIdFactory;
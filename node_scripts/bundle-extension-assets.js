/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */

const fs = require('fs')

const PACKAGE_SOLUTION = 'AppCustomizer/config/package-solution.json',
  EXTENSION_BASE = 'AppCustomizer/src/extensions',
  HEADER_BASE = 'AppCustomizer/src/extensions/assets/header/appcode',
  FOOTER_BASE = 'AppCustomizer/src/extensions/assets/footer/appcode',
  EXTENSION_SUFFIX = 'ApplicationCustomizer.ts',
  INDEX_HEADER_JS = 'import { renderHeader } from "../assets/header/appcode/index',
  INDEX_HEADER_CSS = 'import "../assets/header/appcode/index',
  INDEX_FOOTER_JS = 'import { renderFooter } from "../assets/footer/appcode/index',
  INDEX_FOOTER_CSS = 'import "../assets/footer/appcode/index',
  SUFFIX = '";\n',
  RENDER_HEADER_PREFIX = 'export function renderHeader(appID) {\n',
  RENDER_FOOTER_PREFIX = 'export function renderFooter(appID) {\n',
  RENDER_SUFFIX = '}\n'

const logStatus = (message) => {
    if (message) console.log('\n' + message)
  },
  logError = (errorData) => {
    console.error('\nERROR:\n')
    console.error(errorData)
  },
  getPackageVersion = (basePath) => {
    try {
      let pkg = JSON.parse(fs.readFileSync(basePath + 'package.json', 'utf-8'))
      return pkg.version
    } catch (e) {
      logError(e)
      return ''
    }
  },
  updatePackageSolutionVersion = (basePath, newVersion) => {
    try {
      let packageSolution = JSON.parse(fs.readFileSync(basePath + PACKAGE_SOLUTION, 'utf-8'))
      packageSolution.solution.version = newVersion
      fs.writeFileSync(basePath + PACKAGE_SOLUTION, JSON.stringify(packageSolution, null, '\t'))
      logStatus('package-solution.json version updated to ' + newVersion)
    } catch (e) {
      logError(e)
    }
  },
  getExtensionName = (basePath) => {
    let extensionName = ''
    try {
      fs.readdirSync(basePath + EXTENSION_BASE).forEach((file) => {
        let itemPath = basePath + EXTENSION_BASE + `/` + file
        let isDir = fs.statSync(itemPath).isDirectory()
        if (isDir && file != 'assets') extensionName = file
      })
    } catch (e) {
      logError(e)
    }
    return extensionName
  },
  getHeaderFiles = (basePath) => {
    let assetFiles = []
    try {
      fs.readdirSync(basePath + HEADER_BASE).forEach((file) => {
        let itemPath = basePath + HEADER_BASE + `/` + file
        let isDir = fs.statSync(itemPath).isDirectory()
        if (!isDir) assetFiles.push(file)
      })
    } catch (e) {
      logError(e)
    }
    return assetFiles
  },
  getFooterFiles = (basePath) => {
    let assetFiles = []
    try {
      fs.readdirSync(basePath + FOOTER_BASE).forEach((file) => {
        let itemPath = basePath + FOOTER_BASE + `/` + file
        let isDir = fs.statSync(itemPath).isDirectory()
        if (!isDir) assetFiles.push(file)
      })
    } catch (e) {
      logError(e)
    }
    return assetFiles
  },
  replaceLine = (textContents, linePrefix, newText, eolText) => {
    if (textContents && linePrefix && newText) {
      let p = textContents.indexOf(linePrefix),
        eol = textContents.indexOf('\n', p)
      if (p >= 0 && eol > p) {
        return textContents.substring(0, p) + linePrefix + newText + eolText + textContents.substring(eol + 1)
      } else return textContents
    } else return textContents
  },
  updateRefsInExtension = (basePath, extensionName, assetFiles, element) => {
    if (basePath && extensionName && assetFiles) {
      try {
        let extensionFilePath = basePath + EXTENSION_BASE + '/' + extensionName + '/' + extensionName + EXTENSION_SUFFIX,
          script = fs.readFileSync(extensionFilePath, 'utf-8'),
          // SPEVILGENIUS Updating RegEx for minus vs period
          indexJsAsset = assetFiles.find((file) => file.match(/index\-[\w\d]+.js/gi) != null),
          indexCssAsset = assetFiles.find((file) => file.match(/index\-[\w\d]+.css/gi) != null)
        if (script && indexJsAsset && indexCssAsset && element == 'header') {
          script = replaceLine(script, INDEX_HEADER_JS, indexJsAsset.replace('index', ''), SUFFIX)
          script = replaceLine(script, INDEX_HEADER_CSS, indexCssAsset.replace('index', ''), SUFFIX)
        } else {
          script = replaceLine(script, INDEX_FOOTER_JS, indexJsAsset.replace('index', ''), SUFFIX)
          script = replaceLine(script, INDEX_FOOTER_CSS, indexCssAsset.replace('index', ''), SUFFIX)
        }
        fs.writeFileSync(extensionFilePath, script)
        logStatus('Extension script references new assets.')
      } catch (e) {
        logError(e)
      }
    }
  },
  addRenderFn = (assetsBase, assetFiles, prefix, suffix, element) => {
    if (assetsBase) {
      try {
        let indexJsAsset = assetFiles.find((file) => file.match(/index\-[\w\d]+.js/gi) != null)
        if (indexJsAsset) {
          let script = fs.readFileSync(assetsBase + indexJsAsset, 'utf-8')
          let varCodePos;
          if (element == 'header') {
            varCodePos = script.lastIndexOf('var HeaderApp')
          } else {
            varCodePos = script.lastIndexOf('var FooterApp')
          }
          if (varCodePos > 0) {
            let renderFn = script.substring(varCodePos)
            script = script.substring(0, varCodePos) + '\n\n'
            renderFn = renderFn.replace(/\"\#[\w\d\-]+\"/, 'appID')
            script = script + prefix + renderFn + suffix
            fs.writeFileSync(assetsBase + indexJsAsset, script)
            logStatus('App script updated with render function.')
          }
        } else logError("Can't find index.js asset.")
      } catch (e) {
        logError(e)
      }
    }
  },
  run = () => {
    let basePath = process.cwd() + '\\'
    // console.log('basePath: ' + basePath)
    basePath += '\AppCustomizer\\'
    // console.log('basePath: ' + basePath)
    let version = getPackageVersion(basePath)
    console.log('VERSION: ' + version)
    basePath = process.cwd() + '\\'
    console.log('basePath FINAL: ' + basePath)
    if (version) {
      let extensionName = getExtensionName(basePath)
      logStatus('Build and ship extension: ' + extensionName)
      updatePackageSolutionVersion(basePath, version + '.0')
      // get the header and footer asset files
      let headerFiles = getHeaderFiles(basePath)
      let footerFiles = getFooterFiles(basePath)
      // let assetFiles = getAssetFiles(basePath)
      // logStatus('Bundle assets: ' + assetFiles.join(', '))
      updateRefsInExtension(basePath, extensionName, headerFiles, 'header')
      updateRefsInExtension(basePath, extensionName, footerFiles, 'footer')
      addRenderFn(HEADER_BASE + '/', headerFiles, RENDER_HEADER_PREFIX, RENDER_SUFFIX, 'header')
      addRenderFn(FOOTER_BASE + '/', footerFiles, RENDER_FOOTER_PREFIX, RENDER_SUFFIX, 'footer')
      console.log('\n\n')
    }
  }

run()

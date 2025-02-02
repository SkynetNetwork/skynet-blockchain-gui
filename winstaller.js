const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('Creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(rootPath, 'Skynet-win32-x64'),
    authors: 'Skynet Network',
    version: process.env.SKYNET_INSTALLER_VERSION,
    noMsi: true,
    iconUrl: 'https://raw.githubusercontent.com/SkynetNetwork/skynet-blockchain-gui/main/src/assets/img/skynet.ico',
    outputDirectory: path.join(outPath, 'windows-installer'),
    certificateFile: 'win_code_sign_cert.p12',
    certificatePassword: process.env.WIN_CODE_SIGN_PASS,
    exe: 'Skynet.exe',
    setupExe: 'SKYNETSetup-' + process.env.SKYNET_INSTALLER_VERSION + '.exe',
    setupIcon: path.join(rootPath, 'src', 'assets', 'img', 'skynet.ico'),
    animation: path.join(rootPath, 'src', 'assets', 'img', 'skynet_loading_boxed.gif'),
  })
}

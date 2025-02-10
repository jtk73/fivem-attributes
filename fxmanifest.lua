fx_version 'cerulean'
game 'gta5'

name 'fivem-attributes'
author 'arlofonseca'
description 'Character attributes for FiveM.'
version '0.0.3'
repository 'https://github.com/arlofonseca/fivem-attributes'
license 'MIT'

server_scripts {
  'dist/server/*.js',
}

files {
  'config.json',
}

dependencies {
  '/server:7290',
  '/onesync',
  'ox_lib',
  'ox_core',
}

lua54 'yes'
use_experimental_fxv2_oal 'yes'

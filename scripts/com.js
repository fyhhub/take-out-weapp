const program = require('commander')
const fs = require('fs')
const path = require('path')
program
  .command('com [projectName]')
  .description('Vue CLI v3.4.1')
  .action(option => {
    const dir = path.resolve(__dirname, '..', `src/components/${option}`)
    fs.mkdirSync(dir)
    fs.writeFileSync(dir + '/index.tsx',
`import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

const ${option} = () => {
  return (
    <View className='${option.toLowerCase()}'>
      ${option}
    </View>
  )
}

export default ${option}
    `)

  fs.writeFileSync(dir + '/index.scss', '')
  })
program.parse(process.argv)

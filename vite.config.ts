import { UserConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

const config: UserConfig = {
  resolve: {
    alias: [
      { find: '~/', replacement: `${resolve(__dirname, 'src')}/`}
    ]
  },
  plugins: [
    vue({
      include: [/\.vue$/]
    })
  ]
}

export default config

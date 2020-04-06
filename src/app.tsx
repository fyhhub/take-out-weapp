import '@tarojs/async-await'
import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/redux'
import Index from './pages/App/index'
import configStore from './store'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

export const store = configStore()

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/App/index',
      'pages/Order/index',
      'pages/My/index',
      'pages/BusinessDetail/index',
      'pages/Pay/index',
      'pages/Address/index',
      'pages/AddressManager/index',
      'pages/PayMode/index',
      'pages/Auth/index',
      'pages/Assess/index',
      'pages/SearchList/index',
      'pages/OrderDetail/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black',
    },
    tabBar: {
      selectedColor: '#000',
      color: '#999',
      list: [
        {
          text: '首页',
          pagePath: 'pages/App/index',
          iconPath: './assets/images/home.png',
          selectedIconPath: './assets/images/home_active.png',
        },
        {
          text: '订单',
          pagePath: 'pages/Order/index',
          iconPath: './assets/images/order.png',
          selectedIconPath: './assets/images/order_active.png'
        },
        {
          text: '我的',
          pagePath: 'pages/My/index',
          iconPath: './assets/images/my.png',
          selectedIconPath: './assets/images/my_active.png'
        }
      ]
    },
    permission: {
      'scope.userLocation': {
        desc: '你的位置信息将用于小程序定位'
      },
      'scope.userInfo': {
        desc: '是否允许获取用户信息'
      }
    },
    plugins: {
      "routePlan": {
        "version": "1.0.3",
        "provider": "wx50b5593e81dd937a"
      },
      "chooseLocation": {
        "version": "1.0.2",
        "provider": "wx76a9a06e5b4e693e"
      }
    }
  }

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))

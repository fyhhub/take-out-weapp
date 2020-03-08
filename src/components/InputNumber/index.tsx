import Taro, { useCallback } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import addImg from '@/assets/images/add.png'
import divideImg from '@/assets/images/divide.png'
import './index.scss'
interface IProps {
  onLeftClick?: Function
  onRightClick?: Function
  amount?: number
}
const InputNumber: Taro.FC<IProps> = ({ onLeftClick, onRightClick, amount }) => {

  const handleLeftClick = useCallback(() => {
    onLeftClick && onLeftClick()
  }, [onLeftClick])

  const handleRightClick = useCallback(() => {
    onRightClick && onRightClick()
  }, [onRightClick])
  return (
    <View className='inputnumber'>
      {
        amount ? <Image src={divideImg} onClick={handleLeftClick}/> : null
      }
      {
        amount ? <View>{amount}</View> : null
      }
      <Image src={addImg} onClick={handleRightClick}/>
    </View>
  )
}

export default InputNumber

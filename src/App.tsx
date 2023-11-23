import { store } from './redux/store'
import MainScreen from './screens/MainScreen'
import { Provider } from 'react-redux'
export default function App() {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  )
}

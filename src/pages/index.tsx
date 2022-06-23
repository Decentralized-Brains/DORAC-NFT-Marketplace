import Header from '@components/Header'
import WalletIcon from '../../components/walletIcon'
export default function Home() {
  return (
    <div className="flex flex-col flex-1 min-h-screen mx-auto 2xl:container">
      <Header />
      <div className="grid h-screen place-items-center">
        <div>
          <h2 className="text-xl">Boiler Plate</h2>
          <strong>Made By Rhine</strong>
          <WalletIcon />
        </div>
      </div>
    </div>
  )
}

import { shortenAddress, useEthers } from "@usedapp/core";
import Link from "next/link";

const NavBar = () => {
  const { account, activateBrowserWallet, deactivate } = useEthers();
  return (
    <nav className="fixed flex bg-blue-400 right-0 top-0 text-lg w-full justify-between items-center">
      <div className="flex gap-6 font-bold ml-10">
        <div>
          <Link href={"/"}>Home</Link>
        </div>
        <div>
          <Link href={"/create-nft"}>Create</Link>
        </div>
        <div>
          <Link href={"/purchases"}>Purchases</Link>
        </div>
      </div>
      <div>
        {account ? (
          <div>
            <span className="mr-10">{shortenAddress(account)}</span>
            <button
              className="bg-red-700 text-white hover:bg-red-900 transition-colors rounded p-1 pl-2 pr-2 m-2"
              onClick={deactivate}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            className="bg-green-700 text-white hover:bg-green-900 transition-colors rounded p-1 pl-2 pr-2 m-2"
            onClick={() => activateBrowserWallet()}
          >
            Connect
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;

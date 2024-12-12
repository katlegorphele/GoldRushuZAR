import { list } from 'postcss';
import React from 'react'
import { createThirdwebClient, defineChain } from "thirdweb";
import { ConnectButton, lightTheme, useWalletDetailsModal } from "thirdweb/react";
import { client } from '../client';

const ConnectWallet = () => {
  

  const wallet = useWalletDetailsModal()

  const customTheme = lightTheme({
    colors: {
      primaryButtonBg: '#0ba0fc'
    }
   })

  return (
    <ConnectButton
        theme={customTheme}
        supportedTokens={{
          [1135]: [
            {
              address: "0xE29E8434FF23c4ab128AEA088eE4f434129F1Bf1",
              name: "Universel Zar",
              symbol: "uZAR",
              icon: "...",
            },
          ],
        }}
        client={client}
        accountAbstraction={{
          chain: defineChain(1135),
          sponsorGas: true,
        }}
        connectModal={{
          size: "wide",
          showThirdwebBranding: false,
        }}
      />
  )
}

export default ConnectWallet

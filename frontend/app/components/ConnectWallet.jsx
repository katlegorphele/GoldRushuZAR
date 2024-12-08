import { list } from 'postcss';
import React from 'react'
import { createThirdwebClient, defineChain } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { client } from '../client';

const ConnectWallet = () => {


  return (
    <ConnectButton
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
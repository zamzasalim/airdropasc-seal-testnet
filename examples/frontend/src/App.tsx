// Copyright (c), Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { Box, Button, Card, Container, Flex, Grid } from '@radix-ui/themes';
import { CreateAllowlist } from './CreateAllowlist';
import { Allowlist } from './Allowlist';
import WalrusUpload from './EncryptAndUpload';
import { useState } from 'react';
import { CreateService } from './CreateSubscriptionService';
import FeedsToSubscribe from './SubscriptionView';
import { Service } from './SubscriptionService';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AllAllowlist } from './OwnedAllowlists';
import { AllServices } from './OwnedSubscriptionServices';
import Feeds from './AllowlistView';

function LandingPage() {
  return (
    <Grid columns="2" gap="4">
      <Card>
        <Flex direction="column" gap="2" align="center" style={{ height: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>TRY Allowlist</h2>
          </div>
              <div style={{ textAlign: 'left' }}>
      <h3>Tutorial</h3>
      <p>1. Click 'Try it'</p>
      <p>2. Create Your Name Allow List</p>
      <p>3. Add New Sui Wallet</p>
      <p>4. Select Walrus service</p>
      <p>5. Upload file</p>
      <p>6. Click 'First step: Encrypt and upload to Walrus'</p>
      <p>7. Click 'Second step: Associate file to Sui object'</p>
      <p>8. Done</p>
    </div>
          <Link to="/allowlist-example">
            <Button size="3">Try it</Button>
          </Link>
        </Flex>
      </Card>
      <Card>
        <Flex direction="column" gap="2" align="center" style={{ height: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>TRY Subscription</h2>
          </div>
                        <div style={{ textAlign: 'left' }}>
      <h3>Tutorial</h3>
      <p>1. Click 'Try it'</p>
      <p>2. Enter Price in Mist</p>
      <p>3. Subscription duration in minutes</p>
      <p>4. Name of the Service</p>
      <p>5. Click Create Service</p>
      <p>6. Click 'this link'</p>
      <p>7. Click and Download Decrypt</p>
      <p>8. Done</p>
    </div>
          <Link to="/subscription-example">
            <Button size="3">Try it</Button>
          </Link>
        </Flex>
      </Card>
    </Grid>
  );
}

function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState<string>('');
  const [capId, setCapId] = useState<string>('');
  return (
    <Container>
      <Flex position="sticky" px="4" py="2" justify="between">
        <h1 className="text-4xl font-bold m-4 mb-8">Sealsui Testnet By AIRDROP ASC</h1>
        {/* <p>TODO: add seal logo</p> */}
        <Box>
          <ConnectButton />
        </Box>
      </Flex>
<Card style={{ marginBottom: '2rem' }}>
  <div style={{ textAlign: 'center' }}>
    <img 
      src="https://github.com/user-attachments/assets/1aa6d82b-3b3c-4ecb-93f9-e6a29f5826ca"
      width="100" 
      style={{ marginBottom: '10px' }} // Memberikan jarak antara logo dan judul
    />
    <h2 style={{ borderBottom: '2px solid #000', paddingBottom: '10px' }}>
      <b>Community Team</b>
    </h2>
    <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <a href="https://www.airdropasc.com" target="_blank" style={{ margin: '0 10px' }}>
        <img src="https://github.com/user-attachments/assets/1aa6d82b-3b3c-4ecb-93f9-e6a29f5826ca" width="50" />
      </a>
      <a href="https://t.me/airdropasc" target="_blank" style={{ margin: '0 10px' }}>
        <img src="https://github.com/user-attachments/assets/56e7f6ee-18b7-4b36-becc-ec6e4de7bff9" width="50" />
      </a>
      <a href="https://x.com/Autosultan_team" target="_blank" style={{ margin: '0 10px' }}>
        <img src="https://github.com/user-attachments/assets/fbb43aa4-9652-4a49-b984-5cf032b6b1ac" width="50" />
      </a>
      <a href="https://www.youtube.com/@ZamzaSalim" target="_blank" style={{ margin: '0 10px' }}>
        <img src="https://github.com/user-attachments/assets/c15509f9-acb7-49ce-989a-5bac62e7e549" width="50" />
      </a>
    </p>
  </div>
</Card>
      {currentAccount ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/allowlist-example/*"
              element={
                <Routes>
                  <Route path="/" element={<CreateAllowlist />} />
                  <Route
                    path="/admin/allowlist/:id"
                    element={
                      <div>
                        <Allowlist
                          setRecipientAllowlist={setRecipientAllowlist}
                          setCapId={setCapId}
                        />
                        <WalrusUpload
                          policyObject={recipientAllowlist}
                          cap_id={capId}
                          moduleName="allowlist"
                        />
                      </div>
                    }
                  />
                  <Route path="/admin/allowlists" element={<AllAllowlist />} />
                  <Route
                    path="/view/allowlist/:id"
                    element={<Feeds suiAddress={currentAccount.address} />}
                  />
                </Routes>
              }
            />
            <Route
              path="/subscription-example/*"
              element={
                <Routes>
                  <Route path="/" element={<CreateService />} />
                  <Route
                    path="/admin/service/:id"
                    element={
                      <div>
                        <Service
                          setRecipientAllowlist={setRecipientAllowlist}
                          setCapId={setCapId}
                        />
                        <WalrusUpload
                          policyObject={recipientAllowlist}
                          cap_id={capId}
                          moduleName="subscription"
                        />
                      </div>
                    }
                  />
                  <Route path="/admin/services" element={<AllServices />} />
                  <Route
                    path="/view/service/:id"
                    element={<FeedsToSubscribe suiAddress={currentAccount.address} />}
                  />
                </Routes>
              }
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <p>Please connect your sui wallet to continue</p>
      )}
    </Container>
  );
}

export default App;

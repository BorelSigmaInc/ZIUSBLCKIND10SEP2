'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState } from 'react';

export default function BESACPPOC() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [logs, setLogs] = useState<string[]>([]);
  const [step, setStep] = useState<'disconnected' | 'connected' | 'requested' | 'proofed' | 'signed'>('disconnected');

  const addLog = (message: string) => {
    setLogs(prev => [...prev, \`\${new Date().toLocaleTimeString()}: \${message}\`]);
  };

  const simulateBESACPProtocol = async () => {
    addLog("🤖 Buyer Agent connecting...");
    connect();
    addLog("✅ Buyer Authenticated with DID: " + address);
    setStep('connected');

    addLog("📋 Buyer requests quote for 50 units");
    addLog("🔐 Querying authorization smart contract...");
    addLog("✅ Supplier authorized to provide quotes");
    setStep('requested');

    addLog("🔒 Requesting ZKP for inventory proof...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    addLog("✅ ZKP Received: Supplier has inventory > 50 units");
    addLog("✅ Proof verified without revealing exact inventory");
    setStep('proofed');

    addLog("📝 Preparing agreement...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    addLog("✅ Agreement signed and hash stored on-chain");
    addLog("⭐ Supplier reputation updated +10");
    setStep('signed');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">BESACP Proof of Concept</h1>
        <p className="text-gray-600 mb-8">Blockchain-Enhanced Secure Agent-to-Agent Communication Protocol</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">👨‍💼 Buyer Agent</h2>
            {!isConnected ? (
              <button onClick={simulateBESACPProtocol} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium">
                Connect & Start Protocol
              </button>
            ) : (
              <div>
                <p className="text-sm text-gray-600 mb-2">Connected as:</p>
                <p className="font-mono text-xs bg-gray-100 p-2 rounded mb-4">{address}</p>
                <button onClick={() => disconnect()} className="bg-gray-500 text-white px-4 py-2 rounded text-sm">
                  Disconnect
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">🏭 Supplier Agent</h2>
            <p className="text-gray-600 mb-3">This agent's logic runs automatically in response to protocol messages.</p>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
              <p className="text-xs text-yellow-800 font-mono">Secret: Inventory = 150 units</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">📋 BESACP Protocol Log</h2>
          <div className="h-80 overflow-y-auto bg-gray-50 p-4 rounded border font-mono text-sm">
            {logs.length === 0 ? (
              <p className="text-gray-400">Protocol log will appear here...</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-2 border-b pb-2 last:border-b-0">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

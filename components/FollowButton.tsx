import { useAccount, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { LoadingSpinner } from './LoadingSpinner';
import { useState, useEffect } from 'react';

interface FollowButtonProps {
  targetAddress: string;
  className?: string;
}

export const FollowButton = ({ targetAddress, className = '' }: FollowButtonProps) => {
  const { address, isConnected } = useAccount();
  const { connect, isPending: isConnectPending } = useConnect();
  const [isHovered, setIsHovered] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // Check if MetaMask is available and component is mounted
  useEffect(() => {
    setIsMounted(true);
    setHasMetaMask(typeof window !== 'undefined' && !!window.ethereum);
  }, []);

  // Custom click handler to handle wallet connection when needed
  const handleClick = async () => {
    // If not connected and MetaMask is available, connect first
    if (!isConnected && hasMetaMask) {
      try {
        connect({ connector: injected() });
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else if (isConnected) {
      // TODO: Implement EFP follow action once SSR issues are resolved
      console.log('Follow action for:', targetAddress);
      alert('Follow functionality will be implemented once EFP integration is working properly');
    }
  };

  // Custom button text logic
  const getButtonText = () => {
    if (isConnectPending) {
      return (
        <>
          connecting <LoadingSpinner />
        </>
      );
    }
    
    // If not connected, show connect on hover, follow otherwise
    if (!isConnected) {
      return isHovered ? 'connect' : 'follow';
    }
    
    // When connected, show follow (will be updated with EFP status later)
    return 'follow';
  };

  // Determine if button should be disabled
  const isDisabled = (!hasMetaMask && !isConnected) || isConnectPending;

  // Show a simple button during SSR
  if (!isMounted) {
    return (
      <button 
        className={`text-sm border border-gray-300 px-2 py-0.5 hover:border-gray-600 transition-colors ${className}`}
        disabled
      >
        follow
      </button>
    );
  }

  return (
    <button
      className={`text-sm border border-gray-300 px-2 py-0.5 hover:border-gray-600 transition-colors ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isDisabled}
      aria-label={!isConnected ? (isHovered ? 'Connect wallet' : 'Follow') : 'Follow'}
      title={(!hasMetaMask && !isConnected) ? 'No wallet detected' : undefined}
    >
      {getButtonText()}
    </button>
  );
};
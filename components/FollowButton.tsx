import { useState, useEffect } from 'react';
import { useAccount, useConnect, useSignMessage } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { LoadingSpinner } from './LoadingSpinner';

interface FollowButtonProps {
  targetAddress: string;
  className?: string;
}

export const FollowButton = ({ targetAddress, className = '' }: FollowButtonProps) => {
  const { address, isConnected, isConnecting } = useAccount();
  const { connect, isPending: isConnectPending } = useConnect();
  const { signMessage, isPending: isSignPending } = useSignMessage();
  
  const [isHovered, setIsHovered] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isCheckingFollowStatus, setIsCheckingFollowStatus] = useState(false);

  // Check if already following (would need EFP API integration)
  useEffect(() => {
    if (!isConnected || !address) return;
    
    // TODO: Check follow status via EFP API
    // For now, just mock it
    setIsCheckingFollowStatus(true);
    setTimeout(() => {
      setIsCheckingFollowStatus(false);
      // Mock: randomly set following status for demo
      setIsFollowing(false);
    }, 500);
  }, [address, isConnected]);

  const handleClick = async () => {
    if (!isConnected) {
      // Connect wallet
      connect({ connector: injected() });
    } else {
      // Follow/Unfollow logic
      // For now, just sign a message as proof of concept
      // In production, this would interact with EFP protocol
      try {
        const message = isFollowing 
          ? `Unfollow ${targetAddress}` 
          : `Follow ${targetAddress}`;
        
        signMessage({ message });
        setIsFollowing(!isFollowing);
      } catch (error) {
        console.error('Failed to sign message:', error);
      }
    }
  };

  // Determine button text
  const getButtonText = () => {
    if (isConnecting || isConnectPending) {
      return (
        <>
          connecting <LoadingSpinner />
        </>
      );
    }
    
    if (isSignPending) {
      return (
        <>
          signing <LoadingSpinner />
        </>
      );
    }
    
    if (isCheckingFollowStatus) {
      return <LoadingSpinner />;
    }
    
    if (!isConnected) {
      return isHovered ? 'connect' : 'follow';
    }
    
    return isFollowing ? 'unfollow' : 'follow';
  };

  // Check if wallet connection is possible
  const canConnect = typeof window !== 'undefined' && window.ethereum;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={!canConnect && !isConnected}
      className={`text-sm border border-gray-300 px-2 py-0.5 hover:border-gray-600 transition-colors ${className}`}
      title={!canConnect && !isConnected ? 'No wallet detected' : ''}
    >
      {getButtonText()}
    </button>
  );
};
import { useAccount, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { LoadingSpinner } from './LoadingSpinner';
import { useState, useEffect } from 'react';

interface FollowButtonProps {
  targetAddress: string;
  className?: string;
}

export const FollowButton = ({ targetAddress, className = '' }: FollowButtonProps) => {
  const { isConnected } = useAccount();
  const { connect, isPending: isConnectPending } = useConnect();
  const [isHovered, setIsHovered] = useState(false);
  const [hasMetaMask, setHasMetaMask] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  
  // Check if MetaMask is available
  useEffect(() => {
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
      // When connected, toggle follow state (placeholder for now)
      // TODO: Replace with actual EFP integration
      setIsFollowing(!isFollowing);
      console.log(`${isFollowing ? 'Unfollow' : 'Follow'} ${targetAddress}`);
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
    
    // When connected, show follow/unfollow based on state
    return isFollowing ? 'unfollow' : 'follow';
  };

  return (
    <button
      className={`text-sm border border-gray-300 px-2 py-0.5 hover:border-gray-600 transition-colors ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={(!hasMetaMask && !isConnected) || isConnectPending}
      aria-label={!isConnected ? (isHovered ? 'Connect wallet' : 'Follow') : (isFollowing ? 'Unfollow' : 'Follow')}
      aria-pressed={isConnected ? isFollowing : undefined}
      title={(!hasMetaMask && !isConnected) ? 'No wallet detected' : undefined}
    >
      {getButtonText()}
    </button>
  );
};
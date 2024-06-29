import { useState } from 'react';
/**
 * Custom hook to manage loading state and behavior.
 * @param {function} callback - Callback function to trigger loading action (e.g., API call).
 * @returns {object} - Object containing loading state and related functions.
 */
const useLoading = callback => {
  const [loading, setLoading] = useState(false);

  const handleLoading = async (...args) => {
    setLoading(true);
    try {
      await callback(...args);
    } catch (error) {
      console.error('Error during loading:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleLoading,
  };
};

export default useLoading;

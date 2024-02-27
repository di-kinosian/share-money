import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import Modal from '../../components/Modal';
import { BodyText, Flex, H4 } from '../../components/styled';
import Button from '../../components/Button';
import { database } from '../../firebase';

const ConnectionCheckProvider = () => {
  const [databaseInitialized, setDatabaseInitialized] = useState(false);
  const [disconnected, setDisconnected] = useState(false);

  useEffect(() => {
    const connectedRef = ref(database, '.info/connected');
    const unsubscribe = onValue(connectedRef, (snapshot) => {
      const connected: boolean = snapshot.val();
      if (connected && !databaseInitialized) {
        setDatabaseInitialized(true);
      }
      if (databaseInitialized) {
        setDisconnected(!connected);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [databaseInitialized]);

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <Modal zIndex={1000} isOpen={disconnected}>
      <Flex padding="16px" gap="16px" direction="column">
        <H4>Oops! No connection</H4>
        <BodyText>
          An error occurred. Please try to reload the page. If the issue still
          persists, please ensure you have a stable internet connection.
        </BodyText>
        <Button onClick={handleReload} negative>
          Reload
        </Button>
      </Flex>
    </Modal>
  );
};

export default ConnectionCheckProvider;

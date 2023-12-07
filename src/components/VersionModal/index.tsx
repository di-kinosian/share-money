import { useState, useEffect } from 'react';
import * as s from './styled';
import { FC } from 'react';
import Modal from '../../components/Modal';
import Button from '../Button';
import packageJson from '../../../package.json';

const VERSION_KEY = 'app-version';
const versionFromStorage = localStorage.getItem(VERSION_KEY);

const VersionModal: FC = () => {
  const [showing, setShowing] = useState(
    versionFromStorage !== packageJson.version &&
    versionFromStorage !== null
  );

  useEffect(() => {
    if (!versionFromStorage) {
      localStorage.setItem(VERSION_KEY, packageJson.version);
    }
  }, []);

  const onClose = () => {
    setShowing(false);
    localStorage.setItem('app-versiont', packageJson.version);
  };
  return (
    <Modal onClose={onClose} isOpen={showing}>
      <s.ModalContent>
        <s.Header>Application was updated!</s.Header>
        <s.Release>Version: {packageJson.version}</s.Release>
        <s.ModalButton>
          <Button onClick={onClose} size="small">
            Got it
          </Button>
        </s.ModalButton>
      </s.ModalContent>
    </Modal>
  );
};

export default VersionModal;

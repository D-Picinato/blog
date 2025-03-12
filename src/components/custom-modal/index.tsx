'use client';
import { useCustomModal } from '@/stores/use-custom-modal';
import Modal from 'react-modal';

Modal.setAppElement('body');

export default function CustomModal() {
  const { content, removeModal } = useCustomModal();

  return (
    <Modal
      isOpen={!!content}
      onRequestClose={removeModal}
      ariaHideApp={false}
      style={{
        overlay: {
          background: '#00000033',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        },
        content: {
          position: 'unset',
          background: 'none',
          border: 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 'fit-content',
          height: 'fit-content',
        },
      }}
    >
      <div className="flex p-8 bg-gray-900 rounded-md border border-gray-800">
        {content}
      </div>
    </Modal>
  );
}

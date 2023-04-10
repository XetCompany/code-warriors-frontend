import React from 'react';
import { Modal } from 'antd';
import { observer } from 'mobx-react';
import './style.scss';

const ModalComponent = ({
  title,
  children,
  onOk,
  okText,
  onCancel,
  cancelText,
  isOpen,
  closable,
  centered,
  keyboard,
  mask,
  maskClosable,
  footer,
  ...otherProps
}) => {
  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      okText={okText}
      cancelText={cancelText}
      closable={closable}
      centered={centered}
      keyboard={keyboard}
      mask={mask}
      maskClosable={maskClosable}
      footer={footer}
      {...otherProps}
    >
      {children}
    </Modal>
  );
};

export default observer(ModalComponent);

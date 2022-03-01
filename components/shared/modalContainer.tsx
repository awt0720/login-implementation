import React from "react";
import { FormInstance, Modal } from "antd";

interface IModalContainer {
  open: boolean;
  onClosed: () => void;
  children: React.ReactNode;
}

const ModalContainer: React.FC<IModalContainer> = ({ open, onClosed, children }) => {
  return (
    <Modal visible={open} title="회원가입" okText="Create" cancelText="Cancel" onCancel={onClosed} footer={null}>
      {children}
    </Modal>
  );
};

export default ModalContainer;

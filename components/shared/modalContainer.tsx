import React from "react";
import {Modal, FormInstance} from "antd";

interface IModalContainer {
  form: FormInstance<any>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onCreate: (values) => void;
  children: React.ReactNode;
}

const ModalContainer: React.FC<IModalContainer> = ({form, open, setOpen, onCreate, children}) => {
  return (
    <Modal
      visible={open}
      title="회원가입"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => setOpen(false)}
      onOk={() => {
        form.validateFields().then((values) => {
          form.resetFields();
          onCreate(values);
        });
      }}
    >
      {children}
    </Modal>
  );
};

export default ModalContainer;

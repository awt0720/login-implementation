import React from "react";
import {Form, Button, Input, Modal} from "antd";
import ModalContainer from "./shared/modalContainer";

interface IRegisterProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FC<IRegisterProps> = ({open, setOpen}) => {
  const [form] = Form.useForm();
  const onCreate = (values) => {
    console.log(values);
    alert("회원가입 성공");
  };
  return (
    <Modal
      visible={open}
      title="회원가입"
      okText="Create"
      cancelText="Cancel"
      onCancel={() => setOpen(false)}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} className="form" name="basic" autoComplete="off">
        <Form.Item style={{marginTop: "20px"}} name="name" rules={[{required: true, message: "이름를 입력해주세요."}]}>
          <Input placeholder="이메일" size="large" className="email-input" />
        </Form.Item>
        <Form.Item name="email" rules={[{required: true, message: "아아디를 입력해주세요."}]}>
          <Input placeholder="아이디 (이메일)" size="large" className="id-input" />
        </Form.Item>
        <Form.Item name="password" rules={[{required: true, message: "비밀번호를 입력해주세요."}]}>
          <Input.Password placeholder="비밀번호" size="large" className="password-input" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Register;

import React from "react";
import {Form, Input, Modal} from "antd";
import ModalContainer from "@/components/shared/modalContainer";

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
    <ModalContainer form={form} open={open} setOpen={setOpen} onCreate={onCreate}>
      <Form form={form} className="form" name="basic" autoComplete="off">
        <Form.Item style={{marginTop: "20px"}} name="name" rules={[{required: true, message: "이름를 입력해주세요."}]}>
          <Input placeholder="이름" size="large" className="email-input" />
        </Form.Item>
        <Form.Item
          style={{marginTop: "20px"}}
          name="phone"
          rules={[{required: true, message: "핸드폰 번호를 입력해주세요."}]}
        >
          <Input placeholder="핸드폰번호" size="large" className="email-input" />
        </Form.Item>
        <Form.Item name="email" rules={[{required: true, message: "아아디를 입력해주세요."}]}>
          <Input placeholder="아이디 (이메일)" size="large" className="id-input" />
        </Form.Item>
        <Form.Item name="password" rules={[{required: true, message: "비밀번호를 입력해주세요."}]}>
          <Input.Password placeholder="비밀번호" size="large" className="password-input" />
        </Form.Item>
      </Form>
    </ModalContainer>
  );
};

export default Register;

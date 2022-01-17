import React from "react";
import {Form, Input} from "antd";
import ModalContainer from "@/components/shared/modalContainer";

interface IFindPassword {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FindPassword: React.FC<IFindPassword> = ({open, setOpen}) => {
  const [form] = Form.useForm();
  const onCreate = (values) => {
    console.log(values);
    alert("비밀번호 찾기 성공");
  };
  return (
    <ModalContainer form={form} open={open} setOpen={setOpen} onCreate={onCreate}>
      <Form form={form} className="form" name="basic" autoComplete="off">
        <Form.Item style={{marginTop: "20px"}} name="name" rules={[{required: true, message: "이름를 입력해주세요."}]}>
          <Input placeholder="이름" size="large" className="email-input" />
        </Form.Item>
        <Form.Item name="email" rules={[{required: true, message: "아아디를 입력해주세요."}]}>
          <Input placeholder="아이디 (이메일)" size="large" className="id-input" />
        </Form.Item>
      </Form>
    </ModalContainer>
  );
};

export default FindPassword;

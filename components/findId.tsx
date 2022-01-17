import React from "react";
import {Form, Input} from "antd";
import ModalContainer from "@/components/shared/modalContainer";

interface IFindId {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const FindId: React.FC<IFindId> = ({open, setOpen}) => {
  const [form] = Form.useForm();
  const onCreate = (values) => {
    console.log(values);
    alert("아이디 찾기 성공");
  };
  return (
    <ModalContainer form={form} open={open} setOpen={setOpen} onCreate={onCreate}>
      <Form form={form} className="form" name="basic" autoComplete="off">
        <Form.Item style={{marginTop: "20px"}} name="name" rules={[{required: true, message: "이름를 입력해주세요."}]}>
          <Input placeholder="이름" size="large" className="email-input" />
        </Form.Item>
        <Form.Item name="phone" rules={[{required: true, message: "핸드폰 번호를 입력해주세요."}]}>
          <Input placeholder="핸드폰" size="large" className="id-input" />
        </Form.Item>
      </Form>
    </ModalContainer>
  );
};

export default FindId;

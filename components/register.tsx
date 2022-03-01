import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import ModalContainer from "@/components/shared/modalContainer";
import { signUpApiUrl } from "@/common/url";
import { Spin, Alert } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

interface IRegisterProps {
  open: boolean;
  onClose: () => void;
}

const Register: React.FC<IRegisterProps> = ({ open, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onClosed = () => {
    onClose();
    form.resetFields();
  };

  const onFinish = (params) => {
    setLoading(true);
    fetch(signUpApiUrl, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      mode: "cors",
      body: JSON.stringify(params),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.success) {
          message.success("회원가입 되었습니다.");
          onClosed();
        } else {
          message.warning(res.error.message);
        }
      })
      .catch((e) => message.error("회원가입을 실패했습니다. 다시 시도해주세요."))
      .finally(() => setLoading(false));
  };

  const renderForm = () => (
    <Form form={form} onFinish={onFinish} className="register-form" name="basic" autoComplete="off" {...formItemLayout}>
      <Form.Item
        className="input-item"
        name="name"
        label="이름"
        rules={[{ required: true, message: "이름를 입력해주세요." }]}
      >
        <Input size="large" className="email-input" />
      </Form.Item>
      <Form.Item
        className="input-item"
        name="phone"
        label="핸드폰 번호"
        rules={[{ required: true, message: "핸드폰 번호를 입력해주세요." }]}
      >
        <Input size="large" className="email-input" />
      </Form.Item>
      <Form.Item name="email" label="아이디 (이메일)" rules={[{ required: true, message: "아아디를 입력해주세요." }]}>
        <Input size="large" className="id-input" />
      </Form.Item>
      <Form.Item name="password" label="비밀번호" rules={[{ required: true, message: "비밀번호를 입력해주세요." }]}>
        <Input.Password size="large" className="password-input" />
      </Form.Item>
      <Form.Item className="bottom-btn-wrapper">
        <Button htmlType="button" className="register-cancel-btn" onClick={onClosed}>
          취소
        </Button>
        <Button type="primary" htmlType="submit">
          가입하기
        </Button>
      </Form.Item>
    </Form>
  );

  return (
    <ModalContainer open={open} onClosed={onClosed}>
      {loading ? <Spin tip="Loading...">{renderForm()}</Spin> : renderForm()}
    </ModalContainer>
  );
};

export default Register;

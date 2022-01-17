import React, {useState} from "react";
import {Form, Input, Button} from "antd";
import Register from "@/components/register";

const login = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const onFinish = () => {
    alert("로그인 성공");
  };

  return (
    <div className="container">
      <div className="login-wrapper">
        <div className="top">
          <div className="tit">로그인</div>
        </div>
        <Form
          className="form"
          name="basic"
          labelCol={{span: 8}}
          wrapperCol={{span: 16}}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item wrapperCol={{md: 24}} name="id" rules={[{required: true, message: "아아디를 입력해주세요."}]}>
            <Input placeholder="아이디 (이메일)" size="large" className="id-input" />
          </Form.Item>
          <Form.Item
            wrapperCol={{md: 24}}
            name="password"
            rules={[{required: true, message: "비밀번호를 입력해주세요."}]}
          >
            <Input.Password placeholder="비밀번호" size="large" className="password-input" />
          </Form.Item>
          <Form.Item wrapperCol={{md: 24}}>
            <Button className="btn" type="primary" htmlType="submit">
              LOGIN
            </Button>
          </Form.Item>
          <div className="etc">
            <div>아이디 찾기</div>
            <div>비밀번호 찾기</div>
          </div>
        </Form>
        <div className="bottom">
          <div className="tit">SNS 계정으로 로그인하기</div>
          <ul className="sns-list">
            <li>카카오톡</li>
            <li>네이버</li>
            <li>페이스북</li>
          </ul>
        </div>
        <Button onClick={() => setIsModal(true)}>간편 회원가입</Button>
      </div>
      <Register open={isModal} setOpen={setIsModal} />
    </div>
  );
};

export default login;

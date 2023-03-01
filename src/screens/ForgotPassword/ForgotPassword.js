import React, { useState } from "react";
import "./ForgotPassword.css";
import { Link } from "react-router-dom";
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const resetPassword = () => {
    // Kiểm tra email có hợp lệ hay không
    if (/\S+@\S+\.\S+/.test(email)) {
      // Gửi yêu cầu reset mật khẩu đến email
      // Ở đây là nơi bạn thực hiện việc gửi email reset mật khẩu
      setMessage(<p style={{color: "blue"}}>Email chính xác</p>);
      // Thêm lớp success-message cho phần tử p
    } else {
      // Hiển thị thông báo lỗi nếu email không hợp lệ
      setMessage(<p style={{color: "red"}}>Email không chính xác vui lòng nhập lại</p>);
    }
  };

  return (
    <div className="forget">
      <h1>Quên mật khẩu</h1>
      <p>Nhập email của bạn để lấy lại mật khẩu !</p>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email của bạn ..."
        required
        style={{
          textAlign: "center",display:"block",margin:"0 auto",
          padding:"10px 10%",borderRadius:"10px",marginTop:"50px",
          fontSize:"large",boxShadow: "2px 8px 16px 0 gray",
        }}
      />
      <button className="reset" type="submit" onClick={resetPassword}>
      <Link to="/register" style={{color:"white"}}> Lấy lại mật khẩu</Link></button>
      {/* <Button type="primary" htmlType="submit" onClick={resetPassword}>Quang Thanh</Button> */}
      <p>{message}</p>
    </div>
  );
}

export default ForgotPassword;
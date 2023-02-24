import { Breadcrumb, theme } from "antd";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/features/user";
import Banner from "../components/Banner";

export default function HomeScreen() {
  const dispatch = useDispatch();

  const handleGetUser = useCallback(async () => {
    const data = await dispatch(getUser({username: 'Ky'}));
    console.log(data);
  }, []);
  handleGetUser();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      <div>
        <img
          style={{
            display: "block",
            maxWidth: "100%",
            boxShadow: "2px 2px 2px 6px #AAA",
            marginTop: "1vw",
          }}
          src="https://mybic.vn/uploads/slide/28/San-pham-MC.jpg"
        />
      </div>
      <div className="flex mx-20 p-20 gap-10">
        <div className="flex flex-col gap-6">
          <div className="border rounded-xl bg-blue-300 p-4 hover:bg-white cursor-pointer">
            Xe máy dưới 50 phân khối (dưới 50cc)
          </div>
          <div className="border rounded-xl bg-blue-300 p-4 hover:bg-white cursor-pointer">
            Xe máy (moto) trên 50 phân khối
          </div>
          <div className="border rounded-xl bg-blue-300 p-4 hover:bg-white cursor-pointer">
            Xe máy phân khối lớn (trên 175cc)
          </div>
        </div>
        <div className="rounded-2xl border-2 grow bg-slate-100 px-10 py-5">
          <div className="">
            <h1 className="text-3xl font-bold text-center">
              Bảo hiểm xe máy dưới 50 phân khối
            </h1>
          </div>
          <div className="flex gap-10 py-10 items-center">
            <img src="https://picsum.photos/300/300" alt="" />
            <div className="">
              <p>Phân khúc: dưới 50cc</p>
              <p>Giá bán: 60asdasd</p>
              <p>Thời gian sử dụng: 1 năm</p>
            </div>
          </div>
          <div className="space-x-5 flex justify-end">
            <button className="border-2 rounded-lg bg-blue-600 text-white px-5 py-2">
              Chi tiết
            </button>
            <button className="px-5 py-2">Mua ngay</button>
          </div>
        </div>
      </div>
    </div>
  );
}

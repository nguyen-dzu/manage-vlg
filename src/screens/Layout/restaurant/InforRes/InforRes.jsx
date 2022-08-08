import { Image, Layout, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hook/useRedux";
import bannerRestaurant from "../../../../assets/img/restaurantnoAvatar.png";
import apiService from "../../../../api/apiService";
import "./index.scss";
import { HddFilled } from "@ant-design/icons";
export default function InforRes() {
  const [profileRes, setProfileRes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRestaurantProfile = async () => {
      const reponse = await apiService.getRestaurantProfile();
      const { data } = reponse;
      setProfileRes(data);
      setTimeout(() => {
        setLoading(false);
      });
    };
    fetchRestaurantProfile();
  }, []);

  return (
    <Layout>
      <div
        style={{
          marginTop: 10,
        }}
      >
        <span
          style={{
            color: "#c02424",
            fontSize: 20,
            fontWeight: "600",
          }}
        >
          Thông Tin Quán
        </span>
        <div
          style={{
            width: "100%",
            height: 5,
            backgroundColor: "#C02424",
          }}
        ></div>
      </div>
      <Layout
        style={{
          background: "#fff",
        }}
      >
        <Spin spinning={loading}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                width: "30%",
                marginTop: 15,
                marginLeft: 20,
                marginRight: 30,
              }}
            >
              {profileRes.banner ? (
                <Image
                  src={`http://localhost:8500/${profileRes.banner}`}
                  width="100%"
                  style={{
                    borderRadius: 20,
                  }}
                />
              ) : (
                <Image
                  src={bannerRestaurant}
                  width="100%"
                  style={{
                    borderRadius: 20,
                  }}
                />
              )}
            </div>
            <div
              style={{
                width: "100%",
              }}
            >
              <div
                style={{
                  marginTop: 15,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h1
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    color: "#777777",
                  }}
                >
                  {profileRes.name}
                </h1>
              </div>
              {profileRes.isActive ? (
                <span
                  style={{
                    color: "#28a745",
                  }}
                >
                  Đang Hoạt Động
                </span>
              ) : (
                <span
                  style={{
                    color: "#bd2130",
                  }}
                >
                  Ngưng Hoạt Động
                </span>
              )}

              <div className="containerInfo">
                <span className="title">Địa Chỉ</span>
                <div className="containerDesx">
                  <HddFilled
                    style={{
                      marginLeft: 10,
                    }}
                  />
                  <span className="desc">{profileRes.address}</span>-
                  <span className="desc">
                    {profileRes.addressType == 0
                      ? "Trong Khuôn Viên Trường"
                      : profileRes.addressType == 1
                      ? "Cổng Đặng Thùy Trâm"
                      : profileRes == 2
                      ? "Cổng Dương Quảng Hàm"
                      : ""}
                  </span>
                </div>
              </div>
              <div className="containerInfo">
                <span className="title">Chủ Sở Hữu</span>
                <div className="containerDesx">
                  <HddFilled
                    style={{
                      marginLeft: 10,
                    }}
                  />
                  <span className="desc">{profileRes.user?.fullName}</span>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </Layout>
    </Layout>
  );
}

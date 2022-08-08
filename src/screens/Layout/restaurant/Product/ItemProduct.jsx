import { Button, Col, Image } from "antd";
import React from "react";
import nofood from "../../../../assets/img/nofood.png";

export default function ItemProduct({ item }) {
  return (
    <>
      <div>
        {item.image ? (
          <Image
            style={{
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              height: 180,
            }}
            src={`http://localhost:8500/${item.image}`}
          />
        ) : (
          <Image src={nofood} />
        )}
      </div>
      <div
        style={{
          padding: 10,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontWeight: "600",
              fontSize: 18,
            }}
          >
            {item.name}
          </span>
          <span
            style={{
              fontWeight: "600",
              fontSize: 18,
            }}
          >
            {item.price.toLocaleString("vi", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
        <span
          style={{
            color: "#777777",
            fontSize: 15,
            fontWeight: "500",
          }}
        >
          {item.description}
        </span>
      </div>
    </>
  );
}

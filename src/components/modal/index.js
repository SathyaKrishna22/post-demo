import React, { useEffect, useState } from "react";
import { Avatar, List, message, Button, Modal } from "antd";
import axios from "axios";
import { loginStatus } from "../../atoms";
import {
  EditFilled,
  CloseSquareOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { useRecoilState } from "recoil";

const PostModal = (props) => {
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [render, setRender] = useState(false);

  const showModalDelete = () => {
    setOpenDelete(true);
  };

  const handleCancel = () => {
    setLoading(false);
    props.setOpen(false);
    setEditable(false);
  };

  useEffect(() => {
    setRender(!render);
  }, [props]);

  const handleOk = () => {
    setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    //   setOpen(false);
    // }, 3000);

    try {
      fetch(
        `https://jsonplaceholder.typicode.com/posts/${props.selectedItem[0].id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            id: props.selectedItem[0].id,
            title: title,
            body: body,
            userId: props.selectedItem[0].userId,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => handleCancel())
        .then((json) => console.log(json))
        .then(() => message.success("Updated Successfully!"));
    } catch (err) {
      console.log({ err });
      message.error("Something went wrong!");
    }
  };

  const hideModalDelete = () => {
    setOpenDelete(false);

    // setOpen(false);
    setEditable(false);
  };

  const handleRenderModal = (_item) => {
    return (
      <Modal
        open={props.open}
        width={900}
        closable={false}
        title={
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ textAlign: "left" }}>View Post</div>
            <div
              style={{ textAlign: "right", cursor: "pointer" }}
              title={!editable ? "Make Editable" : "Discard"}
            >
              {!editable ? (
                <>
                  <span onClick={() => setEditable(!editable)}>
                    {" "}
                    <EditFilled />{" "}
                  </span>

                  <span
                    style={{ marginLeft: "20px" }}
                    onClick={() => showModalDelete()}
                  >
                    <DeleteFilled />
                  </span>
                </>
              ) : (
                <span onClick={() => setEditable(false)}>
                  <CloseSquareOutlined />
                </span>
              )}
            </div>
          </div>
        }
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          editable
            ? [
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={handleOk}
                >
                  Submit
                </Button>,
              ]
            : false
        }
      >
        <List
          itemLayout="vertical"
          dataSource={_item}
          style={{ cursor: "pointer" }}
          renderItem={(item) => (
            <List.Item style={{ padding: "0px", marginRight: "14px" }}>
              <List.Item.Meta
                //   avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={
                  <div>
                    <p>Title</p>
                    <input
                      style={{
                        width: "100%",
                        border: "none",
                        padding: "10px",
                      }}
                      type="text"
                      onChange={(e) => setTitle(e.target.value)}
                      defaultValue={item.title}
                      disabled={!editable}
                    />
                  </div>
                }
                description={
                  <div>
                    <p>Body:</p>
                    <textarea
                      style={{
                        width: "100%",
                        border: "none",
                        padding: "10px",
                        height: "20vh",
                      }}
                      onChange={(e) => setBody(e.target.value)}
                      defaultValue={item.body}
                      disabled={!editable}
                    ></textarea>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
    );
  };

  const handleDelete = () => {
    setLoading(true);
    try {
      fetch(
        `https://jsonplaceholder.typicode.com/posts/${props.selectedItem[0].id}`,
        {
          method: "DELETE",
        }
      )
        .then((response) => hideModalDelete())
        .then((response) => props.setOpen(false))
        .then((response) => setLoading(false))
        .then((response) => message.success("Deleted Successfully"));
    } catch (err) {
      console.log({ err });
      message.error("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div>
      {render || (!render && handleRenderModal(props.selectedItem))}

      <Modal
        title="Confirmation"
        open={openDelete}
        onOk={handleDelete}
        onCancel={hideModalDelete}
        okText="Delete"
        cancelText="Cancel"
        key={props.selectedItem[0].id}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleDelete}
          >
            Submit
          </Button>,
        ]}
      >
        Are you sure you wanna delete this post?
      </Modal>
    </div>
  );
};

export default PostModal;

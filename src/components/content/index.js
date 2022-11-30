import React, { useEffect, useState } from "react";
import { Avatar, List, message, Button, Modal } from "antd";
import axios from "axios";
import { loginStatus, userData } from "../../atoms";
import {
  EditFilled,
  CloseSquareOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { useRecoilState } from "recoil";
import PostModal from "../modal";

const Posts = () => {
  const [posts, setPosts] = useState();
  const [loginStatusState, setLoginStatus] = useRecoilState(loginStatus);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [editable, setEditable] = useState(false);
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [userDataState, setUserDataState] = useRecoilState(userData);

  useEffect(() => {
    getPosts();
    let token = localStorage.getItem("access_token");
    if (token === "") {
    } else {
      setLoginStatus(true);
    }
  }, []);

  useEffect(() => {}, [selectedItem]);

  const showModal = () => {
    setOpen(true);
  };

  const getPosts = async () => {
    try {
      let response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
            RequestModelQuery: JSON.stringify({}),
          },
          // params: {
          //   courseId: _selectedCourse,
          // },
        }
      );
      if (response && response.data) {
        setPosts(response.data);
      } else {
        message.error("Something went wrong, please refresh the page!");
      }
      //   setPosts(response);
    } catch (err) {
      message.error("Something went wrong!");
      console.log("err", err);
    }
  };

  const handleClickPost = (item) => {
    if (loginStatusState) {
      let temp = [];
      temp.push(item);
      setSelectedItem(temp);
      showModal();
      // handleRenderModal(temp);
    } else {
      message.info("Please login to edit or view");
      selectedItem([]);
    }
  };
  return (
    <>
      <div>
        {userDataState && (
          <div
            style={{
              textAlign: "center",
              marginBottom: "5px",
              fontStyle: "italic",
            }}
          >
            Hello, {userDataState.name}
          </div>
        )}
        {posts && (
          <List
            itemLayout="vertical"
            dataSource={posts}
            style={{ cursor: "pointer" }}
            renderItem={(item) => (
              <List.Item onClick={() => handleClickPost(item)}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={
                        userDataState
                          ? userDataState.imageUrl
                          : "https://joeschmoe.io/api/v1/random"
                      }
                    />
                  }
                  title={
                    <h1 style={{ margin: 0 }} href="https://ant.design">
                      {item.title}
                    </h1>
                  }
                  description={item.body}
                />
              </List.Item>
            )}
          />
        )}
      </div>
      {/* {selectedItem && } */}
      {selectedItem && (
        <PostModal selectedItem={selectedItem} open={open} setOpen={setOpen} />
      )}
    </>
  );
};

export default Posts;

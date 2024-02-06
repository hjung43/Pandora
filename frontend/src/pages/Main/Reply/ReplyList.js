import { useState, useEffect } from "react";
import axios from "axios";

import style from "./ReplyList.module.css";
import ReplyItem from "./ReplyItem";

const ReplyList = ({ articleId, commentId }) => {
  const token = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  const [replyList, setReplyList] = useState([]);

  const page = 0; // test - 수정 필요

  useEffect(() => {
    getReplyList();
  }, []);

  // axios : 답글 목록 조회
  const getReplyList = () => {
    console.log(articleId);
    console.log(commentId);
    axios
      .get(`/api/articles/${articleId}/comments/${commentId}/replies`, {
        params: {
          page,
        },
        headers: {
          authorization: `Bearer ${token}`,
          refreshtoken: refreshToken,
        },
      })
      .then((res) => {
        console.log("답글 목록 조회 성공", res);
        setReplyList(res.data.data.content);
      })
      .catch((err) => {
        console.log("답글 목록 조회 실패", err);
      });
  };

  // className={`${}`}
  return (
    <div className={`${style.ReplyList}`}>
      {replyList.map((reply) => (
        <ReplyItem
          key={reply.id}
          {...reply}
          articleId={articleId}
          commentId={commentId}
        />
      ))}
    </div>
  );
};

export default ReplyList;

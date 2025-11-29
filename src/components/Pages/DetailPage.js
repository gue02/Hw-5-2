import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_URL = "https://6915405284e8bd126af9390b.mockapi.io/Hw4-2";

export default function DetailPage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [game, setGame] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const loadGame = async () => {
      const res = await fetch(`${API_URL}/${id}`);
      const data = await res.json();
      setGame(data);
    };

    loadGame();
  }, [id]);

  if (!id) {
    return (
      <div className="container py-4">
        <h1 className="mb-3">게임 상세</h1>
        <p>id 파라미터가 없습니다.</p>
        <button className="btn btn-secondary" onClick={() => navigate("/list")}>
          목록으로
        </button>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="container py-4">
        <h1 className="mb-3">게임 상세</h1>
        <p>로딩 중...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">게임 상세</h1>

      <table className="table table-bordered">
        <tbody>
          <tr>
            <th style={{ width: "150px" }}>ID</th>
            <td>{game.id}</td>
          </tr>
          <tr>
            <th>이름</th>
            <td>{game.name}</td>
          </tr>
          <tr>
            <th>가격</th>
            <td>{game.price}</td>
          </tr>
          <tr>
            <th>메모리</th>
            <td>{game.memory || "-"}</td>
          </tr>
          <tr>
            <th>카테고리</th>
            <td>{game.category || "-"}</td>
          </tr>
        </tbody>
      </table>

      <button
        className="btn btn-warning me-2"
        onClick={() => navigate(`/update?id=${game.id}`)}
      >
        수정하러 가기
      </button>
      <button className="btn btn-secondary" onClick={() => navigate("/list")}>
        목록으로
      </button>
    </div>
  );
}

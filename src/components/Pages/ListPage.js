import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://6915405284e8bd126af9390b.mockapi.io/Hw4-2";

export default function ListPage() {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  const loadGames = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setGames(data);
  };

  useEffect(() => {
    loadGames();
  }, []);

  const deleteGame = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadGames();
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">게임 목록</h1>

      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/update")} 
      >
        새 항목 추가
      </button>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>이름</th>
            <th>가격</th>
            <th>메모리</th>
            <th>카테고리</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game) => (
            <tr key={game.id}>
              <td>{game.id}</td>
              <td>{game.name}</td>
              <td>{game.price}</td>
              <td>{game.memory || "-"}</td>
              <td>{game.category || "-"}</td>
              <td>
                <button
                  className="btn btn-sm btn-info me-2"
                  onClick={() => navigate(`/detail?id=${game.id}`)}
                >
                  상세
                </button>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => navigate(`/update?id=${game.id}`)}
                >
                  수정
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => deleteGame(game.id)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}

          {games.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">
                데이터가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

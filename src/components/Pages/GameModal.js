import React, { useState, useEffect } from "react";

const API_URL = "https://6915405284e8bd126af9390b.mockapi.io/Hw4-2";

export default function GameModal({ game, reload }) {
  const [formData, setFormData] = useState({ name: "", price: "", memory: "", category: "" });

  useEffect(() => {
    if (game) {
      setFormData({
        name: game.name,
        price: game.price,
        memory: game.memory || "",
        category: game.category || ""
      });
    } else {
      setFormData({ name: "", price: "", memory: "", category: "" });
    }
  }, [game]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const saveGame = async () => {
    if (!formData.name || !formData.price) {
      alert("이름과 가격은 필수입니다.");
      return;
    }

    if (game) {
      await fetch(`${API_URL}/${game.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
    }

    reload();
    document.querySelector("#closeModal").click();
  };

  return (
    <div className="modal fade" id="gameModal" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{game ? "게임 수정" : "게임 추가"}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">이름</label>
              <input type="text" id="name" className="form-control" value={formData.name} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">가격</label>
              <input type="number" id="price" className="form-control" value={formData.price} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">메모리</label>
              <input type="text" id="memory" className="form-control" value={formData.memory} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">카테고리</label>
              <input type="text" id="category" className="form-control" value={formData.category} onChange={handleChange} />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" id="closeModal" className="btn btn-secondary" data-bs-dismiss="modal">취소</button>
            <button type="button" className="btn btn-primary" onClick={saveGame}>저장</button>
          </div>
        </div>
      </div>
    </div>
  );
}

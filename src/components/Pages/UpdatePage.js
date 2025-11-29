import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const API_URL = "https://6915405284e8bd126af9390b.mockapi.io/Hw4-2";

export default function UpdatePage() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const isUpdateMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    memory: "",
    category: "",
  });

  const [editCount, setEditCount] = useState(0);

  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const memoryRef = useRef(null);
  const categoryRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      if (isUpdateMode) {
        const res = await fetch(`${API_URL}/${id}`);
        const data = await res.json();
        setFormData({
          name: data.name ?? "",
          price: data.price ?? "",
          memory: data.memory ?? "",
          category: data.category ?? "",
        });
        setEditCount(0);
      } else {
        setFormData({
          name: "",
          price: "",
          memory: "",
          category: "",
        });
        setEditCount(0);
      }
    };
    init();
  }, [id, isUpdateMode]);

  const updateGameApi = async (newData) => {
    if (!isUpdateMode) return;
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
  };

  const handleChange = async (e) => {
    const { id: fieldId, value } = e.target;
    const newData = {
      ...formData,
      [fieldId]: value,
    };

    setFormData(newData);
    setEditCount((prev) => prev + 1);

    if (isUpdateMode) {
      await updateGameApi(newData);
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      alert("이름을 입력하세요.");
      if (nameRef.current) {
        nameRef.current.focus();
      }
      return false;
    }
    if (!String(formData.price).trim()) {
      alert("가격을 입력하세요.");
      if (priceRef.current) {
        priceRef.current.focus();
      }
      return false;
    }
    return true;
  };

  const handleCreate = async () => {
    if (!validateForm()) return;

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    alert("새 게임이 등록되었습니다.");
    navigate("/list");
  };

  const handleBlur = (e) => {
    const { id: fieldId } = e.target;

    if (fieldId === "name" && !formData.name.trim()) {
      alert("이름은 필수입니다.");
      if (nameRef.current) nameRef.current.focus();
    }

    if (fieldId === "price" && !String(formData.price).trim()) {
      alert("가격은 필수입니다.");
      if (priceRef.current) priceRef.current.focus();
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-3">{isUpdateMode ? "게임 수정" : "게임 등록"}</h1>

      <p className="text-muted">
        {isUpdateMode
          ? `입력값이 변경될 때마다 즉시 저장됩니다. (총 수정 횟수: ${editCount}회)`
          : `입력 후 "등록" 버튼을 누르면 생성됩니다. (입력 중 수정 횟수: ${editCount}회)`}
      </p>

      <div className="mb-3">
        <label className="form-label">이름*</label>
        <input
          type="text"
          id="name"
          className="form-control"
          ref={nameRef}
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">가격*</label>
        <input
          type="number"
          id="price"
          className="form-control"
          ref={priceRef}
          value={formData.price}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">메모리</label>
        <input
          type="text"
          id="memory"
          className="form-control"
          ref={memoryRef}
          value={formData.memory}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">카테고리</label>
        <input
          type="text"
          id="category"
          className="form-control"
          ref={categoryRef}
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      <div className="mt-4">
        {!isUpdateMode && (
          <button className="btn btn-primary me-2" onClick={handleCreate}>
            등록
          </button>
        )}
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/list")}
        >
          목록으로
        </button>
      </div>
    </div>
  );
}

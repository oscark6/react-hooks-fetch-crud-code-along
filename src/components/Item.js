// src/components/Item.js

import React from "react";

function Item({ item, onUpdateItem, onDeleteItem }) {
  function handleAddToCartClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => onUpdateItem(updatedItem));
  }

  function handleDeleteClick() {
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "DELETE",
    })
      .then(() => onDeleteItem(item))
      .catch((error) => console.error("Error deleting item:", error));
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleAddToCartClick}>
        {item.isInCart ? "Remove From Cart" : "Add to Cart"}
      </button>
      <button onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default Item;

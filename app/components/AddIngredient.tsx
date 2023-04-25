"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function AddIngredient() {
  const [ingredientName, setIngredientName] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  // Create an Ingredient
  const { mutate } = useMutation(
    async (ingredientName: string) =>
      await axios.post("/api/ingredients/addIngredient", { ingredientName }),
    {
      onError: (error) => {
        console.log(error);
      },
      onSuccess: (data) => {
        setIngredientName("");
        setIsDisabled(false);
      },
    }
  );

  const submitIngredient = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDisabled(true);
    mutate(ingredientName);
  };

  return (
    <form onSubmit={submitIngredient} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <label className="block text-gray-700 text-lg font-bold mb-2 p-2">
          Ingredient Name
        </label>
        <input
          onChange={(e) => setIngredientName(e.target.value)}
          name="ingredientName"
          value={ingredientName}
          placeholder="canned tomato"
          className="p-4 text-lg rounded-md my-2  bg-gray-200"
        ></input>
      </div>
      <div>
        <button
          disabled={isDisabled}
          className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
          type="submit"
        >
          Add an Ingredient
        </button>
      </div>
    </form>
  );
}

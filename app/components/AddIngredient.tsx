'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from "axios"

export default function AddIngredient(){
    const [title, setTitle] = useState("")
    const [isDisabled, setIsDisabled] = useState(false)

    // Create an Ingredient
    const {mutate} = useMutation(
        async (title) => await axios.post('/api/ingredients/addIngredient', { title })
    )
    return(
        <form className="bg-white my-8 p-8 rounded-md">
            <div className='flex flex-col my-4'>
                <textarea onChange={(e) => setTitle(e.target.value)}
                name="title" 
                value={title}
                placeholder="canned tomato"
                className='p-4 text-lg rounded-md my-2  bg-gray-200'
                ></textarea>
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
    )
}
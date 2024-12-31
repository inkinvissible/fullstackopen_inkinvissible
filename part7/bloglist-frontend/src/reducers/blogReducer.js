import blogService from "../services/blogs"
import { createSlice } from "@reduxjs/toolkit"

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action){
            return action.payload
        },
        appendBlog(state, action){
            state.push(action.payload)
        },
        likeBlog(state, action){
            const id = action.payload.id
            return state.map(a => a.id === id ? action.payload : a)
        },
        filterBlog(state, action){
            const id = action.payload.id
            return state.filter(d => d.id !== id)
        },
        setComment(state, action){
            const id = action.payload.id
            const comment = action.payload.comment
            return state.map(a => a.id === id ? {...a, comments: a.comments.concat(comment)} : a)
        }
        
    }
})

export const {setBlogs, appendBlog, likeBlog, filterBlog, setComment} = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const response = await blogService.getAll()
        dispatch(setBlogs(response))
    }
}

export const createBlog = (newObject) => {
    return async dispatch => {
        const response = await blogService.create(newObject)
        dispatch(appendBlog(response))
    }
}

export const addLike = content =>{
    return async dispatch => {
        const newContent = {...content, likes: content.likes + 1}
        const response = await blogService.update(newContent.id, newContent)
        dispatch(likeBlog(response))
    }
}

export const removeBlog = id => {
    return async dispatch =>{
        const response = await blogService.deleteBlog(id)
        dispatch(filterBlog({ id }))
    }
}

export const addComent = (id, content) =>{
    return async dispatch =>{
        const response = await blogService.addComent(id, content)
        const comment = response.comments[response.comments.length - 1]
        dispatch(setComment({ id, comment }))
    }
}


export default blogSlice.reducer

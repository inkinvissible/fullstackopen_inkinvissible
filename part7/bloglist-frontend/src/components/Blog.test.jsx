import { render, screen, waitFor } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { describe, test, vi, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blogs'
vi.mock('../services/blogs')


test('renders title and author', () => {
  const blog = {
    title: 'Component Testing rendering Blog',
    author: 'inkinvissible',
    url: 'google.com',
    likes: 2
  }

  const user = userEvent.setup()
  const { container } = render(<Blog blog={blog} user={user} />)

  const paragraphTitleAuthor = container.querySelector('.blogTitleAuthor')
  const blogDetails = container.querySelector('.blogDetails')
  expect(paragraphTitleAuthor).toHaveTextContent(
    'Component Testing rendering Blog inkinvissible show'
  )
  expect(blogDetails).toHaveStyle('display: none')
})

test('shows URL and likes when clicked the show button', async () => {
  const blog = {
    title: 'Component Testing rendering Blog',
    author: 'inkinvissible',
    url: 'google.com',
    likes: 2
  }

  const user = userEvent.setup()
  const { container } = render(<Blog blog={blog} user={user} />)

  const button = screen.getByText('show')
  await user.click(button)

  const blogDetails = container.querySelector('.blogDetails')
  expect(blogDetails).not.toHaveStyle('display: none')

  expect(blogDetails).toHaveTextContent('URL: google.com')
  expect(blogDetails).toHaveTextContent('Likes: 2')
})

test('calls updateBlog twice when like button is clicked twice', async () => {
  const mockBlog = {
    title: 'Test Blog',
    author: 'Author',
    url: 'http://testurl.com',
    likes: 0
  }
  const mockUpdateBlog = vi.fn()
  const mockNotificationRef = {
    current: {
      setNotification: vi.fn(),
      setErrorNotification: vi.fn()
    }
  }
  const mockUser = { username: 'Author' }

  blogService.update.mockResolvedValue({ ...mockBlog, likes: mockBlog.likes + 1 })

  const user = userEvent.setup()
  render(
    <Blog
      blog={mockBlog}
      updateBlog={mockUpdateBlog}
      notificationRef={mockNotificationRef}
      user={mockUser}
    />
  )

  const showButton = screen.getByText('show')
  await user.click(showButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  await waitFor(() => expect(mockUpdateBlog).toHaveBeenCalledTimes(2))
})
test('the form calls the event controller when submitted', async () => {
  const blog = {
    title: 'Test Blog',
    author: 'Author',
    url: 'http://testurl.com',
    likes: 0
  }
  const mockNotificationRef = {
    current: {
      setNotification: vi.fn(),
      setErrorNotification: vi.fn()
    }
  }
  const mockSetBlogs = vi.fn()
  const user = userEvent.setup()

  render(
    <BlogForm
      blogs={[]}
      setBlogs={mockSetBlogs}
      notificationRef={mockNotificationRef}
    />
  )

  const titleInput = screen.getByPlaceholderText('Title...')
  const authorInput = screen.getByPlaceholderText('Author...')
  const urlInput = screen.getByPlaceholderText('URL...')
  await user.type(titleInput, blog.title)
  await user.type(authorInput, blog.author)
  await user.type(urlInput, blog.url)

  const submitButton = screen.getByText('Crear blog')
  await user.click(submitButton)

  expect(blogService.create).toHaveBeenCalledWith({
    title: blog.title,
    author: blog.author,
    url: blog.url
  })

  expect(blogService.create.call).toHaveLength(1)
})
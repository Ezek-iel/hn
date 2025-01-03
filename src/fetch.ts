export async function fetchFromURL() {
    const response = await fetch('http://127.0.0.1:5000/api/v1/blogs')
    const data: BlogResponse = await response.json()
    return data
}

interface BlogResponse {
    blogs: Array<BlogItem>
}

interface BlogItem {
    id: string
    title: string
    content: string
    created: string
    updated: string | null
    likes: number
    comments_number: number
    author_id: string
    comments_url: string
    author_name: string
}


export async function fetchPost() {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
    const data: number[] = await response.json()
    return data
}

export async function fetchPostDetails(id: number) {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
    const data: Post = await response.json()
    return data
}

interface Post {
    by: string;
    score: number;
    text: string;
    title: string;
    url: string
}

export async function getPosts(container: HTMLElement) {
    const posts = await fetchPost()
    const postDetails = posts.map(fetchPostDetails)
    const allposts = await Promise.all(postDetails)
    container.empty()
    console.trace(allposts.slice(0,9))
    allposts.slice(0, 9).map(data => {
        const div = container.createDiv({cls: 'box'})	
        div.createEl('h2', { text: data.title })
        div.createEl('p', { text: `by ${data.by}`, cls: 'author' })
        div.createEl('p', { text: String(data.score) })
        div.createEl('p', { text: data.text })
        div.createEl('a', { text: 'Read More', attr: { href: data.url } })
    })
}

export function createLoader(container: HTMLElement) {
    const bg = container.createDiv({ cls: 'bg' })
    bg.createEl('div', {cls: 'loader'})
}

export function error(container: HTMLElement){
    container.empty()
    
    container.createEl('h2', {text: 'Error loading posts', cls: "error"})
}
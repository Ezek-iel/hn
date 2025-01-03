import { ItemView, WorkspaceLeaf, Plugin } from "obsidian"
import { fetchFromURL } from "./fetch"

export const VIEW_TYPE = 'posts_view'

export class PostsView extends ItemView {
	constructor(leaf: WorkspaceLeaf) {
		super(leaf)
		this.icon = "newspaper"
	}

	/** Return a unique identifier for the view */
	getViewType(): string {
		return VIEW_TYPE
	}

	/** Return a human friendly name for the view*/
	getDisplayText(): string {
		return "Latest Posts"
	}

	protected async onOpen(): Promise<void> {
		const container = this.containerEl.children[1]
		container.empty()

		const box = container.createDiv({ cls: "bg" })
		box.createEl('div', { cls: 'loader' })

		const data = await fetchFromURL()

		container.empty()
		data.blogs.forEach(blog => {
			container.createEl('h4', { text: blog.title })
		});

	}

	protected async onClose(): Promise<void> {
		// Nothing to clean up
	}
}

export default class HNPlugin extends Plugin {
	async onload(): Promise<void> {
		this.registerView(VIEW_TYPE, (leaf) => new PostsView(leaf))

		this.addRibbonIcon('newspaper', 'View Latest Posts', () => {
			this.activateView()
		})
	}

	async activateView() {
		const { workspace } = this.app
		let leaf: WorkspaceLeaf | null;
		const leaves = workspace.getLeavesOfType(VIEW_TYPE)

		if (leaves.length > 0) {
			// If a lead already exists in our view, use that
			leaf = leaves[0]
		} else {
			// Else create a new leaf in the right sidebar
			leaf = workspace.getRightLeaf(false);
			await leaf?.setViewState({
				type: VIEW_TYPE, active: true
			})
		}
		if (leaf) workspace.revealLeaf(leaf)
	}
}
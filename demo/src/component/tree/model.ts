import { Inode } from "vfs-frontend";

export class TInode extends Inode {

    public children!: TInode[]

    constructor() {
        super();
        this.init()
    }

    public init(): void {
        this.children = []
    }

    public setChildren(c: TInode[]): this {
        this.children = c || []
        return this
    }

}

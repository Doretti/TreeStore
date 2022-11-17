interface IItem {
    id: number | string;
    parent?: number | string
    type?: string | null
}

export default class TreeStore {
    readonly items: Map<number | string, IItem> = new Map<number | string, IItem>;
    constructor(items: IItem[]) {
        items.forEach((item: IItem) => this.items.set(item.id, item))
    }

    public getAll = (): IItem[] => Array.from(this.items.values())
    public getItem = (id: number | string): IItem | undefined => this.items.get(id)
    public getChildren = (id: number | string): IItem[] => {
        const result: IItem[] = []
        this.items.forEach((item: IItem) => {
            if (item.parent === id) {
                result.push(item)
            }
        })
        return result
    }

    public getAllChildren = (id: number | string): IItem[] => {
        const result: IItem[] = []
        this.items.forEach((item: IItem) => {
            if (item.parent === id) {
                result.push(item)
            }
        })
        result.forEach((item: IItem) => {
            result.push(...this.getChildren(item.id))
        })
        return result
    }

    private getParent = (id: number | string): IItem | undefined => {
        const item = this.items.get(id)
        if (item?.parent)
            return this.items.get(item.parent)
    }

    public getAllParents = (id: number | string): IItem[] => {
        const result: IItem[] = []
        const firstParent = this.getParent(id)
        if (!firstParent) {
            return result
        }
        result.push(firstParent)
        for (const item of result) {
            if (item?.parent) {
                const parent = this.getItem(item.parent)
                
                if (parent) result.push(parent)
            }
        }
        
        return result
    }
}
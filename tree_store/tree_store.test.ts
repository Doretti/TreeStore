import TreeStore from "./tree_store";

const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },

    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items)

test('Get All items', () => {
    expect(JSON.stringify(ts.getAll())).toBe(JSON.stringify(items))
})

test('Get item', () => {
    expect(JSON.stringify(ts.getItem(1))).toBe(JSON.stringify({ id: 1, parent: 'root' }))
    expect(JSON.stringify(ts.getItem(2))).toBe(JSON.stringify({ id: 2, parent: 1, type: 'test' }))
    expect(JSON.stringify(ts.getItem(3))).toBe(JSON.stringify({ id: 3, parent: 1, type: 'test' }))
    expect(JSON.stringify(ts.getItem(4))).toBe(JSON.stringify({ id: 4, parent: 2, type: 'test' }))
    expect(JSON.stringify(ts.getItem(5))).toBe(JSON.stringify({ id: 5, parent: 2, type: 'test' }))
})

test('Get Children', () => {
    expect(JSON.stringify(ts.getChildren(1))).toBe(JSON.stringify([{ id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' }]))
    expect(JSON.stringify(ts.getChildren(2))).toBe(JSON.stringify([{ id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' }]))
    expect(JSON.stringify(ts.getChildren(4))).toBe(JSON.stringify([{ id: 7, parent: 4, type: null },
        { id: 8, parent: 4, type: null }]))
    expect(JSON.stringify(ts.getChildren(3))).toBe(JSON.stringify([]))
})

test('Get All Children', () => {
    expect(JSON.stringify(ts.getAllChildren(2))).toBe(JSON.stringify([{ id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },

    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },]))
})

test('Get All Parents', () => {
    expect(JSON.stringify(ts.getAllParents(7))).toBe(JSON.stringify([{"id":4,"parent":2,"type":"test"},{"id":2,"parent":1,"type":"test"},{"id":1,"parent":"root"}]))
})
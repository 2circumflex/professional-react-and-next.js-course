import { useMemo, useState } from "react"
import Select from "react-select"
import EmptyView from "./EmptyView"
import { useItemStore } from "../stores/itemsStore"

const sortingOptions = [
  {
    label: "Sort by default",
    value: "default",
  },
  {
    label: "Sort by packed",
    value: "packed",
  },
  {
    label: "Sort by unpacked",
    value: "unpacked",
  },
]

export default function ItemList() {
  const items = useItemStore((state) => state.items)
  const toggleItem = useItemStore((state) => state.toggleItem)
  const deleteItem = useItemStore((state) => state.deleteItem)

  const [sortBy, setSortBy] = useState("default")

  const sortedItems = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (sortBy == "packed") {
          return b.packed - a.packed
        }
        if (sortBy == "unpacked") {
          return a.packed - b.packed
        }
        return
      }),
    [items, sortBy]
  )

  return (
    <ul className="item-list">
      {items.length === 0 ? <EmptyView /> : null}

      {items.length > 0 ? (
        <section className="sorting">
          <Select
            defaultValue={sortingOptions[0]}
            options={sortingOptions}
            onChange={(option) => setSortBy(option.value)}
          />
        </section>
      ) : null}

      {sortedItems.map((item) => {
        return (
          <Item
            key={item.id}
            item={item}
            onToggleItem={toggleItem}
            onDeleteItem={deleteItem}
          />
        )
      })}
    </ul>
  )
}

function Item({ item, onToggleItem, onDeleteItem }) {
  return (
    <li className="item">
      <label>
        <input
          checked={item.packed}
          type="checkbox"
          onChange={() => onToggleItem(item.id)}
        />
        {item.name}
      </label>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  )
}

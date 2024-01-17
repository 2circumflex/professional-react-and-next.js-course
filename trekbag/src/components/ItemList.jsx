import { useMemo, useState } from "react"
import Select from "react-select"
import EmptyView from "./EmptyView"
import { useItemsContext } from "../lib/hooks"

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
  const [sortBy, setSortBy] = useState("default")
  const { items, handleToggleItem, handleDeleteItem } = useItemsContext()

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
            onToggleItem={handleToggleItem}
            onDeleteItem={handleDeleteItem}
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

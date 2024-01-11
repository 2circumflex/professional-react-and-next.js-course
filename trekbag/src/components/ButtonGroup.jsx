import Button from "./Button"

export default function ButtonGroup() {
  const secondarybuttons = [
    "Mark all as complete",
    "Mark all as incomplte",
    "Reset to initial",
    "Remove all items",
  ]

  return (
    <section className="button-group">
      {secondarybuttons.map((text) => {
        return (
          <Button key={text} type="secondary">
            {text}
          </Button>
        )
      })}
    </section>
  )
}

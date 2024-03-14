import { Button } from "./ui/button";

type PetFormBtn = {
  actionType: "add" | "edit";
};

export default function PetFormBtn({ actionType }: PetFormBtn) {
  return (
    <Button type="submit" className="mt-5 self-end">
      {actionType === "add" ? "Add a new pet" : "Edit pet"}
    </Button>
  );
}

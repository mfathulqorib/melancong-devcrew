import React from "react";
import { Textarea, Button } from "@nextui-org/react";

export const CreateComment = () => {
  return (
    <div className="mt-3  p-6">
      <form action="" method="post" className="space-y-3">
        <Textarea
          name="comment"
          label="Komentar"
          variant="underlined"
          placeholder="Tulis Komentar..."
          disableAnimation
          disableAutosize
          classNames={{
            base: "max-w-full",
            input: "resize-y min-h-[40px] ",
          }}
        />
        <Button color="primary" size="sm" className="font-medium" type="submit">
          Kirim
        </Button>
      </form>
    </div>
  );
};

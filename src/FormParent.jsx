import { useState } from "react";
import Card from "./components/Card";
import TextInput from "./components/TextInput";
import TextPreview from "./components/TextPreview";

function FormParent() {
  const [text, setText] = useState("");

  return (
    <Card title="Синхронизация текста">
      <TextInput
        value={text}
        onChange={setText}
      />

      <TextPreview text={text} />
    </Card>
  );
}

export default FormParent;
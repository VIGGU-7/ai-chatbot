fetch("http://68.233.110.67:3000/api/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    model: "tinyllama:latest",
    prompt: "who devoloped you",
    stream: true // optional, true by default
  })
})
.then(async res => {
  const reader = res.body.getReader();
  const decoder = new TextDecoder("utf-8");
  let fullResponse = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });

    const lines = chunk.split("\n").filter(Boolean);
    for (const line of lines) {
      try {
        const json = JSON.parse(line);
        if (json.response) {
          fullResponse += json.response;
        }
      } catch (err) {
        console.error("Error parsing chunk:", line);
      }
    }
  }

 return fullResponse
})
.catch(err => {
  console.error("Fetch error:", err)
  return "Server is busy"
});

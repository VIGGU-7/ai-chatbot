import 'dotenv/config'
export const ai = async (prompt) => {
  try {
    const res = await fetch(process.env.model, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: process.env.modelname,
        prompt
      })
    });

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

    return fullResponse.trim() === "" ? "Server is busy" : fullResponse;
  } catch (err) {
    console.error("Fetch error:", err);
    return "Something went wrong";
  }
};

import Together from "together-ai";

if (!process.env.TOGETHER_API_KEY) {
  throw new Error("Missing env var from Together.ai");
}

export const config = {
  runtime: "edge",
};

const together = new Together();

const handler = async (req: Request): Promise<Response> => {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }

  const runner = together.chat.completions.stream({
    model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
    messages: [{ role: "user", content: prompt }],
  });

  return new Response(runner.toReadableStream());
};

export default handler;

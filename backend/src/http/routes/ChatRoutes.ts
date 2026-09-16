import { openai } from "@ai-sdk/openai";
import { streamText, convertToModelMessages, stepCountIs, type UIMessage } from "ai";
import { Router } from "express";
import { tools } from "../../agent/tools/Tools.js";

const chatRoutes = Router()

const llmSystemMessage = `
Context: You are a food delivery agent.
Instructions: When the user asks whats on the menu, tell them what is on the menu.
When a user asks to update their cart, update their cart. If there are already items in the cart, notify the user of what is currently in the cart, and then what the new updated cart will look like. Confirm with the user before updating the cart.
Never add to cart and order at the same time. If a user requests to order something, go through the process of adding to cart(with confirmation), and then confirm with them if they want to order.

Always confirm with the user before placing an order`

chatRoutes.post('/', async (req, res) => {
  const { messages }: { messages: UIMessage[] } = req.body
  console.dir(messages, {depth: null})

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: llmSystemMessage,
    messages: await convertToModelMessages(messages),
    tools: tools,
    stopWhen: stepCountIs(20),
    onStepFinish: (step) => {
      console.log("=== STEP ===");

      if (step.text) {
        console.log("LLM:", step.text);
      }

      if (step.toolCalls?.length) {
        for (const toolCall of step.toolCalls) {
          console.log(`Tool: ${toolCall.toolName}`);
          console.log("Args:", toolCall.input);
        }
      }

      if (step.toolResults?.length) {
        for (const toolResult of step.toolResults) {
          console.log(`Result (${toolResult.toolName}):`, toolResult.output);
        }
      }

      if (step.finishReason) {
        console.log("Finish reason:", step.finishReason);
      }
    },
    onError: ({ error }) => {
      console.error("=== LLM ERROR ===");
      console.error(error);
    },
  })

  result.pipeUIMessageStreamToResponse(res)
})

export {chatRoutes}

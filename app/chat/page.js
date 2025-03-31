"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatId = searchParams.get("id") || new Date().toISOString();

  useEffect(() => {
    if (session?.user?.email && chatId) {
      const savedChats = JSON.parse(
        localStorage.getItem(`chats_${session.user.email}`) || "{}"
      );
      if (savedChats[chatId]) {
        setMessages(savedChats[chatId]);
      }
    }
  }, [session, chatId]);

  useEffect(() => {
    if (session?.user?.email && messages.length > 0) {
      const savedChats = JSON.parse(
        localStorage.getItem(`chats_${session.user.email}`) || "{}"
      );
      savedChats[chatId] = messages;
      localStorage.setItem(
        `chats_${session.user.email}`,
        JSON.stringify(savedChats)
      );
    }
  }, [messages, session, chatId]);

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    try {
      setIsLoading(true);
      const userMessage = { role: "user", content: input };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) throw new Error("API call failed");

      const data = await response.json();
      setMessages((prev) => [...prev, data]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-5xl mx-auto p-4">
      <div className="flex-1 overflow-auto space-y-4 pb-4 mt-10 ml-60">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.role === "user"
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="ml-60">
        <form
          onSubmit={handleSubmit}
          className="border-t pt-4 dark:border-gray-700"
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

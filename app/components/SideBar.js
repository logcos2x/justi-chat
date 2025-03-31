"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function Sidebar() {
  const { data: session, status } = useSession();
  const [chatHistory, setChatHistory] = useState([]);
  const router = useRouter();

  const deleteChat = (chatId, e) => {
    e.stopPropagation();
    if (session?.user?.email) {
      const savedChats = JSON.parse(
        localStorage.getItem(`chats_${session.user.email}`) || "{}"
      );
      delete savedChats[chatId];
      localStorage.setItem(
        `chats_${session.user.email}`,
        JSON.stringify(savedChats)
      );
      setChatHistory((prev) => prev.filter((chat) => chat.id !== chatId));
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      const savedChats = JSON.parse(
        localStorage.getItem(`chats_${session.user.email}`) || "{}"
      );
      const chatEntries = Object.entries(savedChats)
        .map(([id, messages]) => ({
          id,
          preview: messages[0]?.content?.slice(0, 30) || "New Chat",
          timestamp: new Date(id).toLocaleString(),
          messageCount: messages.length,
        }))
        .filter((chat) => chat.messageCount > 0)
        .sort((a, b) => new Date(b.id) - new Date(a.id));
      setChatHistory(chatEntries);
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="fixed top-0 left-0 z-40 h-full bg-background border-r shadow-lg w-64">
        <div className="animate-pulse p-4 mt-15">
          <div className="h-8 bg-gray-700 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 z-40 h-full bg-background border-r shadow-lg w-64">
      <div className="flex flex-col h-full">
        <nav className="flex-1 overflow-hidden py-4">
          <ul className="space-y-4 px-4">
            <li>
              <Link href={"/"}>
                <div className="flex items-center gap-3 text-sm font-medium text-white hover:bg-gray-200 p-2 rounded-md mt-15">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    ></path>
                  </svg>
                  <span className="hover:text-black">Home</span>
                </div>
              </Link>
            </li>

            <li>
              <Link href={"/about"}>
                <div className="flex items-center gap-3 text-sm font-medium text-white hover:bg-gray-200 p-2 rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    ></path>
                  </svg>
                  <span className="hover:text-black">About Us</span>
                </div>
              </Link>
            </li>
            {session && (
              <li>
                <Link href="/chat">
                  <div className="flex items-center gap-3 text-sm font-medium text-white hover:bg-gray-200 p-2 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    <span className="hover:text-black">New Chat</span>
                  </div>
                </Link>
              </li>
            )}
            {session ? (
              <>
                <li>
                  <div
                    className="cursor-pointer flex items-center gap-3 text-sm font-medium text-white hover:bg-gray-200 p-2 rounded-md"
                    onClick={() => signOut()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                      ></path>
                    </svg>
                    <span className="hover:text-black">Logout</span>
                  </div>
                </li>
                <div className="mt-4">
                  <div className="font-semibold text-sm text-gray-600 px-4 mb-2">
                    History
                  </div>
                  <div className="overflow-y-auto max-h-[calc(100vh-400px)] pr-2">
                    <ul className="space-y-2">
                      {chatHistory.map((chat) => (
                        <li key={chat.id}>
                          <div
                            onClick={() => router.push(`/chat?id=${chat.id}`)}
                            className="flex items-center justify-between cursor-pointer px-4 py-2 text-sm text-white hover:bg-gray-200 rounded-md group"
                          >
                            <div className="flex-1 min-w-0">
                              <span className="block truncate">
                                {chat.preview}
                              </span>
                              <span className="text-xs text-gray-400">
                                {chat.timestamp}
                              </span>
                            </div>
                            <button
                              onClick={(e) => deleteChat(chat.id, e)}
                              className="opacity-0 group-hover:opacity-100 ml-2 p-1 hover:bg-red-500 rounded-full transition-opacity"
                              title="Delete chat"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 h-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                        </li>
                      ))}
                      {chatHistory.length === 0 && (
                        <li className="px-4 text-sm text-gray-400">
                          No chat history
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <li>
                <Link href={"/login"}>
                  <div className="flex items-center gap-3 text-sm font-medium text-white hover:bg-gray-200 p-2 rounded-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                      ></path>
                    </svg>
                    <span className="hover:text-black">Login</span>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </nav>
        {session && (
          <div className="absolute bottom-0 left-0 w-full px-4 py-4">
            <div className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:bg-gray-200 p-2 rounded-md">
              <Image
                src="/profile-picture.png"
                alt="Profile Picture"
                className="w-8 h-8 rounded-full"
                width={10}
                height={10}
              />
              <span className="text-sm font-medium text-white hover:text-black">
                {session?.user?.name || "Guest"}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import { Grid } from "@giphy/react-components";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { useState } from "react";
import { useEffect } from "react";
import GifInput from "./ui/gifInput";
import ShowGif from "./ui/showGif";

export default function Home() {
  const [gifSearchText, setGifSearchText] = useState<string>("");
  const [messages, setMessages] = useState<{ text: string; time: Date }[]>([]);
  const [inputText, setInputText] = useState("");
  const [isGifMenuOpen, setGifMenuOpen] = useState(false);
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  const gifs = new GiphyFetch("uy6kWf9IpfrAwMNznT0Pneq84vFsgD9J");

  useEffect(() => {
    const timer = setTimeout(() => {
      setGifSearchText(debouncedSearchText);
    }, 500);
    return () => clearTimeout(timer);
  }, [debouncedSearchText]);

  useEffect(() => {
    if (gifSearchText.trim()) {
      setGifMenuOpen(true);
    } else {
      setGifMenuOpen(false);
    }
  }, [gifSearchText]);

  const fetchGifs = (offset: number) =>
    gifs.search(gifSearchText, { offset, limit: 10 });
  const handleSendMessage = () => {
    if (inputText.trim() && !inputText.startsWith("/gif")) {
      const newMessage = { text: inputText.trim(), time: new Date() };
      setMessages((prev) => [...prev, newMessage]);
      setInputText("");
    }
  };

  const handleGifSelect = (gifUrl: string) => {
    const newMessage = { text: gifUrl, time: new Date() };
    setMessages((prev) => [...prev, newMessage]);
    setGifMenuOpen(false);
    setInputText("");
  };
  const handleInputChange = (text: string) => {
    setInputText(text);
    if (text.startsWith("/gif ")) {
      const searchQuery = text.replace("/gif ", "").trim();
      setDebouncedSearchText(searchQuery);
    } else {
      setGifMenuOpen(false);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const getCurrentTime = () => {
    const currentTime = new Date();
    return currentTime;
  };
  return (
    <div className="flex items-center justify-center w-full h-screen bg-cover bg-slate-400">
      <main>
        <div className="w-[437px] h-[340px] flex flex-col bg-white rounded-[4px] pt-[20px]">
          <div className="overflow-auto w-[430px]  px-[16px] pb-[13px] relative h-[247px]">
            {isGifMenuOpen && (
              <ShowGif
                fetchGifs={fetchGifs}
                handleGifSelect={handleGifSelect}
                isOpen={isGifMenuOpen}
              />
            )}
            {messages.map((msg, index) => (
              <div key={index} className="text-[#99A2AD] text-sm/[17px]">
                {msg.text.startsWith("http") ? (
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <img
                            src={msg.text}
                            alt="GIF"
                            className="rounded-[6px]"
                          />
                        </td>
                        <td className="relative">
                          <p className="absolute bottom-0 mb-1">
                            {msg.time.getHours()}:
                            {(msg.time.getMinutes() < 10 ? "0" : "") +
                              msg.time.getMinutes()}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                ) : (
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <p>{msg.text}</p>
                        </td>
                        <td className="relative">
                          <p className="absolute bottom-0">
                            {msg.time.getHours()}:
                            {(msg.time.getMinutes() < 10 ? "0" : "") +
                              msg.time.getMinutes()}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </div>
          <GifInput
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

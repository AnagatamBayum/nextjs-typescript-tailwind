"use client";

import { FormEvent, useState } from "react";

export function HelloForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    const response = await fetch("/api/hello", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data: { message?: string; error?: string } = await response.json();

    if (!response.ok) {
      setError(data.error ?? "Request failed");
      return;
    }

    setMessage(data.message ?? "");
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-3">
      <label
        htmlFor="name"
        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
      >
        Name
      </label>
      <input
        id="name"
        name="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Ada"
        className="h-12 rounded-full border border-black/[.08] bg-transparent px-5 text-base outline-none focus:border-black dark:border-white/[.145] dark:focus:border-white"
      />
      <button
        type="submit"
        className="flex h-12 items-center justify-center rounded-full bg-foreground px-5 text-base font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
      >
        Say hello
      </button>
      {message ? (
        <p role="status" className="text-lg text-zinc-800 dark:text-zinc-100">
          {message}
        </p>
      ) : null}
      {error ? (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </form>
  );
}

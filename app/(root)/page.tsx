import { books } from "@/database/schema";
import { db } from "@/database/drizzle";
import { desc } from "drizzle-orm";
import { auth } from "@/auth";

import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";

export default async function Home() {
  const session = await auth();

  const latestBooks = await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt)) as Book[];
  
  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />

      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
}
